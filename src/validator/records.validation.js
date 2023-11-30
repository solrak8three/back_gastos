// validationSchemas.js

const Joi = require('joi');

// Esquema de validación para los campos opcionales
const recordSchema = Joi.object({
  startDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
  tags: Joi.array().items(Joi.string()).default([]),
  removeFixed: Joi.boolean().default(false),
  onlyFixed: Joi.boolean().default(false),
}).custom((value, helpers) => {
  // Validación personalizada: removeFixed y onlyFixed no pueden ser true al mismo tiempo
  if (value.removeFixed && value.onlyFixed) {
    return helpers.message('"removeFixed" and "onlyFixed" cannot both be true.');
  }
  return value;
}, 'custom validation');


module.exports = {
  recordSchema,
};
