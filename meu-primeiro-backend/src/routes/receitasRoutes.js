const express = require('express');
const router = express.Router();

const {verificaToken} = require('../middlewares/authMiddleware');

//Importando o controller
const receitaControllers = require('../controllers/receitaControllers');


//Definindo as rotas e associando ás funções do controller
// Rotas Públicas (qualquer um pode ver)
router.get('/', receitaControllers.listarReceitas);
router.get('/:id', receitaControllers.receitasPorId);

//Rotas protegidas (apenas usuarios autenticados podem acessar)
// O middleware 'verificaToken' é executado antes das funções do controller
router.post('/', verificaToken, receitaControllers.create);
router.put('/:id', verificaToken, receitaControllers.atualizarReceita);
router.delete('/:id', verificaToken, receitaControllers.deletarReceita);

module.exports = router;

