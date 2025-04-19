FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV PORT=3000

RUN mkdir -p /app/logs

RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["npm", "start"] 