const express = require('express');
const userController = require('../controllers/user.controller');

const validator = require('../middleware/requestValidator');
const userRegisterSchema = require('../schemas/user/userRegister.schema');
const userLoginSchema = require('../schemas/user/userLogin.schema');

// initialize router
const userRouter = express.Router();

userRouter.post('/', validator(userRegisterSchema), userController.register);
userRouter.post('/login', validator(userLoginSchema), userController.login);

module.exports = userRouter;
