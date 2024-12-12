FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json entrypoint.sh ./

# Expose the port the app runs on
EXPOSE 8080

# Set execute permission for entrypoint.sh
RUN chmod +x entrypoint.sh

# Set entry point
CMD ["/bin/sh", "./entrypoint.sh"]