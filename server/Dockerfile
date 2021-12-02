FROM node:14-alpine AS builder

ENV NODE_OPTIONS=--max-old-space-size=4096

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 4000
CMD [ "npm", "run", "start:prod" ]
