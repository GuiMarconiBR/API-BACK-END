const express = require('express');
const app = express();
const PORTA = 3000;
const sequelize = require('./database'); //Importa a conexão
const Receitas = require('./models/receitaModel'); //Importa o modelo

//middleware para interpretar JSON
app.use(express.json());

// --- SINCRONIZAÇÃO DO BANCO ---
// (Coloque antes das rotas da API)
async function syncDatabase() {
    try {
        //.sync() verifica o estado dos modelos e os cria/altera no BD se necessário
        await sequelize.sync();
        console.log('Modelos sincronizados com o banco de dados.');
    } catch (error) {
        console.error('Erro ao sincronizar modelos:', error);
    }
};
syncDatabase();

//importando arquivo de rotas de receitas
const receitasRoutes = require('./routes/receitasRoutes');

//Importa arquivo de rotas de usuarios
const usuariosRoutes = require('./routes/usuariosRoutes');


//prefixo para aplicação das receitas
app.use('/api/receitas', receitasRoutes);

//Prefixo para aplicação dos usuarios
app.use('/api/usuarios', usuariosRoutes);

//Rota de teste
app.get('/', (req, res) => {
    res.send('API de receitas funcionando!');
});

// --- NOVA ROTA DE HEALTH CHECK ---
app.get('/api/health-check', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = app;