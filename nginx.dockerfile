FROM nginx:latest
LABEL author="Douglas Lira"
COPY /client-ritaimoveis/dist /var/www/dist
COPY /client-ritaimoveis/nginx.conf /etc/nginx/nginx.conf
RUN chmod 755 -R /var/www/dist
EXPOSE 80 443
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
