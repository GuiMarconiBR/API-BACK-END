const express = require('express');
const router = express.Router();
const usuarioControllers = require('../controllers/usuarioControllers');
const { verificaToken } = require('../middlewares/authMiddleware');

// Rotas públicas
router.post('/login', usuarioControllers.login); 

// Rotas protegidas (necessitam de token)
router.get('/', verificaToken, usuarioControllers.listarUsuarios);
router.get('/:id', verificaToken, usuarioControllers.buscarUsuarioPorId);
router.post('/', verificaToken, usuarioControllers.criarUsuario);
router.put('/:id', verificaToken, usuarioControllers.atualizarUsuario);
router.delete('/:id', verificaToken, usuarioControllers.deletarUsuario);

module.exports = router;
