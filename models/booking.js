const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tanggalCheckin: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  tanggalCheckout: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  jumlahTamu: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jenisTransportasi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jenisPenginapan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  metodePembayaran: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Booking;
