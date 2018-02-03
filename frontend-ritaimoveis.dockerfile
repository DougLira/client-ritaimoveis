FROM node:9.3.0
RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app
WORKDIR /usr/src/app
RUN npm install
COPY . /usr/src/app
EXPOSE 4200
LABEL author="Douglas Lira"
CMD npm run dev