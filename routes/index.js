const express = require('express');
const routes = express.Router();

const userRouter = require('./user.routes');
const imageRouter = require('./image.routes');
const predictRouter = require('./predict.routes');
const feedbackRouter = require('./feedback.routes');

routes.use('/user', userRouter);
routes.use('/image', imageRouter);
routes.use('/predict', predictRouter);
routes.use('/feedback', feedbackRouter);

module.exports = routes;
