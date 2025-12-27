#!/bin/bash

set -e  # Exit on any error

echo "🚀 Starting deployment..."

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run prisma:generate

# Build the app
echo "🏗️ Building Next.js app..."
npm run build

# Check if build succeeded
if [ ! -d ".next" ]; then
    echo "❌ Build failed - .next directory not found!"
    exit 1
fi

# Restart PM2
echo "🔄 Restarting PM2..."
pm2 restart gj-raceway 2>/dev/null || pm2 start npm --name "gj-raceway" -- start

# Show logs
echo "✅ Deployment complete!"
pm2 logs gj-raceway --lines 20