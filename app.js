const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors module
const sequelize = require('./config/database');
const destinasiRoutes = require('./routes/destinasi');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Mengizinkan akses dari semua domain

app.use('/destinasi', destinasiRoutes);

// Endpoint untuk akar URL
app.get('/', (req, res) => {
  res.send('Selamat datang di aplikasi pariwisata');
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
