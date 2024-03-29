const express = require('express');
const router = express.Router();

const {verifyToken} = require('../shared/auth/auth.js');


const formController = require('../controllers/form.controller.js');
const answerController = require('../controllers/answer.controller.js');
const userController = require('../controllers/user.controller.js');


// Rotas para Formulários

router.get('/forms/:userId', formController.getAllForms);
router.get('/forms/:id', formController.getFormById);
router.post('/forms', formController.createForm);
router.put('/forms/:id', formController.updateFormById);
router.delete('/forms/:id', formController.deleteFormById);

// Rotas para Respostas

router.get('/answers', answerController.getAllFormAnswers);
router.get('/answers/:id', answerController.getFormAnswerById);
router.post('/answers', answerController.createFormAnswers);

// Rotas para Usuario

router.post('/user/login',userController.login);
router.post('/user/register', userController.createUser);
router.get('user/:id', userController.getUserById);


module.exports = router;
