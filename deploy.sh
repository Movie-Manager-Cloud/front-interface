#!/bin/sh
#  chmod +x deploy.sh 
docker build -t front-end .
docker run -d --name front-end -p 8080:8080 --env APP_ENV=${APP_ENV} front-end
docker logs -f front-end