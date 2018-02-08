FROM node:9.3.0
COPY /client-ritaimoveis /var/www
VOLUME /client-ritaimoveis /var/www
WORKDIR /var/www
RUN npm install
EXPOSE 4200 49153
LABEL author="Douglas Lira"
ENTRYPOINT npm run dev