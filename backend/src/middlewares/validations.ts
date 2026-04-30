import { Joi, celebrate, Segments } from 'celebrate';

const productValidationSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(30)
    .required(),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }).required(),
  category: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number()
    .allow(null)
    .default(null),
});

const orderValidationSchema = Joi.object({
  payment: Joi.string()
    .valid('card', 'online')
    .required(),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number().required(),
  items: Joi.array()
    .items(Joi.string())
    .min(1)
    .required(),
});

export const validateProductBody = celebrate({
  [Segments.BODY]: productValidationSchema,
});

export const validateOrderBody = celebrate({
  [Segments.BODY]: orderValidationSchema,
});
