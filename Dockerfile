FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install yarn
RUN yarn install
COPY . .
EXPOSE 8095
CMD ["npm", "start"]
