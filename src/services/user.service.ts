import { User } from '../entities';
import { userRepository } from '../repositories';
import { hash, verify } from 'argon2';
import { Service } from 'typedi';

@Service()
export class UserService {
    /**
     * Cria um novo usuário com validações.
     * @param userData - Dados parciais do usuário.
     * @returns O usuário criado.
     */
    async createUser(userData: Partial<User>): Promise<User> {
        return userRepository.createUser(userData);
    }

    /**
     * Busca um usuário pelo ID.
     * @param id - ID do usuário.
     * @returns O usuário encontrado ou null se não encontrado.
     */
    async findUserById(id: string): Promise<User | null> {
        return userRepository.findUserById(id);
    }

    /**
     * Busca um usuário pelo email.
     * @param email - Email do usuário.
     * @returns O usuário encontrado ou null se não encontrado.
     */
    async findUserByEmail(email: string): Promise<User | null> {
        return userRepository.findUserByEmail(email);
    }

    /**
     * Atualiza os dados de um usuário.
     * @param id - ID do usuário a ser atualizado.
     * @param userData - Novos dados do usuário.
     * @returns O usuário atualizado ou null se não encontrado.
     */
    async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
        return userRepository.updateUser(id, userData);
    }

    /**
     * Atualiza a senha de um usuário após verificar a senha antiga.
     * @param userId - ID do usuário.
     * @param oldPassword - Senha antiga para verificação.
     * @param newPassword - Nova senha a ser definida.
     */
    async updatePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
        // Encontra o usuário pelo ID
        const user = await userRepository.findUserById(userId);

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        // Verifica se a senha antiga está correta
        const isOldPasswordValid = await verify(user.password, oldPassword);
        if (!isOldPasswordValid) {
            throw new Error('Senha antiga incorreta.');
        }

        // Hash da nova senha usando argon2
        const hashedNewPassword = await hash(newPassword);

        // Atualiza a senha do usuário
        await userRepository.updatePassword(userId, hashedNewPassword);
    }

    /**
     * Atualiza o email de um usuário, verificando se o novo email já está em uso.
     * @param userId - ID do usuário.
     * @param newEmail - Novo email.
     */
    async updateEmail(userId: string, newEmail: string): Promise<void> {
        const existingUser = await userRepository.findUserByEmail(newEmail);
        if (existingUser) {
            throw new Error('Email já está em uso.');
        }
        return userRepository.updateEmail(userId, newEmail);
    }

    /**
     * Deleta um usuário.
     * @param id - ID do usuário a ser deletado.
     */
    async deleteUser(id: string): Promise<void> {
        return userRepository.deleteUser(id);
    }

    /**
     * Busca todos os usuários.
     * @returns Uma lista com todos os usuários.
     */
    async findAll(): Promise<User[]> {
        return userRepository.findAll();
    }
}
