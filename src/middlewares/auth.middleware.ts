// Importa as dependências necessárias do Express e Typedi
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { Service } from 'typedi';

import { User } from '@entities/user';

declare global {
    namespace Express {
        interface Request {
            user?: User | null;
        }
    }
}

// Decora a classe com @Service para habilitar a injeção de dependências através do Typedi
@Service()
class AuthMiddleware {
    // O AuthService é injetado no middleware através do construtor
    constructor(private readonly authService: AuthService) { }

    // Método que será usado como middleware no Express
    public async middleware(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token não fornecido.' });
            }

            try {
                // A verificação do token é uma operação assíncrona
                const user = await this.authService.verifyToken(token);
                req.user = user;
                next();
            } catch (error) {
                // Trata erros específicos relacionados à verificação do token
                return res.status(401).json({ message: error.message });
            }
        } catch (error) {
            // Trata erros gerais que podem ocorrer ao extrair o token
            res.status(500).json({ message: 'Erro ao processar a autenticação.' });
        }
    }
}

// Exporta a classe AuthMiddleware para uso em outras partes da aplicação
export default AuthMiddleware;
