FROM node:20 AS builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:latest

COPY --from=builder /app/public /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]