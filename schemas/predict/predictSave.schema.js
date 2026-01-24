const { z } = require('zod');

const teaGradeEnum = require('../../enums/grades');

const predictSaveSchema = z.object({
  body: z.object({
    imageId: z.int().min(1, 'Image ID is required'),
    grade: z.enum([...teaGradeEnum.values], {
      required_error: 'Prediction grade is required',
      invalid_type_error: 'Prediction grade must be a valid grade',
    }),
    gradeConfidence: z.number({
      required_error: 'Grade confidence is required',
      invalid_type_error: 'Grade confidence must be a number',
    }),
    category: z
      .int('Prediction category must be a number')
      .min(1, 'Prediction category must be between 1 and 10')
      .max(10, 'Prediction category must be between 1 and 10'),
    categoryConfidence: z.number({
      required_error: 'Category confidence is required',
      invalid_type_error: 'Category confidence must be a number',
    }),
    model: z
      .string({
        required_error: 'Model version is required',
        invalid_type_error: 'Model version must be a string',
      })
      .min(1, 'Model version cannot be empty'),
  }),
});

module.exports = predictSaveSchema;
