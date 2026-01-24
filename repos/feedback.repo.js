const models = require('../models');

const CustomError = require('../util/customeError');

const ENTITY = 'user_feedbacks';
const UserFeedback = models.UserFeedback;

const feedbackRepo = {
  create: async (feedback) => {
    try {
      return await UserFeedback.create(feedback);
    } catch (error) {
      throw new CustomError(`Failed to insert new ${ENTITY}: ${error.message}`, 500);
    }
  },

  getByPredictionId: async (predctionId) => {
    try {
      return await UserFeedback.findOne({
        where: {
          predictionId: predctionId,
        },
      });
    } catch (error) {
      throw new CustomError(`Failed to fetch ${ENTITY} by prediction id: ${error.message}`, 500);
    }
  },
};

module.exports = feedbackRepo;
