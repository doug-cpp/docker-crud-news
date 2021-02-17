# pull official base image
FROM python:3.8.0

# create work directory
RUN mkdir /usr/src/app

# set work directory
WORKDIR /usr/src/app

# copy project
COPY .. /usr/src/app/

# install dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# API service
EXPOSE 5000

# execute command
CMD [ "python", "app.py" ]


