FROM node:21.5.0-alpine3.18
WORKDIR /app 
COPY package*.json ./ 
RUN npm install 
COPY . . 
EXPOSE 5000 
CMD ["npm", "start"]