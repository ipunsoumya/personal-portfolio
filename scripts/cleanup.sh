#!/bin/bash
# Clean up existing files before deployment
rm -rf /var/www/portfolio/frontend/*
rm -rf /var/www/portfolio/backend/*
rm -rf /var/www/portfolio/scripts/*

# Ensure directories exist
# mkdir -p /var/www/portfolio/frontend
# mkdir -p /var/www/portfolio/backend
# mkdir -p /var/www/portfolio/scripts

echo "Cleanup completed"