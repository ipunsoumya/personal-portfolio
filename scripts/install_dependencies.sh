#!/bin/bash

# Update system packages
yum update -y

# Install Node.js 18 if not present
if ! command -v node &> /dev/null; then
    curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
    yum install -y nodejs
fi

# Install Python 3.11 if not present
if ! command -v python3.11 &> /dev/null; then
    yum install -y python3.11 python3.11-pip
    alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1
    alternatives --install /usr/bin/pip3 pip3 /usr/bin/pip3.11 1
fi

# Install Nginx if not present
if ! command -v nginx &> /dev/null; then
    yum install -y nginx
fi

# Install Python dependencies
cd /var/www/portfolio/backend
pip3 install --upgrade pip setuptools wheel
pip3 install --no-cache-dir -r requirements.txt

# Set proper permissions
chown -R ec2-user:ec2-user /var/www/portfolio
chmod +x /var/www/portfolio/scripts/*.sh

# Create systemd service for backend
cat > /etc/systemd/system/portfolio-backend.service << EOF
[Unit]
Description=Portfolio Backend API
After=network.target mongod.service
Requires=mongod.service

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/var/www/portfolio/backend
Environment=MONGO_URL=mongodb://localhost:27017
Environment=DB_NAME=portfolio
ExecStart=/usr/bin/python3 -m uvicorn server:app --host 0.0.0.0 --port 8001
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Configure Nginx
cat > /etc/nginx/conf.d/portfolio.conf << EOF
server {
    listen 80;
    server_name _;

    # Frontend - React App
    location / {
        root /var/www/portfolio/frontend;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Reload systemd
systemctl daemon-reload
systemctl enable portfolio-backend
systemctl enable nginx

echo "Dependencies installed successfully"