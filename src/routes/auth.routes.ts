import AuthMiddleware from '@middlewares/auth.middleware';

// Importa o construtor de Router do Express para criar rotas
import { Router } from 'express';

// Importa o UserController que contém a lógica para manipular requisições de usuários
import { UserController, AuthController } from '../controllers';

// Importa o container de injeção de dependência do Typedi
import Container from 'typedi';

// Cria uma nova instância de Router para definir rotas específicas para usuários
const authRouter = Router();

// Obtém uma instância do UserController do container do Typedi
// Isso permite a injeção e gestão de dependências para o UserController e AuthController
const userController = Container.get(UserController);
const authController = Container.get(AuthController);

/**
 * Define uma rota POST para criar um novo usuário
 * Quando a rota '/auth/register' é acessada com o método POST, o método createUser do userController é chamado
 * 
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: O nome completo do usuário
 *               email:
 *                 type: string
 *                 format: email
 *                 description: O endereço de email do usuário
 *               password:
 *                 type: string
 *                 format: password
 *                 description: A senha do usuário
 *                 minLength: 8
 *                 maxLength: 20
 *             example:
 *               name: John Doe
 *               email: johndoe@example.com
 *               password: senhaSegura123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Erro no servidor
 */
authRouter.post('/register', (req, res) => userController.createUser(req, res));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: O endereço de email do usuário
 *               password:
 *                 type: string
 *                 format: password
 *                 description: A senha do usuário
 *             example:
 *               email: usuario@example.com
 *               password: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retorna um token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: O token JWT gerado para o usuário
 *       401:
 *         description: Credenciais inválidas ou usuário não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
authRouter.post('/login', (req, res) => authController.login(req, res));


// Exporta o roteador configurado para ser utilizado em outro lugar na aplicação
export default authRouter;