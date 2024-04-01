require('dotenv').config({ path: './config/.env' });
const mongoose = require('mongoose');


const express = require('express');
const cors = require('cors');
const swaggerDocs = require('./shared/swagger/swagger.js');
const router = require('./routes/routes.js');

const port = process.env.PORT || 3000
const app = express();

app.use(express.json());

app.use(cors())


mongoose.connect(process.env.MONGODB_CONNECT_URL);

app.listen(
  port
  , () => {
    console.log(`Servidor em execução na porta ${port}`);
    router(app)
    swaggerDocs(app)
    

  });