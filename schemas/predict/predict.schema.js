const { z } = require('zod');

const predictSchema = z.object({
  body: z.object({
    imageId: z.int().min(1, 'imageId is required'),
    aroma: z.number().int('aroma must be an integer').min(1, 'aroma must be between 1 and 7').max(7, 'aroma must be between 1 and 7'),
    color: z.number().int('color must be an integer').min(1, 'color must be between 1 and 7').max(7, 'color must be between 1 and 7'),
    taste: z.number().int('taste must be an integer').min(1, 'taste must be between 1 and 7').max(7, 'taste must be between 1 and 7'),
    afterTaste: z
      .number()
      .int('afterTaste must be an integer')
      .min(1, 'afterTaste must be between 1 and 7')
      .max(7, 'afterTaste must be between 1 and 7'),

    acceptability: z
      .number()
      .int('acceptability must be an integer')
      .min(1, 'acceptability must be between 1 and 7')
      .max(7, 'acceptability must be between 1 and 7'),
  }),
});

module.exports = predictSchema;
