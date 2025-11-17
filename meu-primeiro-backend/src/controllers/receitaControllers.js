const receitaModel = require('../models/receitaModel');

// GET (Listar Todos)
exports.listarReceitas = async (req, res) => {
    try {
        const receitas = await receitaModel.findAll();

        if (receitas.length === 0) {
            return res.status(200).json({ message: 'Não há receitas cadastradas.' });
        }

        res.json(receitas);
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor ao buscar as receitas.', error: err.message });
    }
};


// GET (Buscar por ID)
exports.receitasPorId = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const receita = await receitaModel.findByPk(id);
        if (receita) {
            res.json(receita);
        } else {
            res.status(404).json({ message: 'Receita não encontrada.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor ao buscar a receita.', error: err.message });
    }
};

// POST (Criar)
exports.create = async (req, res) => {
    const { nome, custo } = req.body;

    if (!nome || custo === undefined) {
        return res.status(400).json({ message: 'Nome e custo são obrigatórios.' });
    }

    try {
        // Verifica se já existe uma receita com o mesmo nome
        const receitaExistente = await receitaModel.findOne({ where: { nome } });
        if (receitaExistente) {
            return res.status(400).json({ message: 'Já existe uma receita com este nome.' });
        }

        const novaReceita = await receitaModel.create({ nome, custo });
        res.status(201).json(novaReceita);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar a receita.', error: err.message });
    }
};


// PUT (Atualizar)
exports.atualizarReceita = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, custo } = req.body;

    if (!nome || custo === undefined) {
        return res.status(400).json({ message: 'Nome e custo são obrigatórios.' });
    }

    try {
        // Verifica se já existe alguma receita com o mesmo nome
        const receitaExistente = await receitaModel.findOne({ where: { nome } });

        if (receitaExistente && receitaExistente.id !== id) {
            return res.status(400).json({ message: 'Já existe uma receita com esse nome!' });
        }

        // Atualiza apenas se não houver conflito de nome
        const [updated] = await receitaModel.update({ nome, custo }, { where: { id } });

        if (updated) {
            const receitaAtualizada = await receitaModel.findByPk(id);
            res.json(receitaAtualizada);
        } else {
            res.status(404).json({ message: 'Receita não encontrada.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar a receita.', error: err.message });
    }
};


// DELETE
exports.deletarReceita = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const deleted = await receitaModel.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Receita não encontrada.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar a receita.', error: err.message });
    }
};
