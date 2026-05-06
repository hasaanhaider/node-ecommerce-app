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

exports.getAddressesValidation = (data) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  });
  return schema.validate(data);
};

exports.deleteAddressValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  return schema.validate(data);
};


exports.getAddressByIdValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  return schema.validate(data);
}


exports.updateAddressValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    postalCode: Joi.string(),
    isDefault: Joi.boolean(),
  });
  return schema.validate(data);
};