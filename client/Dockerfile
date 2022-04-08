# base image
FROM node:16

# development endpoint
ENV REACT_APP_API_ENDPOINT=http://localhost:5000

# updates
RUN apt-get update && apt-get install

# set working directory
WORKDIR /frontend

# copy requirements and settings
COPY package.json yarn.lock ./

# install packages
RUN yarn install

# copy front end source code and assets
COPY ./src ./public ./

# front end port
EXPOSE 3000