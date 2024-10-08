const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

function validateUrl(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
}

const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().alphanum().length(24),
  }),
});

const validateUserSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateUrl).messages({
      "string.empty": `The "avatar" field must be filled in`,
      "string.uri": `The avatar field must have a valid url`,
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "The email field must be filled in",
      "string.email": "The email field must have a valid email format",
    }),
    password: Joi.string().required().min(8).messages({
      "string.empty": "The password field must be filled in",
    }),
  }),
});

const validateUserSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": "The email field must be filled in",
      "string.email": "The email field must have a valid email format",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The password field must be filled in",
    }),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateUrl).messages({
      "string.empty": `The "avatar" field must be filled in`,
      "string.uri": `The avatar field must have a valid url`,
    }),
  }),
});

const validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateUrl).messages({
      "string.empty": `The "imageUrl" field must be filled in`,
      "string.uri": `The imageUrl must have a valid url`,
    }),
    weather: Joi.valid("hot", "warm", "cold").required().messages({
      "string.empty": `The "imageUrl" field must be filled in`,
    }),
  }),
});

module.exports = {
  validateItemId,
  validateCardCreation,
  validateUserSignIn,
  validateUserSignUp,
  validateUpdateUser,
};
