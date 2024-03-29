require('dotenv').config({ path: './config/.env' });
const mongoose = require('mongoose');

const routes = require('./routes/routes.js');

const express = require('express');
const cors = require('cors')

const app = express();

app.use(express.json());

app.use(cors())


app.use('/api', routes);
mongoose.connect(process.env.MONGODB_CONNECT_URL);

app.listen(3000, () => {
    console.log('Servidor em execução na porta 3000');
  });