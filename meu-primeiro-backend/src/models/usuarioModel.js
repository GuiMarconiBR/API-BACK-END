// const { DataTypes } = require('sequelize');
// const sequelize = require('../database'); // Importa a instância do Sequelize
// const usuarioModel = {
//     // Buscar todos os usuários
//     findAll: () => {
//         return new Promise((resolve, reject) => {
//             db.all("SELECT * FROM usuarios", [], (err, rows) => {
//                 if (err) reject(err);
//                 else resolve(rows);
//             });
//         });
//     },

//     // Buscar usuário por ID
//     findById: (id) => {
//         return new Promise((resolve, reject) => {
//             db.get("SELECT * FROM usuarios WHERE id = ?", [id], (err, row) => {
//                 if (err) reject(err);
//                 else resolve(row);
//             });
//         });
//     },

//     // Buscar usuário por e-mail
//     findByEmail: (email) => {
//         return new Promise((resolve, reject) => {
//             db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, row) => {
//                 if (err) reject(err);
//                 else resolve(row);
//             });
//         });
//     },

//     // Buscar usuário por usuário
//     findByUsuario: (usuario) => {
//         return new Promise((resolve, reject) => {
//             db.get("SELECT * FROM usuarios WHERE usuario = ?", [usuario], (err, row) => {
//                 if (err) reject(err);
//                 else resolve(row);
//             });
//         });
//     },

//     // Criar um novo usuário
//     create: (nome, usuario, email, senha, classe, status_user) => {
//         return new Promise((resolve, reject) => {
//             db.run(
//                 "INSERT INTO usuarios (nome, usuario, email, senha, classe, status_user) VALUES (?, ?, ?, ?, ?, ?)",
//                 [nome, usuario, email, senha, classe, status_user],
//                 function (err) {
//                     if (err) reject(err);
//                     else resolve({ id: this.lastID, nome, usuario, email, senha, classe, status_user });
//                 }
//             );
//         });
//     },

//     // Atualizar usuário
//     update: (id, nome, usuario, email, senha, classe, status_user) => {
//         return new Promise((resolve, reject) => {
//             db.run(
//                 `UPDATE usuarios 
//                  SET nome = COALESCE(?, nome),
//                      usuario = COALESCE(?, usuario),
//                      email = COALESCE(?, email),
//                      senha = COALESCE(?, senha),
//                      classe = COALESCE(?, classe),
//                      status_user = COALESCE(?, status_user)
//                  WHERE id = ?`,
//                 [nome, usuario, email, senha, classe, status_user, id],
//                 function (err) {
//                     if (err) reject(err);
//                     else resolve({ changes: this.changes });
//                 }
//             );
//         });
//     },

//     // Deletar usuário
//     delete: (id) => {
//         return new Promise((resolve, reject) => {
//             db.run("DELETE FROM usuarios WHERE id = ?", [id], function (err) {
//                 if (err) reject(err);
//                 else resolve({ changes: this.changes });
//             });
//         });
//     }
// };

// module.exports = usuarioModel;

//------------------------------//------------------------------------------//---------------------------------------------------------------


const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importa a instância do Sequelize

// Define o Modelo 'Usuarios'
const Usuarios = sequelize.define('Usuarios', {
    // Definição dos campos
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false // Garante que este campo não pode ser nulo
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false // Garante que este campo não pode ser nulo
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false // Garante que este campo não pode ser nulo
    }

}, {
    // Opções do Modelo

    // 1. Mapeia para o nome da tabela 'usuarios' (que já existe da Aula 12)
    tableName: 'usuarios',

    // 2. Desabilita os campos 'createdAt' e 'updatedAt' que o Sequelize
    // adiciona por padrão, pois não os temos em nossa tabela.
    timestamps: false
});

module.exports = Usuarios;