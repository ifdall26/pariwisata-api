const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Destinasi = require('./destinasi'); // Impor model Destinasi
const User = require('./user'); // Impor model User

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
  destinasiId: {
    type: DataTypes.INTEGER,
    references: {
      model: Destinasi,
      key: 'id',
    },
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  gambar: {
    type: DataTypes.STRING,
    references: {
      model: Destinasi,
      key: 'gambar',
    },
    allowNull: false,
  },
  nama_destinasi: { // Tambahkan kolom nama_destinasi
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

Booking.belongsTo(Destinasi, { foreignKey: 'destinasiId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

module.exports = Booking;
