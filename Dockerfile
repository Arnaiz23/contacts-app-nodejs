FROM node:18

RUN mkdir -p /home/app

WORKDIR /home/app

COPY ./backend .

EXPOSE 9000

CMD [ "npm", "start" ]
