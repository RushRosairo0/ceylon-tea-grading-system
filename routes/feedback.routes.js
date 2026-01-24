const express = require('express');
const authenticate = require('../middleware/auth/authenticate');
const feedbackController = require('../controllers/feedback.controller');

const validator = require('../middleware/requestValidator');
const feedbackSaveSchema = require('../schemas/feedback/feedbackSave.schema');

// initialize router
const feedbackRouter = express.Router();

// secure below endpoints
feedbackRouter.use(authenticate);

feedbackRouter.post('/', validator(feedbackSaveSchema), feedbackController.save);

module.exports = feedbackRouter;
