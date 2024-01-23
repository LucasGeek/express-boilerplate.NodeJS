# Use a imagem oficial do Node.js como imagem base
FROM node:16

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependências e instala as dependências do projeto
COPY package*.json ./
RUN npm install

# Copia os arquivos do projeto para o diretório de trabalho do container
COPY . .

# Compila o projeto TypeScript
RUN npm run build

# Expõe a porta que o servidor Express usará
EXPOSE 3000

# Define o comando para rodar o aplicativo
CMD ["node", "dist/server.js"]
