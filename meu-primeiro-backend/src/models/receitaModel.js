// const {DataTypes} = require('sequelize'); 
// const sequelize = require('.././database') // Importa a instância do Sequelize

// const receitaModel = {
//     //Método para buscar todos os produtos
//     findAll: () => {
//         return new Promise((resolve, reject) => {
//             db.all("SELECT * FROM receitas", [], (err, rows) => {
//                 if (err) {
//                     reject(err);
//                 };
//                 resolve(rows);
//             });
//         });
//     },

//     //Método para buscar um produto por id
//     findByID: (id) => {
//         return new Promise ((resolve, reject) => {
//             db.get("SELECT * FROM receitas WHERE id = ?", [id], (err, row) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 resolve(row);
//             });
//         });
//     },

//     //Método para criar um novo produto
//     create: (nome, ingredientes, modo_preparo, tempo_preparo, porcoes, dificuldade, categoria) => {
//         return new Promise ((resolve, reject) => {
//             db.run("INSERT INTO receitas (nome, ingredientes, modo_preparo, tempo_preparo, porcoes, dificuldade,    categoria) VALUES (?,?,?,?,?,?,?)", [nome, ingredientes, modo_preparo, tempo_preparo, porcoes, dificuldade, categoria],function (err) {
//                 if (err) {
//                     reject(err);
//                 };
//                 resolve({id: this.lastID, nome, ingredientes, modo_preparo, tempo_preparo, porcoes, dificuldade, categoria});
//             });
//         });
//     },

//     //Método para atualizar um produto
//     update: (id, nome, ingredientes, modo_preparo, tempo_preparo, porcoes, dificuldade, categoria) => {
//         return new Promise ((resolve, reject) => {
//             db.run("UPDATE receitas SET nome = COALESCE(?, nome), ingredientes = COALESCE(?, ingredientes), modo_preparo = COALESCE(?, modo_preparo), tempo_preparo = COALESCE(?, tempo_preparo), porcoes = COALESCE(?, porcoes), dificuldade = COALESCE(?, dificuldade), categoria = COALESCE(?, categoria) WHERE id = ?  ", [nome, ingredientes, modo_preparo, tempo_preparo, porcoes, dificuldade, categoria, id], function (err) {
//                 if (err) {
//                     reject(err);
//                 };
//                 resolve({changes: this.changes });
//             });
//         });
//     },

//     //Método para deletar uma receita
//     delete: (id) => {
//         return new Promise((resolve, reject) => {
//             db.run("DELETE FROM receitas WHERE id = ?",  [id], function (err) {
//                 if (err) {
//                     reject(err);
//                 };
//                 resolve({changes: this.changes});
//             });
//         });
//     }
// };

// module.exports = receitaModel;

//---------------------------------//-----------------------------------------------//-------------------------------------//----------------------------

const {DataTypes} = require('sequelize'); 
const sequelize = require('.././database') // Importa a instância do Sequelize

//Define o Modelo 'Receita'
const Receitas = sequelize.define('Receitas', {
    //Definição dos campos
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull:false //Garante que este campo não pode ser nulo
    },
    custo: {
        type: DataTypes.DECIMAL,
        allowNull: false //Garante que este campo não pode ser nulo
    }

}, {
    //Opções do modelo
    //1. Mapeia para o nome da tabela 'receitas' (que já existe da Aula 12)
    tableName: 'receitas',

    //2. Desabilita os campos 'createdAt' e 'updatedAt' que o sequelize adiciona por padrão, pois não os temos em nossa tabela.
    timestamps: false
});

module.exports = Receitas