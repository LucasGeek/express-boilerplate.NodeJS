// Importa o construtor de Router do framework Express
import { Router } from 'express';

// Importa o roteador específico para usuários
// Este roteador deve conter todas as rotas relacionadas a operações de usuários
import userRouter from './user.routes'
import authRouter from './auth.routes'

// Cria uma instância do roteador do Express
const router = Router();

// Configura o roteador para usar o roteador de usuários em todas as rotas que começam com '/users'
// Por exemplo, se o userRouter tiver uma rota '/profile', ela estará acessível em '/users/profile' na aplicação
router.use('/users', userRouter);
router.use('/auth', authRouter);

// Exporta o roteador configurado para ser usado em outras partes da aplicação, como no arquivo principal do servidor
export default router;
