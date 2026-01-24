const feedbackService = require('../services/feedback.service');

const feedbackController = {
  save: async (req, res, next) => {
    try {
      const requestData = req.body;
      requestData.reqUser = req.user;

      const response = await feedbackService.saveUserFeedback(requestData);
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

module.exports = feedbackController;
