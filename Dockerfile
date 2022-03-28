# base image
FROM node:16 as build-step

# set working directory
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json yarn.lock ./
COPY ./src ./src
COPY ./public ./public
RUN yarn install
RUN yarn build

# pull base image
FROM python:3.10

# set work directory
WORKDIR /app

COPY --from=build-step /app/build ./build

RUN mkdir ./server
# install dependencies
RUN pip install --upgrade pip

# copy files
COPY ./server /app/server

WORKDIR /app/server

# install packages
RUN pip install -r requirements.txt

EXPOSE 3001
WORKDIR /app/server

CMD ["gunicorn", "-b", ":3001", "server:app"]



# start app
# Build step #2: build an nginx container
# FROM nginx:stable-alpine
# COPY --from=build-step /app/build /usr/share/nginx/html
# COPY deployment/nginx.default.conf /etc/nginx/conf.d/default.conf
# CMD ["yarn", "start"]