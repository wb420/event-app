const Joi = require('joi');
const validationMessage = require('../helpers/validationMessageFormatter');

module.exports.createEventValidator = (req, res, next) => {
  const schema = Joi.object().options({ abortEarly: false, stripUnknown: true }).keys({
    name: Joi.string().required(),
    location: Joi.string().required(),
    date: Joi.date().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const message = validationMessage(error?.details);
    return res.status(400).json({ error: message });
  }
  next();
};