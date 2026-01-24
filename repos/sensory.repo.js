const models = require('../models');

const CustomError = require('../util/customeError');

const ENTITY = 'sensory_evaluations';
const SensoryEvaluation = models.SensoryEvaluation;

const sensoryRepo = {
  create: async (sensory) => {
    try {
      return await SensoryEvaluation.create(sensory);
    } catch (error) {
      throw new CustomError(`Failed to insert new ${ENTITY}: ${error.message}`, 500);
    }
  },
};

module.exports = sensoryRepo;
