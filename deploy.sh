#!/bin/sh
#  chmod +x deploy.sh 

# Charger les variables d'environnement depuis le fichier .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Définir le Dockerfile en fonction de l'environnement
DOCKERFILE="Dockerfile.prod"
if [ "$APP_ENV" = "development" ]; then
    DOCKERFILE="Dockerfile.dev"
fi

# Supprimer les conteneurs existants
if [ "$(docker ps -aq -f name=front-end)" ]; then
    docker rm -f front-end
fi

# Construire l'image Docker avec le cache
docker build -t front-end -f $DOCKERFILE .

# Exécuter le conteneur Docker
docker run -d --name front-end -p 8080:8080 --env APP_ENV=${APP_ENV} front-end

# Afficher les logs du conteneur
docker logs -f front-end