const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const teaImageRepo = require('../repos/teamImage.repo');
const predictionRepo = require('../repos/prediction.repo');
const CustomError = require('../util/customeError');

const categoryEnum = require('../enums/categories');

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
            image: image.url,
            imageId: image.id,
            model: response.data.response.model.version,
            grade: response.data.response.data.grade,
            gradeConfidence: response.data.response.data.grade_confidence,
            category: response.data.response.data.quality,
            categoryConfidence: response.data.response.data.quality_confidence,
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
      // service unavailable
      if (error.code === 'ECONNREFUSED') {
        throw new CustomError('Cannot connect to FastAPI server!', 503);
      }

      // fallback
      throw new CustomError(error.response?.data?.response?.data?.message || error.message, error.response?.status || 500);
    }
  },

  savePredictedResult: async (data) => {
    const { imageId, grade, gradeConfidence, category, categoryConfidence, model, reqUser } = data;

    // check image id
    const image = await teaImageRepo.getById(imageId);
    if (!image) {
      throw new CustomError('Invalid image id!', 404);
    }

    // check if image belong to request user
    if (image.userId !== reqUser.id) {
      throw new CustomError('Permission denied!', 403);
    }

    // check if prediction already exists
    const prediction = await predictionRepo.getByImageId(imageId);
    if (prediction) {
      throw new CustomError('This prediction has already been saved!', 409);
    }

    // map category
    const predictedCategory = await mapCategory(category);

    // create new prediction
    const predictionDetails = {
      imageId: imageId,
      predictedGrade: grade,
      gradeConfidence: gradeConfidence,
      predictedCategory: predictedCategory,
      categoryConfidence: categoryConfidence,
      modelVersion: model,
    };
    const newPrediction = await predictionRepo.create(predictionDetails);

    // prediction response
    const predictionRes = {
      id: newPrediction.id,
      imageId: newPrediction.imageId,
      predictedGrade: newPrediction.predictedGrade,
      gradeConfidence: newPrediction.gradeConfidence,
      predictedCategory: category,
      categoryConfidence: newPrediction.categoryConfidence,
      modelVersion: newPrediction.modelVersion,
    };

    return {
      success: true,
      status: 201,
      data: {
        prediction: predictionRes,
      },
    };
  },
};

async function mapCategory(category) {
  switch (category) {
    case 1:
      return categoryEnum.CAT1;
    case 2:
      return categoryEnum.CAT2;
    case 3:
      return categoryEnum.CAT3;
    case 4:
      return categoryEnum.CAT4;
    case 5:
      return categoryEnum.CAT5;
    case 6:
      return categoryEnum.CAT6;
    case 7:
      return categoryEnum.CAT7;
    case 8:
      return categoryEnum.CAT8;
    case 9:
      return categoryEnum.CAT9;
    case 10:
      return categoryEnum.CAT10;
    default:
      throw new CustomError(`Invalid category ${category}`, 404);
  }
}

module.exports = predictService;
