#!/bin/bash
# Clean up existing files before deployment
rm -r /var/www/portfolio/frontend/*
rm -r /var/www/portfolio/backend/*
rm -r /var/www/portfolio/scripts/*

# Ensure directories exist
# mkdir -p /var/www/portfolio/frontend
# mkdir -p /var/www/portfolio/backend
# mkdir -p /var/www/portfolio/scripts

echo "Cleanup completed"