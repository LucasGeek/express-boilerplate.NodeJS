import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import path from 'path';

/**
 * Configuração para o Swagger JSDoc.
 * 
 * Esta configuração define as informações básicas da documentação da API,
 * como título, versão e descrição, bem como os caminhos para encontrar as
 * definições das rotas e esquemas da API. Também inclui a configuração para
 * a autenticação JWT nas rotas que necessitam de segurança.
 */
const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Minha API',
            version: '1.0.0',
            description: 'Uma descrição da minha API',
        },
        servers: [
            {
                url: 'http://127.0.0.1:3000/api',
                description: 'Servidor de Desenvolvimento Local'
            },
            // Adicione aqui outros servidores, como servidores de staging ou produção, se necessário
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ],
    },
    apis: [path.join(__dirname, '../routes/*.routes.ts')],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
