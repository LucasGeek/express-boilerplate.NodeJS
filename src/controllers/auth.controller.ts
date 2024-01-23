import { AuthService, UserService } from '@services/index';

// Importações necessárias para o funcionamento do controller
import { plainToInstance } from 'class-transformer';
import { LoginValidator } from 'src/validators';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Service } from 'typedi';


// Anotação para injeção de dependência
@Service()
export class AuthController {
    // Injeção do UserService e AuthService no controller
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }

    // Método para realizar o login de um usuário
    async login(req: Request, res: Response): Promise<Response> {
        try {
            // Transforma e valida os dados de entrada com LoginValidator
            const input = plainToInstance(LoginValidator, req.body);
            const errors = await validate(input);

            // Verifica se há erros de validação
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            // Busca o usuário pelo email
            const user = await this.userService.findUserByEmail(input.email);
            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            // Verifica a senha
            const valid = await user.verify(input.password);
            if (!valid) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            // Cria um token JWT para o usuário
            const token = this.authService.createToken(user.id);
            return res.json({ token });
        } catch (error) {
            // Trata erros inesperados
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }
}

export default AuthController;
