const Joi = require("joi");

exports.createAddressValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
    isDefault: Joi.boolean().required(),
  });
  return schema.validate(data);
};