import { User } from '@entities/user';
import { userRepository } from '../repositories';

// Importa as funções necessárias do pacote jsonwebtoken
import { JsonWebTokenError, JwtPayload, TokenExpiredError, sign, verify } from 'jsonwebtoken';
// Importa as variáveis de ambiente do arquivo de configuração
import { env } from '../shared/env';
// Importa o decorador Service do typedi para injeção de dependência
import { Service } from 'typedi';

// Decorador Service que permite a injeção desta classe em outras partes da aplicação
@Service()
export class AuthService {
    /**
     * Cria um token JWT com base no ID do usuário.
     * 
     * @param userId - O ID do usuário para o qual o token será criado.
     * @returns Um token JWT como uma string.
     */
    createToken(userId: string): string {
        // Utiliza a função sign do jsonwebtoken para criar um novo token
        // O token inclui o ID do usuário e utiliza a chave secreta e a duração definida nas variáveis de ambiente
        return sign({ userId }, env.jwtSecret, { expiresIn: env.jwtExp });
    }

    /**
     * Verifica a validade de um token JWT.
     * 
     * @param token - O token JWT a ser verificado.
     * @returns O payload decodificado do token se for válido.
     */
    async verifyToken(token: string): Promise<User | null> {
        try {
            // Verifica o token e decodifica o payload
            const payload = verify(token, env.jwtSecret) as JwtPayload;

            // Busca o usuário correspondente ao ID no payload do token
            const user = await userRepository.findUserById(payload.userId);

            if (!user) {
                throw new Error('Usuário não encontrado.');
            }

            return user;
        } catch (error) {
            // Trata erros específicos relacionados ao JWT
            if (error instanceof TokenExpiredError) {
                throw new Error('O token expirou.');
            } else if (error instanceof JsonWebTokenError) {
                throw new Error('Token inválido.');
            }

            // Trata outros tipos de erros
            throw new Error('Erro ao verificar o token.');
        }
    }
}
