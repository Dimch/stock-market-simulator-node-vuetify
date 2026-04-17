FROM node:24-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ARG PORT=3001
ENV PORT=$PORT
EXPOSE $PORT
CMD ["npm", "run", "dev"]
