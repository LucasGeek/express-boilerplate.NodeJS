import AuthMiddleware from '@middlewares/auth.middleware';

// Importa o construtor de Router do Express para criar rotas
import { Router } from 'express';

// Importa o UserController que contém a lógica para manipular requisições de usuários
import { UserController } from '../controllers';

// Importa o container de injeção de dependência do Typedi
import Container from 'typedi';

// Cria uma nova instância de Router para definir rotas específicas para usuários
const userRouter = Router();

// Middleware de autenticação
const authMiddleware = Container.get(AuthMiddleware).middleware.bind(Container.get(AuthMiddleware));

// Obtém uma instância do UserController do container do Typedi
// Isso permite a injeção e gestão de dependências para o UserController
const userController = Container.get(UserController);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: O ID único do usuário.
 *         name:
 *           type: string
 *           description: O nome do usuário.
 *         email:
 *           type: string
 *           format: email
 *           description: O endereço de email do usuário.
 *         password:
 *           type: string
 *           format: password
 *           description: A senha do usuário.
 *       example:
 *         id: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         name: John Doe
 *         email: john.doe@example.com
 */

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', authMiddleware, (req, res) => userController.getAllUsers(req, res));

/**
 * Define uma rota GET para buscar um usuário pelo ID
 * Quando a rota '/users/:id' é acessada com o método GET, o método findUserById do userController é chamado
 * 
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Detalhes do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.get('/:id', (req, res) => userController.findUserById(req, res));

/**
 * Define uma rota PUT para atualizar um usuário
 * Quando a rota '/users/:id' é acessada com o método PUT, o método updateUser do userController é chamado
 * 
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.put('/:id', authMiddleware, (req, res) => userController.updateUser(req, res));

/**
 * Define uma rota PATCH para atualizar a senha de um usuário
 * Quando a rota '/users/:id/password' é acessada com o método PATCH, o método updatePassword do userController é chamado
 * 
 * @swagger
 * /users/{id}/password:
 *   patch:
 *     summary: Atualiza a senha de um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       204:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Senha antiga incorreta ou erro de validação
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.patch('/:id/password', authMiddleware, (req, res) => userController.updatePassword(req, res));

/**
 * Define uma rota PATCH para atualizar o email de um usuário
 * Quando a rota '/users/:id/email' é acessada com o método PATCH, o método updateEmail do userController é chamado
 * 
 * @swagger
 * /users/{id}/email:
 *   patch:
 *     summary: Atualiza o email de um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newEmail:
 *                 type: string
 *                 format: email
 *     responses:
 *       204:
 *         description: Email atualizado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.patch('/:id/email', authMiddleware, (req, res) => userController.updateEmail(req, res));

/**
 * Define uma rota DELETE para deletar um usuário
 * Quando a rota '/users/:id' é acessada com o método DELETE, o método deleteUser do userController é chamado
 * 
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.delete('/:id', authMiddleware, (req, res) => userController.deleteUser(req, res));

// Exporta o roteador configurado para ser utilizado em outro lugar na aplicação
export default userRouter;
