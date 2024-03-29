# Node Express Boilerplate

Este projeto é uma configuração e padronização inicial para um projeto Node.js utilizando Express. Ele inclui várias bibliotecas e ferramentas para ajudar a acelerar o desenvolvimento de aplicações web.

## Descrição

Este boilerplate serve como ponto de partida para projetos Node.js, configurado com Express, TypeORM, Typedi, e várias outras ferramentas úteis para desenvolvimento e testes.

## Recursos

- **Express**: Framework web rápido, flexível e minimalista.
- **TypeORM**: ORM para TypeScript e JavaScript.
- **Typedi**: Contêiner de injeção de dependência.
- **Swagger**: Geração de documentação da API.
- **Jest**: Framework de teste.
- **Eslint**: Linter para TypeScript e JavaScript.
- **Argon2**: Para hashing seguro de senhas.
- **JsonWebToken**: Implementação de JWTs.
- **Dotenv**: Carregamento de variáveis de ambiente.

## Scripts Disponíveis

No diretório do projeto, você pode rodar:

### `npm start`

Executa a aplicação em modo de produção.

### `npm run dev`

Executa a aplicação em modo de desenvolvimento com recarga automática.

### `npm run build`

Compila o projeto para produção na pasta `dist`.

### `npm run test`

Executa os testes unitários.

### `npm run lint`

Executa o linter em todos os arquivos TypeScript.

### `npm run seed`

Executa os seeders para popular o banco de dados.

### `npm run typeorm`

Executa comandos TypeORM.

## Configuração e Inicialização do Projeto

Siga os passos abaixo para configurar e iniciar o projeto:

## Configuração e Inicialização do Projeto

Siga os passos abaixo para configurar e iniciar o projeto:

### 1. Instalação das Dependências

Primeiramente, execute o comando abaixo para instalar todas as dependências do projeto:

    npm install

### 2. Configuração do Docker
É recomendável ter o Docker Compose ou Podman Compose instalado em sua máquina. No projeto, existem dois arquivos de configuração do Docker Compose: `docker-compose.yml` e `docker-compose.local.yml`. A principal diferença entre eles é:

-   `docker-compose.local.yml`: Destinado ao uso local pelo desenvolvedor, executa apenas o banco de dados.
-   `docker-compose.yml`: Realiza o build da aplicação e do banco de dados, ideal para ambientes de produção ou testes mais integrados.

### 3. Configuração do Ambiente

Crie um novo arquivo `.env` usando o arquivo `.env.example` como base. Preencha as variáveis de ambiente conforme necessário para configurar o projeto.

### 4. Execução de Migrations

Para criar a estrutura inicial do banco de dados, execute as migrations usando um dos comandos abaixo:

`npm run migration:generate --name=NOME_DA_MIGRATION` 

ou

`npx typeorm migration:create ./src/migrations/NOME_DA_MIGRATION` 

Esses comandos criam as tabelas e estruturas necessárias no banco de dados conforme definido nas migrations.

### 5. Execução das Seeders

Para popular o banco de dados com dados iniciais, execute as seeders com o comando:

`npm run seed` 

ou

`ts-node -r tsconfig-paths/register ./src/seeders/seed.ts` 

### 6. Inicialização da Aplicação

Após a configuração do banco de dados, inicie a API com o seguinte comando:

`npm run dev` 

Agora, a aplicação deve estar rodando e pronta para uso!

## Como Contribuir

Contribuições são sempre bem-vindas. Por favor, leia o guia de contribuição para saber como contribuir para o projeto.

## Licença

Este projeto está licenciado sob a licença ISC.

## Autor

Lucas Albuquerque
