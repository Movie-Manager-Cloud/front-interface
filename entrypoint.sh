#!/bin/bash
npm i
if [ "$APP_ENV" = 'development' ]; then 
  npm run serve
else 
  npm install -g http-server
  npm run build
  http-server dist
fi