// Importa as funções necessárias do TypeORM para gerenciar conexões e repositórios
import { Connection, getRepository } from 'typeorm';

// Importa a entidade User
import { User } from '../entities';

// Define a classe UserSeeder
export class UserSeeder {
    // Método estático run que será chamado para executar o seed
    public static async run(connection: Connection): Promise<void> {
        // Obtém o repositório da entidade User
        // O repositório permite realizar operações de banco de dados na tabela de usuários
        const userRepository = getRepository(User);

        // Define uma lista de usuários a serem inseridos no banco de dados
        // Cada objeto representa um registro de usuário
        const users = [
            { name: 'Heloise Caroline Kamilly Assunção', email: 'heloisecarolineassuncao@ozsurfing.com.br', password: 'password123' },
            { name: 'Murilo Ryan da Mata', email: 'murilo.ryan.damata@clinicamedicofacil.com.br', password: 'password123' },
            { name: 'Cláudia Lavínia Nogueira', email: 'claudia.lavinia.nogueira@salvadorlogistica.com.br', password: 'password123' },
            { name: 'Eduarda Julia Elisa Barbosa', email: 'eduarda_julia_barbosa@academiaconcerto.art.br', password: 'password123' },
            { name: 'Isabelle Malu Marina Vieira', email: 'isabelle_malu_vieira@yahoo.com.ar', password: 'password123' },
        ];

        // Loop para criar e salvar cada usuário no banco de dados
        for (const userData of users) {
            // Cria uma nova instância da entidade User
            const user = new User();

            // Atribui os dados do usuário (nome, email, senha) à instância
            user.name = userData.name;
            user.email = userData.email;
            user.password = userData.password;

            // Salva o usuário no banco de dados
            await userRepository.save(user);
        }
    }
}
