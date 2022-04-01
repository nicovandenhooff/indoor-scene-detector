# base image
FROM node:16 as build-step

RUN mkdir /frontend
# set working directory
WORKDIR /frontend

# install and cache app dependencies
COPY package.json yarn.lock ./

RUN yarn install

# copy other files
COPY ./src ./src
COPY ./public ./public

# expose port number
EXPOSE 3000

CMD ["yarn", "start"]