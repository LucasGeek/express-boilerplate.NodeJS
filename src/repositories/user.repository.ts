// Importações necessárias para definir o repositório
import { User } from '../entities/user';
import { dataSource } from './data-source.connection'

export const userRepository = dataSource.getRepository(User).extend({
    // Método para criar um novo usuário
    async createUser(userData: Partial<User>): Promise<User> {
        const user = this.create(userData);
        return this.save(user);
    },

    // Método para buscar um usuário pelo ID
    async findUserById(id: string): Promise<User | null> {
        return this.findOneBy({ id });
    },

    // Método para buscar um usuário pelo email
    async findUserByEmail(email: string): Promise<User | null> {
        return this.findOneBy({ email });
    },

    // Método para atualizar um usuário
    async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
        await this.update(id, userData);
        return this.findUserById(id);
    },

    // Método específico para atualizar a senha de um usuário
    async updatePassword(userId: string, newPassword: string): Promise<void> {
        await this.update(userId, { password: newPassword });
    },

    // Método específico para atualizar o email de um usuário
    async updateEmail(userId: string, newEmail: string): Promise<void> {
        await this.update(userId, { email: newEmail });
    },

    // Método para deletar um usuário
    async deleteUser(id: string): Promise<void> {
        await this.delete(id);
    },

    // Método para buscar todos os usuários
    async findAll(): Promise<User[]> {
        return this.find();
    },
});