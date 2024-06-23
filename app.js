const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const destinasiRoutes = require('./routes/destinasi');
const authRoutes = require('./routes/auth'); // Import auth routes

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/destinasi', destinasiRoutes);
app.use('/auth', authRoutes); // Use auth routes

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
