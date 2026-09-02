const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateCreateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    weather: Joi.string().optional(),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().optional().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// Validate headers (e.g. Authorization)
const validateAuthHeader = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string()
        .required()
        .pattern(/^Bearer\s+\S+$/)
        .messages({
          "string.empty": 'The "authorization" header must be provided',
          "string.pattern.base":
            'The "authorization" header must be a Bearer token',
        }),
    })
    .unknown(true),
});

// Validate query params (example: filters / pagination)
const validateQueryFilters = celebrate({
  query: Joi.object().keys({
    weather: Joi.string().optional(),
    page: Joi.number().integer().min(1).optional().messages({
      "number.base": 'The "page" query parameter must be a number',
      "number.min": 'The "page" query parameter must be at least 1',
    }),
    limit: Joi.number().integer().min(1).optional().messages({
      "number.base": 'The "limit" query parameter must be a number',
      "number.min": 'The "limit" query parameter must be at least 1',
    }),
  }),
});

// Validate both item and user id params in the route
const validateItemAndUserParams = (
  itemParam = "itemId",
  userParam = "userId"
) =>
  celebrate({
    params: Joi.object().keys({
      [itemParam]: Joi.string().hex().length(24).required().messages({
        "string.hex": "Invalid item id format",
        "string.length": "Invalid item id length",
        "any.required": "Missing item id parameter",
      }),
      [userParam]: Joi.string().hex().length(24).required().messages({
        "string.hex": "Invalid user id format",
        "string.length": "Invalid user id length",
        "any.required": "Missing user id parameter",
      }),
    }),
  });

// Generic validator for route params that contain an ObjectId-like 24-hex string
const validateIdParam = (paramName = "id") =>
  celebrate({
    params: Joi.object().keys({
      [paramName]: Joi.string().hex().length(24).required().messages({
        "string.hex": "Invalid id format",
        "string.length": "Invalid id length",
        "any.required": "Missing id parameter",
      }),
    }),
  });

module.exports = {
  validateURL,
  validateCreateClothingItem,
  validateCreateUser,
  validateLogin,
  validateIdParam,
  validateAuthHeader,
  validateQueryFilters,
  validateItemAndUserParams,
};
