const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const destinasiRoutes = require('./routes/destinasi');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/destinasi', destinasiRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
