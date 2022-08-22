import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './banco_de_dados.sqlite',
});

export default sequelize;
