FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/build /var/www/html

EXPOSE 3000

CMD ["npx", "serve", "-s", "/var/www/html", "-l", "3000"] 