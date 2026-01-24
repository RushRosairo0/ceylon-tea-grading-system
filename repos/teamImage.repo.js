const models = require('../models');

const CustomError = require('../util/customeError');

const ENTITY = 'tea_images';
const TeaImage = models.TeaImage;

const teaImageRepo = {
  create: async (image) => {
    try {
      return await TeaImage.create(image);
    } catch (error) {
      throw new CustomError(`Failed to insert new ${ENTITY}: ${error.message}`, 500);
    }
  },

  getById: async (id) => {
    try {
      return await TeaImage.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new CustomError(`Failed to fetch ${ENTITY} by id: ${error.message}`, 500);
    }
  },
};

module.exports = teaImageRepo;
