const Joi = require("joi");

exports.registerValidateion = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    password_confirmation: Joi.string()
      .min(6)
      .required()
      .valid(Joi.ref("password")),
  });
  return schema.validate(data);
};

exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

exports.forgotPasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

exports.verifyCodeValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().length(6).required(),
  });
  return schema.validate(data);
};

exports.resetPasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().length(6).required(),
    newPassword: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

exports.updateProfileValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
  });
  return schema.validate(data);
};

exports.deleteAccountValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
