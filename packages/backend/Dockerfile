FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install --production

COPY . .

ARG BACKEND_PORT=3001
ENV PORT=$BACKEND_PORT

EXPOSE $BACKEND_PORT

CMD ["npm", "start"]
