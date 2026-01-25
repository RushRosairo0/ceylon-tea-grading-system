const CustomError = require('../util/customeError');
const predictionRepo = require('../repos/prediction.repo');
const feedbackRepo = require('../repos/feedback.repo');
const sensoryRepo = require('../repos/sensory.repo');

const feedbackService = {
  saveUserFeedback: async (data) => {
    const { predictionId, isAgreed, grade, comment, aroma, color, taste, afterTaste, acceptability, reqUser } = data;
    const userId = reqUser.id;

    // validate prediction
    const prediction = await predictionRepo.getById(predictionId);
    if (!prediction) {
      throw new CustomError('Invalid prediction id!', 404);
    }

    // check if predction belong to request user
    if (prediction.image.userId !== userId) {
      throw new CustomError('Permission denied!', 403);
    }

    // check if the prediction already has a feedback
    const feedback = await feedbackRepo.getByPredictionId(prediction.id);
    if (feedback) {
      throw new CustomError('This prediction already has a feedback!', 503);
    }

    // create new feedback
    const feedbackDetails = {
      predictionId: prediction.id,
      userId: userId,
      isAgreed: isAgreed,
      grade: grade,
      comment: comment,
    };
    const newFeedback = await feedbackRepo.create(feedbackDetails);

    // create new sensory evaluation
    const sensoryDetails = {
      feedbackId: newFeedback.id,
      aroma: aroma,
      taste: taste,
      afterTaste: afterTaste,
      color: color,
      overallAccept: acceptability,
    };
    const newSensory = await sensoryRepo.create(sensoryDetails);

    // feedback response
    const feedbackRes = {
      id: newFeedback.id,
      isAgreed: newFeedback.isAgreed,
      grade: newFeedback.grade,
      comment: newFeedback.comment,
      sensoryEvaluation: {
        id: newSensory.id,
        aroma: newSensory.aroma,
        taste: newSensory.taste,
        afterTaste: newSensory.afterTaste,
        color: newSensory.color,
        acceptability: newSensory.overallAccept,
      },
    };

    return {
      success: true,
      status: 201,
      data: {
        feedback: feedbackRes,
      },
    };
  },
};

module.exports = feedbackService;
