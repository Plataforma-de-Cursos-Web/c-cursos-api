FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY . .

RUN npx nest build auth-service

FROM node:20-alpine 
 
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

EXPOSE 3001

CMD ["node", "dist/apps/auth-service/src/main.js"]