const { verifyToken } = require('../shared/auth/auth.js');
const formController = require('../controllers/form.controller.js');
const answerController = require('../controllers/answer.controller.js');
const userController = require('../controllers/user.controller.js');

const router = (app) => {
  /**
   * @swagger
   * /healthcheck:
   *   get:
   *     summary: Checagem de saúde da API
   *     tags:
   *       - Healthcheck
   *     responses:
   *       200:
   *         description: OK
   */
  app.get('/healthcheck', (req, res) => res.sendStatus(200));

  /**
   * @swagger
   * /forms/{userId}:
   *   get:
   *     summary: Obter todos os formulários de um usuário
   *     tags:
   *       - Forms
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *         description: O ID do usuário
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: './src/models/Form'
   */
  app.get('/forms/:userId', verifyToken, formController.getAllForms);

  /**
   * @swagger
   * /form/{id}:
   *   get:
   *     summary: Obter um formulário por ID
   *     tags:
   *       - Forms
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: O ID do formulário
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: './src/models/Form'
   */
  app.get('/form/:id', verifyToken, formController.getFormById);

  /**
   * @swagger
   * /form/new:
   *   post:
   *     summary: Criar um novo formulário
   *     tags:
   *       - Forms
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: './src/models/Form'
   *     responses:
   *       200:
   *         description: Formulário criado com sucesso
   */
  app.post('/form/new', verifyToken, formController.createForm);

  /**
   * @swagger
   * /forms/edit/{id}:
   *   put:
   *     summary: Atualizar um formulário por ID
   *     tags:
   *       - Forms
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: O ID do formulário a ser atualizado
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: './src/models/Form'
   *     responses:
   *       200:
   *         description: Formulário atualizado com sucesso
   */
  app.put('/forms/edit/:id', verifyToken, formController.updateFormById);

  /**
   * @swagger
   * /form/view/{id}:
   *   get:
   *     summary: Visualizar um formulário ativo por ID
   *     tags:
   *       - Forms
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: O ID do formulário a ser visualizado
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: './src/models/Form'
   */
  app.get('/form/view/:id', formController.getFormByIdActive);


  /**
   * @swagger
   * /answer:
   *   post:
   *     summary: Enviar uma resposta de formulário
   *     tags:
   *       - Answers
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: './src/models/Answer'
   *     responses:
   *       200:
   *         description: Resposta de formulário enviada com sucesso
   */
  app.post('/answer', answerController.createFormAnswers);

  /**
   * @swagger
   * /user/login:
   *   post:
   *     summary: Login de usuário
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: './src/models/User'
   *     responses:
   *       200:
   *         description: Login bem-sucedido
   */
  app.post('/user/login', userController.login);

  /**
   * @swagger
   * /user/register:
   *   post:
   *     summary: Registro de novo usuário
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: './src/models/User'
   *     responses:
   *       200:
   *         description: Usuário registrado com sucesso
   */
  app.post('/user/register', userController.createUser);

  /**
   * @swagger
   * /user/{id}:
   *   get:
   *     summary: Obter informações de usuário por ID
   *     tags:
   *       - Users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: O ID do usuário
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: './src/models/User'
   */
  app.get('/user/:id', verifyToken, userController.getUserById);
}

module.exports = router;
