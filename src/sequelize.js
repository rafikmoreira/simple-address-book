const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./banco_de_dados.sqlite",
});

module.exports = { sequelize };
