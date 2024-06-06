import Joi from '@hapi/joi';

export const bookValidation = (req, res, next) => {
  const schema = Joi.object({
    bookName: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    discountPrice: Joi.number().required()
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
