const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

// ---------------------- TABELAS ----------------------

const Usuario = sequelize.define("Usuario", {
  email: { type: DataTypes.STRING, unique: true },
  senha: DataTypes.STRING,
});

const Contato = sequelize.define("Contato", {
  nome: DataTypes.STRING,
  telefone: DataTypes.NUMBER.UNSIGNED,
  cpf: { type: DataTypes.NUMBER.UNSIGNED, unique: true },
  email: { type: DataTypes.STRING, unique: true },
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

module.exports = {
  Contato,
  Usuario,
};
