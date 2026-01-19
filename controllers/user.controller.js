const userService = require('../services/user.service');

const userController = {
  register: async (req, res, next) => {
    try {
      const requestData = req.body;

      const response = await userService.userRegistration(requestData);
      const { success, status, data } = response;

      res.status(status).json({
        success: success,
        response: {
          status: status,
          data: data,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const requestData = req.body;

      const response = await userService.userLogin(requestData);
      const { success, status, data, accessToken } = response;

      // set access token
      res.set({
        'Access-Token': accessToken,
      });

      res.status(status).json({
        success: success,
        response: {
          status: status,
          data: data,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const reqUser = req.user;

      const response = await userService.getUserDetails(reqUser);
      const { success, status, data } = response;

      res.status(status).json({
        success: success,
        response: {
          status: status,
          data: data,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
