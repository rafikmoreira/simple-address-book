// ---------------------- TABELAS ----------------------

import Sequelize from 'sequelize';
import sequelize from '../sequelize.js';

const Usuario = sequelize.define('Usuario', {
  email: { type: Sequelize.DataTypes.STRING, unique: true },
  senha: Sequelize.DataTypes.STRING,
});

const Contato = sequelize.define('Contato', {
  nome: Sequelize.DataTypes.STRING,
  telefone: Sequelize.DataTypes.NUMBER.UNSIGNED,
  cpf: { type: Sequelize.DataTypes.NUMBER.UNSIGNED, unique: true },
  email: { type: Sequelize.DataTypes.STRING, unique: true },
});

// ---------------------- RELACIONAMENTOS ----------------------

/*
 * Usuário possui muitos contatos
 * documentação https://sequelize.org/docs/v6/core-concepts/assocs/
 */
Usuario.hasMany(Contato);

/*
 * Um contato pertence a um usuário
 */
Contato.belongsTo(Usuario);

// ---------------------- SINCRONIZAÇÃO ----------------------

Usuario.sync();
Contato.sync();

// ---------------------- EXPORTAR MODELOS ----------------------

export { Usuario, Contato };
