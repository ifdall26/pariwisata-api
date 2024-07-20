const sequelize = require('./config/database');
const Booking = require('./models/booking');
const Destinasi = require('./models/destinasi');
const User = require('./models/user');

// Menggunakan sequelize.sync({ alter: true }) untuk memperbarui tabel
sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables updated!');
}).catch(err => {
  console.error('Error updating database:', err);
});
