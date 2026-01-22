const express = require('express');
const authenticate = require('../middleware/auth/authenticate');
const predictController = require('../controllers/predict.controller');

const validator = require('../middleware/requestValidator');
const predictSchema = require('../schemas/predict/predict.schema');

// initialize router
const predictRouter = express.Router();

// secure below endpoints
predictRouter.use(authenticate);

predictRouter.post('/', validator(predictSchema), predictController.predict);

module.exports = predictRouter;
