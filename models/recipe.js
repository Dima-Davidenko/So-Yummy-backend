const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { mongooseHandleError } = require('../helpers');

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for recipe'],
    },
    category: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
    },
    youtube: {
      type: String,
    },
    tags: {
      type: [String],
    },
    ingridients: {
      type: [
        {
          name: String,
          measure: String,
        },
      ],
    },
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post('save', mongooseHandleError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const schemas = {
  addSchema,
};

const Recipe = model('recipe', recipeSchema);

module.exports = { Recipe, schemas };
