const { Joi, celebrate } = require("celebrate");
const validator = require("validator");
const router = require("../routes");

function validateUrl(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
}

const validateItemId = celebrate({
  params: Joi.object()
    .keys({
      itemId: Joi.string().alphanum().length(24),
    })
    .unknown(true),
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

const validateGetUserRequest = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
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
  }),
});

// router.post(
//   "/items",
//   celebrate({
//     body: Joi.object().keys({
//       name: Joi.string().required().min(2).max(30).messages({
//         "string.min": 'The minimum length of the "name" field is 2',
//         "string.max": 'The maximum length of the "name" field is 30',
//         "string.empty": 'The "name" field must be filled in',
//       }),
//       imageUrl: Joi.string().required().custom(validateUrl).messages({
//         "string.empty": `The "imageUrl" field must be filled in`,
//         "string.uri": `The imageUrl must have a valid url`,
//       }),
//     }),
//   })
// );

// router.post(
//   "/signUp",
//   celebrate({
//     body: Joi.object().keys({
//       name: Joi.string().required().min(2).max(30).messages({
//         "string.min": 'The minimum length of the "name" field is 2',
//         "string.max": 'The maximum length of the "name" field is 30',
//         "string.empty": 'The "name" field must be filled in',
//       }),
//       avatar: Joi.string().required().custom(validateUrl).messages({
//         "string.empty": `The "avatar" field must be filled in`,
//         "string.uri": `The avatar field must have a valid url`,
//       }),
//       email: Joi.string().required().email().messages({
//         "string.empty": "The email field must be filled in",
//         "string.email": "The email field must have a valid email format",
//       }),
//       password: Joi.string().required().min(8).messages({
//         "string.empty": "The password field must be filled in",
//       }),
//     }),
//   })
// );

// router.post(
//   "/signIn",
//   celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().required().email().messages({
//         "string.empty": "The email field must be filled in",
//         "string.email": "The email field must have a valid email format",
//       }),
//       password: Joi.string().required().messages({
//         "string.empty": "The password field must be filled in",
//       }),
//     }),
//   })
// );

// router.get(
//   "/users/me",
//   celebrate({
//     params: Joi.object().keys({
//       _id: Joi.string().alphanum().length(24),
//     }),
//   })
// );

// router.patch(
//   "/users/me",
//   celebrate({
//     params: Joi.object().keys({
//       _id: Joi.string().alphanum().length(24),
//     }),
//   })
// );

// router.post(
//   "/cards/:itemId/likes",
//   celebrate({
//     params: Joi.object().keys({
//       itemId: Joi.string().alphanum().length(24),
//     }),
//   })
// );

// router.delete(
//   "/cards/:itemId/likes",
//   celebrate({
//     params: Joi.object().keys({
//       itemId: Joi.string().alphanum().length(24),
//     }),
//   })
// );

// router.delete(
//   "/cards/:itemId",
//   celebrate({
//     params: Joi.object().keys({
//       itemId: Joi.string().alphanum().length(24),
//     }),
//   })
// );

module.exports = {
  validateItemId, validateCardCreation, validateUserSignIn, validateUserSignUp, validateGetUserRequest
};
