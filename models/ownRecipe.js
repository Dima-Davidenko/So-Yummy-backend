const { Schema, model, isValidObjectId } = require('mongoose');

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
      _id: false,
      type: [
        {
          id: {
            type: Schema.Types.ObjectId,
            ref: 'ingredient',
            required: true,
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
  title: Joi.string().min(2).max(200).required(),
  category: Joi.string()
    .valid(...categoriesArray)
    .required(),
  description: Joi.string().min(2).max(600).required(),
  instructions: Joi.string().min(2).max(2000).required(),
  time: Joi.string().required(),
  ingredients: Joi.array().items(
    Joi.object({
      id: Joi.string().custom((value, helpers) => {
        if (isValidObjectId(value)) {
          return value;
        } else {
          return helpers.message('Invalid ID');
        }
      }),
      measure: Joi.string().min(2).max(200).required(),
    })
  ),
});

const schemas = {
  addSchema,
};

const OwnRecipe = model('ownRecipe', ownRecipeSchema);

module.exports = { OwnRecipe, schemas };
