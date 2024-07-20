const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const destinasiRoutes = require('./routes/destinasi');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan('dev')); // Middleware logging
app.use('/destinasi', destinasiRoutes);
app.use('/auth', authRoutes);
app.use('/booking', bookingRoutes);

app.get('/', (req, res) => {
  res.send('Selamat datang di aplikasi pariwisata');
});

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
