const models = require('../models');

const CustomError = require('../util/customeError');

const ENTITY = 'predictions';
const Prediction = models.Prediction;

const predictionRepo = {
  create: async (prediction) => {
    try {
      return await Prediction.create(prediction);
    } catch (error) {
      throw new CustomError(`Failed to insert new ${ENTITY}: ${error.message}`, 500);
    }
  },

  getById: async (id) => {
    try {
      return await Prediction.findOne({
        where: { id },
        include: [
          {
            model: Prediction.sequelize.models.TeaImage,
            as: 'image',
          },
        ],
      });
    } catch (error) {
      throw new CustomError(`Failed to fetch ${ENTITY} by id: ${error.message}`, 500);
    }
  },

  getByImageId: async (imageId) => {
    try {
      return await Prediction.findOne({
        where: {
          imageId: imageId,
        },
      });
    } catch (error) {
      throw new CustomError(`Failed to fetch ${ENTITY} by image id: ${error.message}`, 500);
    }
  },
};

module.exports = predictionRepo;
