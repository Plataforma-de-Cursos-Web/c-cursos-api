FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["node", "dist/apps/courses-service/src/main.js"]