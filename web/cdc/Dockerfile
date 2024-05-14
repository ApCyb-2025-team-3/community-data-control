FROM node:22 as build-deps
WORKDIR /usr/app
COPY package.json package-lock.json ./
COPY .env.production .env
COPY ./public ./public
COPY ./src ./src
RUN npm install --production && npm run build

FROM nginx:1.26.0
COPY --from=build-deps /usr/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
EXPOSE 80