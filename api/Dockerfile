# base image
FROM python:3.9-slim-buster

# flask app/env
ENV FLASK_APP=app.py
ENV FLASK_ENV=development

# updates
RUN apt-get update && apt-get install

# set working directory
WORKDIR /api

# copy api to app folder
COPY . ./

# install python requirements
RUN pip3 install -r requirements.txt

# api port
EXPOSE 5000