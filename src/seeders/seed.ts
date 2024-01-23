// Importa as funções necessárias do TypeORM para criar uma conexão e gerenciar o tipo de conexão
import { createConnection, Connection } from 'typeorm';

// Importa o seeder específico para a entidade User
import { UserSeeder } from './user.seeder';

// Cria uma conexão com o banco de dados usando as configurações padrão do TypeORM
// As configurações de conexão geralmente são definidas em um arquivo como ormconfig.js ou variáveis de ambiente
createConnection().then(async (connection: Connection) => {
    // Após estabelecer a conexão, executa o método run do UserSeeder
    // O UserSeeder contém a lógica para inserir dados iniciais no banco de dados para a entidade User
    await UserSeeder.run(connection);

    // Após a execução do seeder, fecha a conexão com o banco de dados
    // Isso é importante para não deixar a conexão aberta após a conclusão das operações de seeding
    await connection.close();
}).catch(error => {
    // Em caso de erro durante o processo de conexão ou execução do seeder
    // O erro é capturado e exibido no console
    console.log('Error: ', error);
});
