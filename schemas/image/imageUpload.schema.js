const { z } = require('zod');
const CustomError = require('../../util/customeError');

const imageUploadSchema = z.object({
  image: z
    .any()
    .refine((file) => file !== undefined, { message: 'Image file is required' })
    .refine((file) => file && file.mimetype.startsWith('image/'), { message: 'Only images allowed' })
    .refine((file) => file && file.size <= 2 * 1024 * 1024, { message: 'Image must be less than 2MB' }),
});

function validateImageUpload(req, res, next) {
  try {
    imageUploadSchema.parse({ image: req.file });
    next();
  } catch (error) {
    const message = error.errors?.map((e) => e.message).join(', ') || 'Invalid file';

    throw new CustomError(message, 409);
  }
}

module.exports = { imageUploadSchema, validateImageUpload };
