const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });
const routes = require('./routes/routes.js');


const app = express();


app.use('/api', routes);
mongoose.connect(process.env.MONGODB_CONNECT_URL, {

});

app.listen(3000, () => {
    console.log('Servidor em execução na porta 3000');
  });