import Joi from '@hapi/joi';

export const bookValidation = (req, res, next) => {
  const schema = Joi.object({
    bookName: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
    price: Joi.number().min(0).required(),
    discountPrice: Joi.number().min(0).required()
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
