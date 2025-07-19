// API Configuration
const API_BASE_URL = 'https://vibrate-api.your-subdomain.workers.dev';

// Show notification function (should be available globally)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

class DatabaseAPI {
    // Local storage keys
    static AUTH_TOKEN_KEY = 'vibrate_auth_token';
    static OFFLINE_DATA_KEY = 'vibrate_offline_data';
    static SETTINGS_CACHE_KEY = 'vibrate_settings_cache';

    // Authentication methods
    static getAuthToken() {
        return localStorage.getItem(this.AUTH_TOKEN_KEY);
    }

    static setAuthToken(token) {
        localStorage.setItem(this.AUTH_TOKEN_KEY, token);
    }

    static removeAuthToken() {
        localStorage.removeItem(this.AUTH_TOKEN_KEY);
    }

    static isAuthenticated() {
        const token = this.getAuthToken();
        if (!token) return false;
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > Date.now();
        } catch {
            return false;
        }
    }

    static getCurrentUser() {
        const token = this.getAuthToken();
        if (!token) return null;
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp > Date.now()) {
                return {
                    id: payload.userId,
                    username: payload.username,
                    role: payload.role,
                    fullName: payload.fullName
                };
            }
        } catch {
            return null;
        }
        return null;
    }

    // Network status
    static isOnline() {
        return navigator.onLine;
    }

    // Login
    static async login(username, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            
            if (result.success) {
                this.setAuthToken(result.token);
                return { success: true, user: result.user };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                message: this.isOnline() ? 'خطا در ورود به سیستم' : 'عدم دسترسی به شبکه'
            };
        }
    }

    // Logout
    static logout() {
        this.removeAuthToken();
        localStorage.clear(); // Clear all cached data
        window.location.reload();
    }

    // Make authenticated API call
    static async apiCall(endpoint, options = {}) {
        const token = this.getAuthToken();
        if (!token) {
            throw new Error('No authentication token');
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers
            }
        });

        const result = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                // Token expired or invalid
                this.removeAuthToken();
                showNotification('نشست شما منقضی شده، لطفاً مجدداً وارد شوید', 'warning');
                setTimeout(() => window.location.reload(), 2000);
                throw new Error('Authentication failed');
            }
            throw new Error(result.message || 'API call failed');
        }

        return result;
    }

    // Save vibrate data (with offline support)
    static async saveDataToDB(data) {
        try {
            // Try online first
            const result = await this.apiCall('/api/vibrate-data', {
                method: 'POST',
                body: JSON.stringify(data)
            });

            if (result.success) {
                // Remove from offline storage if exists
                this.removeOfflineData(data);
                return result;
            } else {
                // Server validation failed, store offline
                return this.storeOfflineData(data, result.message);
            }
        } catch (error) {
            console.warn('Online save failed, storing offline:', error);
            // Store offline
            return this.storeOfflineData(data, error.message);
        }
    }

    // Get vibrate data
    static async getDataFromDB(filters = {}) {
        try {
            // Try to sync offline data first
            await this.syncOfflineData();

            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    params.append(key, value);
                }
            });

            const result = await this.apiCall(`/api/vibrate-data?${params}`);
            
            if (result.success) {
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error getting data:', error);
            // Fallback to offline data
            const offlineData = this.getOfflineData(filters);
            if (offlineData.length > 0) {
                showNotification('نمایش داده‌های آفلاین', 'warning');
            }
            return offlineData;
        }
    }

    // Get last user who entered data
    static async getLastUserFromDB() {
        try {
            const result = await this.apiCall('/api/stats');
            if (result.success) {
                return result.stats.lastUser;
            }
        } catch (error) {
            console.error('Error getting last user:', error);
        }
        return null;
    }

    // Check existing data
    static async checkExistingData(unit, equipment, date, parameterId) {
        try {
            const params = new URLSearchParams({ 
                unit, 
                equipment, 
                date, 
                parameter_id: parameterId 
            });
            const result = await this.apiCall(`/api/check-data?${params}`);
            return result;
        } catch (error) {
            console.warn('Online check failed:', error);
            return { exists: false };
        }
    }

    // Save settings
    static async saveSettingsToDB(settings) {
        try {
            const result = await this.apiCall('/api/settings', {
                method: 'POST',
                body: JSON.stringify(settings)
            });
            
            if (result.success) {
                // Cache settings locally
                localStorage.setItem(this.SETTINGS_CACHE_KEY, JSON.stringify(settings));
            }
            
            return result.success;
        } catch (error) {
            console.error('Error saving settings:', error);
            // Fallback to localStorage
            localStorage.setItem(this.SETTINGS_CACHE_KEY, JSON.stringify(settings));
            showNotification('تنظیمات محلی ذخیره شد', 'warning');
            return true;
        }
    }

    // Get settings
    static async getSettingsFromDB() {
        try {
            const result = await this.apiCall('/api/settings');
            if (result.success) {
                // Cache settings locally
                localStorage.setItem(this.SETTINGS_CACHE_KEY, JSON.stringify(result.settings));
                return result.settings;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error getting settings:', error);
            // Fallback to localStorage
            const cached = localStorage.getItem(this.SETTINGS_CACHE_KEY);
            if (cached) {
                showNotification('استفاده از تنظیمات محلی', 'warning');
                return JSON.parse(cached);
            }
            return null;
        }
    }

    // Get database statistics
    static async getDatabaseStats() {
        try {
            const result = await this.apiCall('/api/stats');
            return result.success ? result.stats : null;
        } catch (error) {
            console.error('Error getting database stats:', error);
            return null;
        }
    }

    // Export data
    static async exportAllData() {
        try {
            const result = await this.apiCall('/api/export');
            return result.success ? result.data : null;
        } catch (error) {
            console.error('Error exporting data:', error);
            throw error;
        }
    }

    // Offline data management
    static storeOfflineData(data, reason = 'اتصال اینترنت') {
        try {
            const offlineData = JSON.parse(localStorage.getItem(this.OFFLINE_DATA_KEY) || '[]');
            const dataWithId = {
                ...data,
                offlineId: Date.now() + Math.random(),
                timestamp: new Date().toISOString(),
                reason: reason
            };
            offlineData.push(dataWithId);
            localStorage.setItem(this.OFFLINE_DATA_KEY, JSON.stringify(offlineData));
            
            console.log('Data stored offline:', dataWithId);
            showNotification(`داده آفلاین ذخیره شد (${reason})`, 'warning');
            return { success: true, offline: true, message: 'داده آفلاین ذخیره شد' };
        } catch (error) {
            console.error('Error storing offline data:', error);
            return { success: false, message: 'خطا در ذخیره آفلاین' };
        }
    }

    static getOfflineData(filters = {}) {
        try {
            const offlineData = JSON.parse(localStorage.getItem(this.OFFLINE_DATA_KEY) || '[]');
            
            // Apply filters
            const filtered = offlineData.filter(item => {
                if (filters.unit && item.unit !== filters.unit) return false;
                if (filters.equipment && item.equipment !== filters.equipment) return false;
                if (filters.date && item.date !== filters.date) return false;
                if (filters.dateFrom && item.date < filters.dateFrom) return false;
                if (filters.dateTo && item.date > filters.dateTo) return false;
                return true;
            });

            return filtered;
        } catch (error) {
            console.error('Error getting offline data:', error);
            return [];
        }
    }

    static removeOfflineData(data) {
        try {
            const offlineData = JSON.parse(localStorage.getItem(this.OFFLINE_DATA_KEY) || '[]');
            const filtered = offlineData.filter(item => 
                !(item.unit === data.unit && 
                  item.equipment === data.equipment && 
                  item.date === data.date)
            );
            localStorage.setItem(this.OFFLINE_DATA_KEY, JSON.stringify(filtered));
        } catch (error) {
            console.error('Error removing offline data:', error);
        }
    }

    static getOfflineDataCount() {
        try {
            const offlineData = JSON.parse(localStorage.getItem(this.OFFLINE_DATA_KEY) || '[]');
            return offlineData.length;
        } catch {
            return 0;
        }
    }

    // Sync offline data when online
    static async syncOfflineData() {
        if (!this.isOnline()) return;

        const offlineData = JSON.parse(localStorage.getItem(this.OFFLINE_DATA_KEY) || '[]');
        
        if (offlineData.length === 0) return;

        console.log('Syncing offline data:', offlineData.length, 'items');
        
        let syncedCount = 0;
        let failedCount = 0;

        for (const data of offlineData) {
            try {
                const result = await this.apiCall('/api/vibrate-data', {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                
                if (result.success) {
                    syncedCount++;
                    // Remove synced item
                    this.removeOfflineData(data);
                } else {
                    failedCount++;
                    console.warn('Failed to sync item:', data.offlineId, result.message);
                }
            } catch (error) {
                failedCount++;
                console.warn('Failed to sync item:', data.offlineId, error.message);
            }
        }
        
        if (syncedCount > 0) {
            showNotification(`${syncedCount} داده آفلاین همگام‌سازی شد`, 'success');
        }
        
        if (failedCount > 0) {
            showNotification(`${failedCount} داده همگام‌سازی نشد`, 'warning');
        }
    }

    // Initialize network listeners
    static initNetworkListeners() {
        window.addEventListener('online', async () => {
            console.log('Back online, syncing data...');
            showNotification('اتصال برقرار شد', 'success');
            
            const offlineCount = this.getOfflineDataCount();
            if (offlineCount > 0) {
                showNotification(`همگام‌سازی ${offlineCount} داده آفلاین...`, 'info');
                await this.syncOfflineData();
            }
        });

        window.addEventListener('offline', () => {
            console.log('Gone offline');
            showNotification('اتصال اینترنت قطع شد، داده‌ها آفلاین ذخیره می‌شوند', 'warning');
        });

        // Periodic sync attempt
        setInterval(async () => {
            if (this.isOnline() && this.isAuthenticated()) {
                const offlineCount = this.getOfflineDataCount();
                if (offlineCount > 0) {
                    await this.syncOfflineData();
                }
            }
        }, 30000); // Try sync every 30 seconds
    }

    // Health check
    static async healthCheck() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/health`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.ok;
        } catch {
            return false;
        }
    }
}

// Export to global scope
window.DatabaseAPI = DatabaseAPI;