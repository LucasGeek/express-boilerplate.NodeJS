// Importações necessárias para o funcionamento do controller
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import {
    UpdatePasswordValidator,
    UpdateEmailValidator,
    CreateUserValidator,
    UpdateUserValidator,
} from '../validators';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Service } from 'typedi';

// Anotação para injeção de dependência
@Service()
export class UserController {
    // Injeção do UserService no controller
    constructor(private readonly userService: UserService) { }

    // Método para criar um novo usuário
    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            // Transforma e valida os dados de entrada com CreateUserValidator
            const input = plainToInstance(CreateUserValidator, req.body);
            const errors = await validate(input);

            // Verifica se há erros de validação
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            // Utiliza o serviço para criar um usuário e retorna os dados do usuário criado
            const user = await this.userService.createUser(req.body);
            return res.status(201).json(user);
        } catch (error) {
            // Trata erros inesperados
            return res.status(400).json({ message: error.message });
        }
    }

    // Método para buscar um usuário pelo ID
    async findUserById(req: Request, res: Response): Promise<Response> {
        const user = await this.userService.findUserById(req.params.id);

        // Verifica se o usuário foi encontrado
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.json(user);
    }

    // Método para atualizar os dados de um usuário
    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            // Valida os dados de entrada com UpdateUserValidator
            const input = plainToInstance(UpdateUserValidator, req.body);
            const errors = await validate(input);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            // Atualiza o usuário e retorna os dados atualizados
            const user = await this.userService.updateUser(req.params.id, req.body);
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // Método para atualizar a senha de um usuário
    async updatePassword(req: Request, res: Response): Promise<Response> {
        try {
            // Valida os dados de entrada com UpdatePasswordValidator
            const input = plainToInstance(UpdatePasswordValidator, req.body);
            const errors = await validate(input);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            // Atualiza a senha do usuário
            await this.userService.updatePassword(req.params.id, req.body.oldPassword, req.body.newPassword);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // Método para atualizar o email de um usuário
    async updateEmail(req: Request, res: Response): Promise<Response> {
        try {
            // Valida os dados de entrada com UpdateEmailValidator
            const input = plainToInstance(UpdateEmailValidator, req.body);
            const errors = await validate(input);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            // Atualiza o email do usuário
            await this.userService.updateEmail(req.params.id, req.body.newEmail);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // Método para deletar um usuário
    async deleteUser(req: Request, res: Response): Promise<Response> {
        await this.userService.deleteUser(req.params.id);
        return res.status(204).send();
    }

    // Método para buscar todos os usuários
    async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            // Obtém a lista de todos os usuários
            const users = await this.userService.findAll();
            return res.json(users);
        } catch (error) {
            // Trata erros inesperados
            return res.status(500).json({ message: error.message });
        }
    }
}
