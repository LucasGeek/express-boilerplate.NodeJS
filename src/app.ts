// Importa o framework Express e o tipo Express
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger';

// Importa a função para criar uma conexão do TypeORM
import { createConnection } from 'typeorm';

// Importa o roteador base, que contém as rotas da aplicação
import BaseRouter from './routes/routes';
import cors from 'cors';

// Função assíncrona para inicializar o Express
async function initializeExpress(): Promise<Express> {
    // Cria uma nova instância do Express
    const app = express();

    // Configura o middleware para parsear JSON nas requisições
    app.use(express.json());
    app.use(cors());

    // Rota para servir a documentação do Swagger
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Configura o roteador base para ser usado no caminho '/api'
    // Todas as rotas definidas em BaseRouter serão prefixadas com '/api'
    app.use('/api', BaseRouter);

    // Retorna a instância configurada do Express
    return app;
}

// Função assíncrona para criar a aplicação
export async function createApp(): Promise<Express> {
    // Cria uma conexão com o banco de dados usando as configurações padrão do TypeORM
    await createConnection();

    // Inicializa e retorna a aplicação Express
    return initializeExpress();
}

// Função para iniciar o servidor
export function listen(app: Express, port: number): void {
    // Inicia o servidor Express na porta especificada
    app.listen(port, () => {
        console.log(`Servidor iniciou na porta ${port}`);
    });
}
