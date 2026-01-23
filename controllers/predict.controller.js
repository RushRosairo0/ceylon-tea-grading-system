const predictService = require('../services/predict.service');

const predictController = {
  predict: async (req, res, next) => {
    try {
      const requestData = req.body;
      requestData.reqUser = req.user;

      const response = await predictService.predictTeaQuality(requestData);
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

  save: async (req, res, next) => {
    try {
      const requestData = req.body;
      requestData.reqUser = req.user;

      const response = await predictService.savePredictedResult(requestData);
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

module.exports = predictController;
