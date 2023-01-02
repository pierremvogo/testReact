FROM node:18.12.1

WORKDIR /app

COPY  ./package.json  .

COPY ./.npmrc .

RUN npm install -g expo-cli

RUN  yarn install

COPY . .

CMD ["yarn", "start"]

EXPOSE 19000
