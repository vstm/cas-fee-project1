FROM node:12.5-alpine

WORKDIR /app

COPY . /app
RUN npm ci && chown node:node -R /app

EXPOSE 3000
USER node
VOLUME /app/data

CMD ["npm", "start" ]
