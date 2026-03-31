# 1. Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build   # build TypeScript -> dist/

# 2. Run stage
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]