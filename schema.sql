-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'operator',
    full_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Vibration data table
CREATE TABLE IF NOT EXISTS vibration_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit TEXT NOT NULL,
    equipment TEXT NOT NULL,
    date DATE NOT NULL,
    parameter_id TEXT NOT NULL,
    value REAL NOT NULL,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(unit, equipment, date, parameter_id)
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(user_id, key)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vibration_data_lookup ON vibration_data(unit, equipment, date);
CREATE INDEX IF NOT EXISTS idx_vibration_data_date ON vibration_data(date);
CREATE INDEX IF NOT EXISTS idx_vibration_data_user ON vibration_data(user_id);

-- Insert default admin user (password: admin123)
INSERT OR IGNORE INTO users (username, password_hash, role, full_name) VALUES 
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'مدیر سیستم');