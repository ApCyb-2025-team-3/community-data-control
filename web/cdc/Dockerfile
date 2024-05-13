FROM node:22 as build-deps
WORKDIR /usr/app
COPY package.json package-lock.json ./
COPY ./public ./public
COPY ./src ./src
RUN npm install --production && npm run build

FROM nginx:1.26.0
COPY --from=build-deps /usr/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80