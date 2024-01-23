import { DataSource } from "typeorm";
import { env } from '../shared/env'

// Cria uma instância de DataSource configurada para MySQL
export const dataSource = new DataSource({
    type: "mysql",
    host: env.dbHost,          // Obtém o host do banco de dados a partir das variáveis de ambiente
    port: env.dbPort,          // Obtém a porta do banco de dados a partir das variáveis de ambiente
    username: env.dbUsername,  // Obtém o nome de usuário do banco de dados a partir das variáveis de ambiente
    password: env.dbPassword,  // Obtém a senha do banco de dados a partir das variáveis de ambiente
    database: env.dbName,      // Obtém o nome do banco de dados a partir das variáveis de ambiente
    synchronize: true,         // Sincroniza as entidades com o banco de dados (apenas para desenvolvimento)
    logging: false,            // Desativa o registro de consultas SQL no console
    entities: ["src/entities/**/*.ts"],     // Caminho para as entidades do banco de dados
    migrations: ["src/migration/**/*.ts"],   // Caminho para as migrações do banco de dados
    subscribers: []
});

// Inicializa a conexão com o banco de dados
dataSource.initialize()
    .then(() => {
        console.log("Data Source foi inicializado com sucesso!"); // Exibe mensagem de sucesso
    })
    .catch((err) => {
        console.error("Erro durante a inicialização do Data Source:", err); // Exibe mensagem de erro em caso de falha na inicialização
    });
