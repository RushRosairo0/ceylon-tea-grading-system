const express = require('express');
const authenticate = require('../middleware/auth/authenticate');
const imageController = require('../controllers/image.controller');
const imageUpload = require('../middleware/imageUpload');

const validator = require('../middleware/requestValidator');
const { validateImageUpload } = require('../schemas/image/imageUpload.schema');

// initialize router
const imageRouter = express.Router();

// secure below endpoints
imageRouter.use(authenticate);

imageRouter.post('/', imageUpload.upload, validateImageUpload, imageController.handle);

module.exports = imageRouter;
