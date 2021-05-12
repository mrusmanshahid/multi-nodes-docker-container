FROM node:13.12.0-alpine
WORKDIR /crud-app-backend
COPY package*.json /crud-app-backend/
RUN npm install
COPY . /crud-app-backend
CMD ["npm", "run", "dev"]