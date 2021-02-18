# Cria a imagem, com base no Python 3.8
FROM python:3.8

# Expõe a porta
EXPOSE 5000

# Informa ao Python pra não gerar .pyc
ENV PYTHONDONTWRITEBYTECODE 1

# Desliga o mecanismo de buffering
ENV PYTHONUNBUFFERED 1

# Instala requirements.txt usando pip
ADD requirements.txt .
RUN python -m pip install -r requirements.txt

# Configura o directorio de trabalho e arquivos da API Flask API
WORKDIR /app
ADD . /app



# # pull official base image
# FROM python:3.8.0

# # create work directory
# RUN mkdir /usr/src/app

# # set work directory
# WORKDIR /usr/src/app

# # copy project
# COPY .. /usr/src/app/

# # install dependencies
# RUN pip install --upgrade pip
# RUN pip install --no-cache-dir -r requirements.txt

# # API service
# EXPOSE 5000

# # execute command
# CMD [ "python", "app.py" ]


