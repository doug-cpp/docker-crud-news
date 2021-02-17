# Solicita o último node:
FROM node:latest

# Expõe as portas. A 3000 é onde vamos acessar o app no navegador,
# enquanto que a 35729 é necessário pra habilitar o hot-reloading
# durante o desenvolvimento:
EXPOSE 3000
EXPOSE 35729

# Configura o diretório de trabalho:
WORKDIR /app

# Adiciona /app/node_modules/.bin às variáveis de ambiente (PATH):
ENV PATH /app/node_modules/.bin:$PATH

# Copia os arquivos, instalando as dependências:
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

# Adiciona React app ao diretório de trabalho:
ADD . /app

# Inicia o React app:
CMD ["npm", "start"]