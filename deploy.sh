#!/bin/bash
npm install
npm run build
pm2 startOrRestart ecosystem.config.js