FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose le port 5000
EXPOSE 5000

# Utiliser le port 5000 pour le serveur React
CMD ["npm", "server.js"]
