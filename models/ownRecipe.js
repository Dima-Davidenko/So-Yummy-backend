const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { mongooseHandleError } = require('../helpers');
const categoriesArray = require('../data/categoriesArray');

const ownRecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set name for recipe'],
    },
    category: {
      type: String,
      enum: categoriesArray,
      required: true,
    },
    about: {
      type: String,
      default: '',
    },
    instructions: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '',
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    ingridients: {
      type: [
        {
          title: {
            type: String,
            default: '',
          },
          measure: {
            type: String,
            default: '',
          },
        },
      ],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

ownRecipeSchema.post('save', mongooseHandleError);

const addSchema = Joi.object({
  title: Joi.string().min(3).required(),
  category: Joi.string()
    .valid(...categoriesArray)
    .required(),
  about: Joi.string(),
  instructions: Joi.string().min(20).required(),
  thumb: Joi.string(),
  time: Joi.string(),
  favorite: Joi.boolean(),
  ingridients: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      measure: Joi.string().required(),
    })
  ),
});

const schemas = {
  addSchema,
};

const OwnRecipe = model('ownRecipe', ownRecipeSchema);

module.exports = { OwnRecipe, schemas };
