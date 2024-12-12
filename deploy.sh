#!/bin/sh
#  chmod +x deploy.sh 
docker-compose up --build -d
docker logs -f front-end