#!/bin/bash

# Validate backend API
echo "Validating backend API..."
if curl -f http://localhost:8001/api/ > /dev/null 2>&1; then
    echo "✓ Backend API is responding"
else
    echo "✗ Backend API is not responding"
    exit 1
fi

# Validate frontend
echo "Validating frontend..."
if curl -f http://localhost/ > /dev/null 2>&1; then
    echo "✓ Frontend is accessible"
else
    echo "✗ Frontend is not accessible"
    exit 1
fi

# Check MongoDB connection
echo "Validating MongoDB connection..."
if curl -f http://localhost:8001/api/personal-info > /dev/null 2>&1; then
    echo "✓ MongoDB connection is working"
else
    echo "✗ MongoDB connection failed"
    exit 1
fi

echo "All services validated successfully"