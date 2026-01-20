const imageService = require('../services/image.service');

const imageController = {
  handle: async (req, res, next) => {
    try {
      const requestData = req.file;
      requestData.reqUser = req.user;

      console.log(requestData);

      const response = await imageService.uploadImage(requestData);
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

module.exports = imageController;
