#!/bin/bash

# Ensure MongoDB is running
if ! systemctl is-active --quiet mongod; then
    systemctl start mongod
    sleep 3
fi

# Start portfolio backend service
systemctl start portfolio-backend

# Start Nginx
systemctl start nginx

# Wait for services to start
sleep 10

# Check if backend is running
for i in {1..30}; do
    if curl -f http://localhost:8001/api/ > /dev/null 2>&1; then
        echo "Portfolio backend started successfully"
        break
    fi
    echo "Waiting for backend to start... ($i/30)"
    sleep 2
done

# Check if Nginx is serving frontend
if curl -f http://localhost/ > /dev/null 2>&1; then
    echo "Frontend is accessible"
else
    echo "Warning: Frontend may not be accessible"
fi

echo "All services started successfully"