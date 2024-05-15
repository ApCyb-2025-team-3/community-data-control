FROM node:20
WORKDIR /usr/app
COPY package.json package-lock.json ./
COPY .env.production .env
COPY ./public ./public
COPY ./src ./src

RUN npm install --production && npm run build && npm install serve -g
COPY env.sh ./
COPY entrypoint.sh ./

ENTRYPOINT ["./entrypoint.sh"]