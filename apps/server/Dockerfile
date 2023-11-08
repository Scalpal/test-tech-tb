FROM node:18 as base

RUN mkdir -p /app

WORKDIR /app

COPY . . 

RUN npm install

COPY entrypoint.sh /entrypoint.sh
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /entrypoint.sh /wait-for-it.sh

ENTRYPOINT ["/entrypoint.sh"] 