FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD /bin/sh -c "envsubst '$$API_URL $$IDENTITY_API_PATH $$DOMAIN2_API_PATH $$KITCHEN_API_PATH' < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html.tmp && \
     mv /usr/share/nginx/html/index.html.tmp /usr/share/nginx/html/index.html && \
     nginx -g 'daemon off;'"