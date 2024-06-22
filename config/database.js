const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pariwisata', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
