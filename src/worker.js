// Simple password hash function (در production از bcrypt استفاده کنید)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'vibrate_salt_2024');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyPassword(password, hash) {
  const hashedInput = await hashPassword(password);
  return hashedInput === hash;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// JWT functions (simplified)
function createJWT(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = btoa(`${encodedHeader}.${encodedPayload}.${secret}`);
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function verifyJWT(token, secret) {
  try {
    const [header, payload, signature] = token.split('.');
    const expectedSignature = btoa(`${header}.${payload}.${secret}`);
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    const decodedPayload = JSON.parse(atob(payload));
    
    // Check expiration
    if (decodedPayload.exp && decodedPayload.exp < Date.now()) {
      return null;
    }
    
    return decodedPayload;
  } catch (error) {
    return null;
  }
}

class DatabaseAPI {
  constructor(env) {
    this.db = env.DB;
    this.jwtSecret = env.JWT_SECRET || 'default-secret-key-change-in-production';
  }

  // Authentication
  async login(username, password) {
    try {
      const user = await this.db.prepare(
        'SELECT id, username, password_hash, role, full_name FROM users WHERE username = ?'
      ).bind(username).first();

      if (!user) {
        return { success: false, message: 'کاربر یافت نشد' };
      }

      const passwordValid = await verifyPassword(password, user.password_hash);
      if (!passwordValid) {
        return { success: false, message: 'رمز عبور اشتباه است' };
      }

      // Create JWT token
      const tokenPayload = {
        userId: user.id,
        username: user.username,
        role: user.role,
        fullName: user.full_name,
        iat: Date.now(),
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };

      const token = createJWT(tokenPayload, this.jwtSecret);

      return {
        success: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          fullName: user.full_name
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'خطا در ورود' };
    }
  }

  // Verify token
  verifyToken(token) {
    return verifyJWT(token, this.jwtSecret);
  }

  // Save vibration data with conflict check (First User Wins)
  async saveVibrateData(data, userId) {
    const transaction = this.db.batch();
    const results = [];

    try {
      for (const [parameterId, value] of Object.entries(data.parameters)) {
        // Check if data already exists
        const existing = await this.db.prepare(`
          SELECT id, user_id, value, updated_at 
          FROM vibration_data 
          WHERE unit = ? AND equipment = ? AND date = ? AND parameter_id = ?
        `).bind(data.unit, data.equipment, data.date, parameterId).first();

        if (existing) {
          // First user wins - don't update
          results.push({ 
            parameterId, 
            success: false, 
            message: 'داده قبلاً ثبت شده است',
            existingUserId: existing.user_id,
            existingValue: existing.value
          });
          continue;
        }

        // Insert new data
        const stmt = this.db.prepare(`
          INSERT INTO vibration_data 
          (unit, equipment, date, parameter_id, value, user_id, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `);

        transaction.push(stmt.bind(
          data.unit,
          data.equipment,
          data.date,
          parameterId,
          value,
          userId
        ));

        results.push({ parameterId, success: true });
      }

      await transaction;

      const successCount = results.filter(r => r.success).length;
      const failCount = results.filter(r => !r.success).length;

      return { 
        success: true, 
        results, 
        message: `${successCount} پارامتر ذخیره شد${failCount > 0 ? `, ${failCount} پارامتر تکراری بود` : ''}` 
      };

    } catch (error) {
      console.error('Save data error:', error);
      return { 
        success: false, 
        message: 'خطا در ذخیره داده‌ها', 
        error: error.message 
      };
    }
  }

  // Get vibration data
  async getVibrateData(filters) {
    try {
      let query = `
        SELECT vd.*, u.username, u.full_name 
        FROM vibration_data vd 
        JOIN users u ON vd.user_id = u.id 
        WHERE 1=1
      `;
      const params = [];

      if (filters.unit) {
        query += ' AND vd.unit = ?';
        params.push(filters.unit);
      }
      if (filters.equipment) {
        query += ' AND vd.equipment = ?';
        params.push(filters.equipment);
      }
      if (filters.date) {
        query += ' AND vd.date = ?';
        params.push(filters.date);
      }
      if (filters.dateFrom) {
        query += ' AND vd.date >= ?';
        params.push(filters.dateFrom);
      }
      if (filters.dateTo) {
        query += ' AND vd.date <= ?';
        params.push(filters.dateTo);
      }

      query += ' ORDER BY vd.date DESC, vd.equipment, vd.parameter_id';

      const stmt = this.db.prepare(query);
      const results = await stmt.bind(...params).all();

      // Group by unit, equipment, date
      const grouped = {};
      results.results.forEach(row => {
        const key = `${row.unit}_${row.equipment}_${row.date}`;
        if (!grouped[key]) {
          grouped[key] = {
            unit: row.unit,
            equipment: row.equipment,
            date: row.date,
            parameters: {},
            timestamp: row.updated_at,
            userName: row.full_name || row.username
          };
        }
        grouped[key].parameters[row.parameter_id] = row.value;
      });

      return { success: true, data: Object.values(grouped) };
    } catch (error) {
      console.error('Get data error:', error);
      return { 
        success: false, 
        message: 'خطا در دریافت داده‌ها', 
        error: error.message 
      };
    }
  }

  // Check existing data for conflict prevention
  async checkExistingData(unit, equipment, date, parameterId) {
    try {
      const result = await this.db.prepare(`
        SELECT vd.id, vd.value, vd.user_id, vd.updated_at, u.username, u.full_name
        FROM vibration_data vd
        JOIN users u ON vd.user_id = u.id
        WHERE vd.unit = ? AND vd.equipment = ? AND vd.date = ? AND vd.parameter_id = ?
      `).bind(unit, equipment, date, parameterId).first();

      return { 
        exists: !!result, 
        data: result ? {
          ...result,
          userName: result.full_name || result.username
        } : null 
      };
    } catch (error) {
      console.error('Check data error:', error);
      return { exists: false, error: error.message };
    }
  }

  // Save settings
  async saveSettings(userId, settings) {
    const transaction = this.db.batch();

    try {
      for (const [key, value] of Object.entries(settings)) {
        const stmt = this.db.prepare(`
          INSERT OR REPLACE INTO settings (user_id, key, value, updated_at)
          VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        `);
        transaction.push(stmt.bind(userId, key, JSON.stringify(value)));
      }

      await transaction;
      return { success: true, message: 'تنظیمات ذخیره شد' };
    } catch (error) {
      console.error('Save settings error:', error);
      return { success: false, message: 'خطا در ذخیره تنظیمات', error: error.message };
    }
  }

  // Get settings
  async getSettings(userId) {
    try {
      const results = await this.db.prepare(
        'SELECT key, value FROM settings WHERE user_id = ?'
      ).bind(userId).all();

      const settings = {};
      results.results.forEach(row => {
        try {
          settings[row.key] = JSON.parse(row.value);
        } catch {
          settings[row.key] = row.value;
        }
      });

      return { success: true, settings };
    } catch (error) {
      console.error('Get settings error:', error);
      return { success: false, message: 'خطا در دریافت تنظیمات', error: error.message };
    }
  }

  // Get database statistics
  async getDatabaseStats() {
    try {
      const totalRecords = await this.db.prepare('SELECT COUNT(*) as count FROM vibration_data').first();
      const totalDates = await this.db.prepare('SELECT COUNT(DISTINCT date) as count FROM vibration_data').first();
      const lastUpdate = await this.db.prepare('SELECT MAX(updated_at) as last_update FROM vibration_data').first();
      const lastUser = await this.db.prepare(`
        SELECT u.full_name, u.username 
        FROM vibration_data vd 
        JOIN users u ON vd.user_id = u.id 
        ORDER BY vd.updated_at DESC 
        LIMIT 1
      `).first();

      return {
        success: true,
        stats: {
          totalRecords: totalRecords.count,
          totalDates: totalDates.count,
          lastUpdate: lastUpdate.last_update,
          lastUser: lastUser ? (lastUser.full_name || lastUser.username) : null
        }
      };
    } catch (error) {
      console.error('Get stats error:', error);
      return { success: false, message: 'خطا در دریافت آمار', error: error.message };
    }
  }

  // Export all data as CSV format
  async exportAllData() {
    try {
      const results = await this.db.prepare(`
        SELECT vd.*, u.username, u.full_name
        FROM vibration_data vd
        JOIN users u ON vd.user_id = u.id
        ORDER BY vd.date DESC, vd.unit, vd.equipment, vd.parameter_id
      `).all();

      return { success: true, data: results.results };
    } catch (error) {
      console.error('Export data error:', error);
      return { success: false, message: 'خطا در صادرات داده‌ها', error: error.message };
    }
  }
}

// Main handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const api = new DatabaseAPI(env);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        headers: corsHeaders,
        status: 200
      });
    }

    try {
      const path = url.pathname;
      const method = request.method;

      // Public endpoints
      if (path === '/api/login' && method === 'POST') {
        const { username, password } = await request.json();
        const result = await api.login(username, password);
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: result.success ? 200 : 401
        });
      }

      // Health check
      if (path === '/api/health' && method === 'GET') {
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'API is working',
          timestamp: new Date().toISOString()
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Protected endpoints - verify authentication
      const authHeader = request.headers.get('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ 
          success: false, 
          message: 'نیاز به احراز هویت',
          code: 'AUTH_REQUIRED'
        }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const token = authHeader.substring(7);
      const user = api.verifyToken(token);
      if (!user) {
        return new Response(JSON.stringify({ 
          success: false, 
          message: 'توکن نامعتبر یا منقضی شده',
          code: 'INVALID_TOKEN'
        }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // API endpoints
      switch (true) {
        // Save vibration data
        case path === '/api/vibrate-data' && method === 'POST':
          const saveData = await request.json();
          const saveResult = await api.saveVibrateData(saveData, user.userId);
          return new Response(JSON.stringify(saveResult), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: saveResult.success ? 200 : 400
          });

        // Get vibration data
        case path === '/api/vibrate-data' && method === 'GET':
          const filters = Object.fromEntries(url.searchParams.entries());
          const getResult = await api.getVibrateData(filters);
          return new Response(JSON.stringify(getResult), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: getResult.success ? 200 : 400
          });

        // Check existing data
        case path === '/api/check-data' && method === 'GET':
          const checkParams = Object.fromEntries(url.searchParams.entries());
          const { unit, equipment, date, parameter_id } = checkParams;
          const checkResult = await api.checkExistingData(unit, equipment, date, parameter_id);
          return new Response(JSON.stringify(checkResult), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });

        // Save settings
        case path === '/api/settings' && method === 'POST':
          const settings = await request.json();
          const settingsResult = await api.saveSettings(user.userId, settings);
          return new Response(JSON.stringify(settingsResult), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: settingsResult.success ? 200 : 400
          });

        // Get settings
        case path === '/api/settings' && method === 'GET':
          const getSettingsResult = await api.getSettings(user.userId);
          return new Response(JSON.stringify(getSettingsResult), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: getSettingsResult.success ? 200 : 400
          });

        // Get database stats
        case path === '/api/stats' && method === 'GET':
          const statsResult = await api.getDatabaseStats();
          return new Response(JSON.stringify(statsResult), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: statsResult.success ? 200 : 400
          });

        // Export data
        case path === '/api/export' && method === 'GET':
          const exportResult = await api.exportAllData();
          return new Response(JSON.stringify(exportResult), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: exportResult.success ? 200 : 400
          });

        // User info
        case path === '/api/user' && method === 'GET':
          return new Response(JSON.stringify({
            success: true,
            user: {
              id: user.userId,
              username: user.username,
              role: user.role,
              fullName: user.fullName
            }
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });

        default:
          return new Response(JSON.stringify({ 
            success: false, 
            message: 'Endpoint not found' 
          }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
      }

    } catch (error) {
      console.error('API Error:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'خطای داخلی سرور', 
        error: error.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};