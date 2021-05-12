FROM node:13.12.0-alpine
WORKDIR /crud-app-frontend
COPY package*.json /crud-app-frontend/
RUN npm install
COPY . /crud-app-frontend
CMD ["npm", "start"]