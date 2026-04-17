FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install --production

COPY . .

ARG PORT=3001
ENV PORT=$PORT

EXPOSE $PORT

CMD ["npm", "start"]
