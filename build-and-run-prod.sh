#!/bin/bash
git pull origin main
npm install --production
npm run build
pm2 restart gj-raceway