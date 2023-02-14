const Joi = require('joi');

const signUpValidate = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  repeatPassword: Joi.ref('password')
});

const loginValidate = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .required()
});

module.exports = {
    signUpValidate,
    loginValidate
}

