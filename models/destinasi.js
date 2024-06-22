const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Destinasi = sequelize.define('Destinasi', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  gambar: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nama_destinasi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lokasi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  mapSrc: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'destinasi',
  timestamps: false
});

module.exports = Destinasi;
