const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const usuarioModel = require('../models/usuarioModel');

const JWT_SECRET = '1234';

// Listar todos os usuários
exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.findAll();

        if (usuarios.length === 0) {
            return res.status(200).json({ message: 'Não há usuários cadastrados.' });
        }

        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuários.', error: err.message });
    }
};


// Buscar usuário por ID
exports.buscarUsuarioPorId = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const usuario = await usuarioModel.findByPk(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuário.', error: err.message });
    }
};

// Criar novo usuário
exports.criarUsuario = async (req, res) => {
    const { nome, usuario, senha } = req.body;

    if (!nome || !usuario || !senha) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    try {
        const usuarioExistente = await usuarioModel.findOne({ where: { usuario } });
        if (usuarioExistente) return res.status(400).json({ message: 'Usuário já cadastrado!' });

        const senhaHash = bcrypt.hashSync(senha, 10);
        const novoUsuario = await usuarioModel.create({ nome, usuario, senha: senhaHash });

        res.status(201).json(novoUsuario);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar usuário.', error: err.message });
    }
};

// Atualizar usuário
exports.atualizarUsuario = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, usuario, senha } = req.body;

    if (!nome || !usuario || !senha) {
        return res.status(400).json({ message: 'Nome, usuário e senha são obrigatórios.' });
    }

    try {
        // Verifica se já existe outro usuário com o mesmo login
        const usuarioExistente = await usuarioModel.findOne({
            where: { usuario }
        });

        // Se existir e for um usuário diferente do que estamos atualizando, bloqueia
        if (usuarioExistente && usuarioExistente.id !== id) {
            return res.status(400).json({ message: 'Este usuário já está cadastrado.' });
        }

        // Hash da senha antes de atualizar
        const senhaHash = bcrypt.hashSync(senha, 10);

        // Atualiza apenas os campos necessários
        const [updated] = await usuarioModel.update(
            { nome, usuario, senha: senhaHash },
            { where: { id } }
        );

        if (updated) {
            const usuarioAtualizado = await usuarioModel.findByPk(id);
            res.json(usuarioAtualizado);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor.', error: err.message });
    }
};


// Deletar usuário
exports.deletarUsuario = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const deleted = await usuarioModel.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

// Login
exports.login = async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });

    try {
        const usuarioEncontrado = await usuarioModel.findOne({ where: { usuario } });
        if (!usuarioEncontrado) return res.status(401).json({ message: 'Usuário ou senha incorretos.' });

        const senhaValida = bcrypt.compareSync(senha, usuarioEncontrado.senha);
        if (!senhaValida) return res.status(401).json({ message: 'Usuário ou senha incorretos.' });

        const token = jwt.sign(
            { id: usuarioEncontrado.id, nome: usuarioEncontrado.nome },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login bem-sucedido!', token });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar login.', error: err.message });
    }
};
