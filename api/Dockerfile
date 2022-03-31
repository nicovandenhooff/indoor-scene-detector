# pull base image
FROM python:3.9.10

# set work directory
WORKDIR /app

# set environments
ENV FLASK_APP app.py

ENV FLASK_ENV development

# copy the requirements file into the image
COPY ./requirements.txt /app/requirements.txt

# upgrade pip
RUN pip install --upgrade pip

# install packages
RUN pip install -r requirements.txt

# copy everything across
COPY ./ /app

# expose port number
EXPOSE 5000


CMD [ "flask", "run" ]

# configure the container to run in an executed manner
# ENTRYPOINT [ "python" ]

# run server.py
# CMD ["server.py" ]