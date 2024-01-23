// Importa 'reflect-metadata', uma dependência necessária para o funcionamento do TypeORM
// Permite o uso de decoradores e é essencial para operações de metadados com o TypeORM
import 'reflect-metadata';
import Container from 'typedi';

// Importa as variáveis de ambiente configuradas em './shared/env'
// Isso pode incluir variáveis como a porta do servidor, credenciais do banco de dados, etc.
import { env } from './shared/env';

// Importa as funções 'createApp' e 'listen' do arquivo './app'
// 'createApp' é responsável por criar e configurar uma instância do Express
// 'listen' é usada para iniciar o servidor na porta especificada
import { createApp, listen } from './app';

// Chama a função 'createApp' para criar a aplicação
createApp()
    .then((app) => {
        // Após a aplicação ser criada com sucesso, inicia o servidor na porta definida nas variáveis de ambiente
        listen(app, env.port);
    })
    .catch((error) => {
        // Em caso de falha ao criar a aplicação, exibe o erro no console
        console.error('Erro ao iniciar o servidor:', error);
    });