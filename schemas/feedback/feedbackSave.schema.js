const { z } = require('zod');

const teaGradeEnum = require('../../enums/grades');

const feedbackSaveSchema = z.object({
  body: z.object({
    predictionId: z.int().min(1, 'Prediction ID is required'),
    isAgreed: z.boolean({
      required_error: 'Agreement status is required',
      invalid_type_error: 'Agreement status must be a boolean',
    }),
    grade: z.enum([...teaGradeEnum.values], {
      required_error: 'Prediction grade is required',
      invalid_type_error: 'Prediction grade must be a valid grade',
    }),
    comment: z
      .string({
        invalid_type_error: 'Comment must be a string',
      })
      .max(500, 'Comment must be at most 500 characters')
      .optional(),
    aroma: z.number().int('Aroma must be an integer').min(1, 'Aroma must be between 1 and 7').max(7, 'Aroma must be between 1 and 7'),
    color: z.number().int('Color must be an integer').min(1, 'Color must be between 1 and 7').max(7, 'Color must be between 1 and 7'),
    taste: z.number().int('Taste must be an integer').min(1, 'Taste must be between 1 and 7').max(7, 'Taste must be between 1 and 7'),
    afterTaste: z
      .number()
      .int('After taste must be an integer')
      .min(1, 'After taste must be between 1 and 7')
      .max(7, 'After taste must be between 1 and 7'),
    acceptability: z
      .number()
      .int('Acceptability must be an integer')
      .min(1, 'Acceptability must be between 1 and 7')
      .max(7, 'Acceptability must be between 1 and 7'),
  }),
});

module.exports = feedbackSaveSchema;
