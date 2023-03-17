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
    description: {
      type: String,
      default: '',
    },
    instructions: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
    },
    preview: {
      type: String,
    },
    time: {
      type: String,
      default: '',
    },
    ingredients: {
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
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
  ingredients: Joi.array().items(
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
