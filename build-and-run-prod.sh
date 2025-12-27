#!/bin/bash
git pull origin main
npm install --production
npm run prisma:generate
npm run build
pm2 delete gj-raceway
pm2 start npm --name "gj-raceway" -- start
