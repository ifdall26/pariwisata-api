const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pariwisata', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
