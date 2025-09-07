#!/bin/bash

# Stop portfolio backend service
if systemctl is-active --quiet portfolio-backend; then
    systemctl stop portfolio-backend
    echo "Portfolio backend stopped"
fi

# Stop Nginx
if systemctl is-active --quiet nginx; then
    systemctl stop nginx
    echo "Nginx stopped"
fi

echo "Services stopped successfully"