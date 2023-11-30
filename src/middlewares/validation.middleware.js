// middleware.js

const { recordSchema } = require('../validator/records.validation');

function validateRecord(req, res, next) {
  const { error, value } = recordSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.validatedFields = value;

  next();
}

module.exports = {
  validateRecord,
};
