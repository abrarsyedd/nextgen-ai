CREATE DATABASE IF NOT EXISTS nextgen_ai;
USE nextgen_ai;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- [CRITICAL FIX] Insert the Default User so the Chat App works immediately
INSERT INTO users (id, username, email, password_hash) 
VALUES (1, 'DemoUser', 'demo@nextgen.ai', 'hashed_pass_placeholder');

-- 2. Chat History
CREATE TABLE IF NOT EXISTS chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message TEXT NOT NULL,
    is_bot BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 3. Services Catalog
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    price DECIMAL(10, 2)
);

INSERT INTO services (title, description, icon_name, price) VALUES 
('Natural Language Processing', 'Advanced text analysis and generation models.', 'MessageSquare', 0.00),
('Computer Vision', 'Image recognition and object detection APIs.', 'Eye', 0.00),
('Predictive Analytics', 'Forecast future trends using historical data.', 'TrendingUp', 0.00);

-- 4. Solutions (Case Studies)
CREATE TABLE IF NOT EXISTS solutions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    industry VARCHAR(100),
    title VARCHAR(200),
    impact_metric VARCHAR(50)
);

-- 5. Analytics Data (for Graphs)
CREATE TABLE IF NOT EXISTS analytics_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    month VARCHAR(20),
    users INT,
    api_calls INT,
    revenue INT,
    latency_ms INT
);

INSERT INTO analytics_data (month, users, api_calls, revenue, latency_ms) VALUES
('Jan', 4000, 2400, 2400, 120),
('Feb', 3000, 1398, 2210, 110),
('Mar', 2000, 9800, 2290, 90),
('Apr', 2780, 3908, 2000, 85),
('May', 1890, 4800, 2181, 95),
('Jun', 2390, 3800, 2500, 80),
('Jul', 3490, 4300, 2100, 75);

-- 6. Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);