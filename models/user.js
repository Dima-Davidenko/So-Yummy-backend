const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { mongooseHandleError } = require('../helpers');

const { MAX_SHOPPINGLIST_LENGTH, MAX_SHOPPINGLIST_MEASURE_LENGTH } = require('../data/constants');

const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatarURL: {
      type: String,
      default: '',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: '',
    },
    accessToken: {
      type: String,
      default: '',
    },
    refreshToken: {
      type: String,
      default: '',
    },
    userDeviceInfo: {
      type: String,
      default: '',
    },
    passwordResetStage: {
      type: String,
      default: '',
    },
    passwordResetTime: {
      type: Date,
      default: Date.now(),
    },
    timeSinceLastDBSecureRequest: {
      type: Date,
      default: Date.now(),
    },
    shoppingList: {
      _id: false,
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: 'ingredient',
          },
          measure: {
            type: [String],
            default: [],
            validate: {
              validator: v => {
                return v.length <= MAX_SHOPPINGLIST_MEASURE_LENGTH;
              },
              message: props =>
                `${props.path} exceeds the maximum allowed length of measure field (${MAX_SHOPPINGLIST_MEASURE_LENGTH}) `,
            },
          },
        },
      ],
      default: [],
      validate: {
        validator: v => {
          return v.length <= MAX_SHOPPINGLIST_LENGTH;
        },
        message: props =>
          `${props.path} exceeds the maximum allowed length of ${MAX_SHOPPINGLIST_LENGTH}`,
      },
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', mongooseHandleError);

const registerSchema = Joi.object({
  name: Joi.string().min(1).max(16).required(),
  email: Joi.string().pattern(emailRegex).required().messages({
    'string.base': `"email" should be a type of 'string'`,
    'string.pattern.base': `wrong format of "email"`,
    'any.required': `"email" is a required field`,
  }),
  password: Joi.string().min(6).max(100).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const resetSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  resetEmailToken: Joi.string(),
});

const setNewPasswordSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6),
  resetPasswordToken: Joi.string(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

const userNameSchema = Joi.object({
  name: Joi.string().min(1).max(16).required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const product = Joi.object({
  productId: Joi.string().length(24).required(),
  measure: Joi.string().max(30).required(),
});

const listItemId = Joi.object({
  listItemId: Joi.string().length(24).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
  userNameSchema,
  refreshSchema,
  product,
  listItemId,
  resetSchema,
  setNewPasswordSchema,
};

const User = model('user', userSchema);

module.exports = {
  schemas,
  User,
};
