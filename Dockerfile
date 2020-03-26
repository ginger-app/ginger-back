# Builder
FROM node:12 AS builder
RUN echo 'Welcome to Ginger Back!'

# Prepare data
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

# Build
RUN npm run build

CMD ["npm", "run", "start:prod"]