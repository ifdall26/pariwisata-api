const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const destinasiRoutes = require('./routes/destinasi');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');

const app = express();
const port = process.env.PORT || 3000;

// Middleware CORS untuk mengizinkan beberapa origin
const allowedOrigins = [
  'https://pik-nik-jnh7-bm6ruwm2v-ifdall26s-projects.vercel.app',
  'https://pik-nik-jnh7-e6litw9q6-ifdall26s-projects.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Jika origin tidak ada atau origin diizinkan, lanjutkan
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(bodyParser.json());
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
