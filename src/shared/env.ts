// Importa o módulo dotenv para carregar variáveis de ambiente de um arquivo .env
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env para process.env
dotenv.config();

/**
 * Obtém uma variável de ambiente como string.
 * @param key - A chave da variável de ambiente.
 * @param defaultValue - O valor padrão a ser retornado se a variável não estiver definida.
 * @returns O valor da variável de ambiente ou o valor padrão.
 */
function getEnvString(key: string, defaultValue: string): string {
    return process.env[key] || defaultValue;
}

/**
 * Obtém uma variável de ambiente como número.
 * @param key - A chave da variável de ambiente.
 * @param defaultValue - O valor padrão a ser retornado se a variável não estiver definida ou não for um número.
 * @returns O valor numérico da variável de ambiente ou o valor padrão.
 */
function getEnvNumber(key: string, defaultValue: number): number {
    const value = process.env[key];
    return value ? Number(value) : defaultValue;
}

// Objeto que armazena as configurações ambientais, lendo do processo.env ou usando valores padrão
export const env = {
    nodeEnv: getEnvString('NODE_ENV', 'development'), // Ambiente do Node (ex: development, production)
    dbHost: getEnvString('DB_HOST', 'localhost'),     // Host do banco de dados
    dbPort: getEnvNumber('DB_PORT', 3306),            // Porta do banco de dados
    dbUsername: getEnvString('DB_USERNAME', 'root'),  // Nome de usuário do banco de dados
    dbPassword: getEnvString('DB_PASSWORD', ''),      // Senha do banco de dados
    dbName: getEnvString('DB_DATABASE', 'mydatabase'),// Nome do banco de dados
    port: getEnvNumber('PORT', 3000),                 // Porta em que a aplicação será executada
    jwtSecret: getEnvString('JWT_SECRET', 'secret'),  // Segredo do JWT
    jwtExp: getEnvString('JWT_EXPIRATION', '1d'),     // Dias de funcionamento do JWT
};
