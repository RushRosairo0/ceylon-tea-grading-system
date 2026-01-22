const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const teaImageRepo = require('../repos/teamImage.repo');
const CustomError = require('../util/customeError');

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8001/predict';

const predictService = {
  predictTeaQuality: async (data) => {
    const { imageId, aroma, color, taste, afterTaste, acceptability, reqUser } = data;

    // fetch image
    const image = await teaImageRepo.getById(imageId);
    if (!image) {
      throw new CustomError('Invalid image id!', 404);
    }

    // check if image belong to request user
    if (image.userId !== reqUser.id) {
      throw new CustomError('Permission denied!', 403);
    }

    // check upload folder for image
    const imageName = path.join(__dirname, '..', image.url.replace(/^\/+/, ''));
    if (!fs.existsSync(imageName)) {
      throw new CustomError('Image file not found on server!', 404);
    }

    // read image
    const imageBuffer = fs.readFileSync(imageName);

    // form-data
    const form = new FormData();
    form.append('file', imageBuffer, image.url);
    form.append('aroma', aroma);
    form.append('color', color);
    form.append('taste', taste);
    form.append('afterTaste', afterTaste);
    form.append('acceptability', acceptability);

    // call pipeline
    try {
      const response = await axios.post(FASTAPI_URL, form, {
        headers: form.getHeaders(),
      });

      if (response.data.success) {
        // if success
        return {
          success: true,
          status: response.data.response.status,
          data: {
            grade: response.data.response.data.grade,
            gradeConfidence: response.data.response.data.grade_confidence,
            quality: response.data.response.data.quality,
            qualityConfidence: response.data.response.data.quality_confidence,
          },
        };
      } else {
        // if not success
        return {
          success: false,
          status: response.data.response?.status || 400,
          message: response.data.response?.data?.message || 'Prediction failed',
        };
      }
    } catch (error) {
      throw new CustomError(error.response?.data?.response?.data?.message, error.response?.status || 500);
    }
  },
};

module.exports = predictService;
