# docker build -t komunalka-cms-img .

# step 1 (build stage)
FROM node:18-alpine as front
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# step 2 (production-stage)
FROM php:8.3-zts-alpine as app
WORKDIR /var/www/html
CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
RUN docker-php-ext-install mysqli pdo_mysql \
  && curl -sS https://getcomposer.org/installer | php -- --version=2.6.6 --install-dir=/usr/local/bin --filename=composer
COPY . .
COPY --from=front /app/public/build /var/www/html/public/build
RUN composer install
