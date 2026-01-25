const path = require('path');
const express = require('express');
const connection = require('./database/connection');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config({
  path: process.env.ENV_PATH || '.env',
});

const ENV = process.env.NODE_ENV || 'development';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

const routes = require('./routes/index');

// initialize the express app
const app = express();
app.use(express.json({ limit: '10kb' }));

// serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// setup routing paths
app.use('/api', routes);

// global custom error handler
app.use(errorHandler);

// start the server
app.listen(PORT, HOST, () => {
  console.log(`${ENV} | ${PORT}`);
});
