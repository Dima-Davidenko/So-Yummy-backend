const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { mongooseHandleError } = require('../helpers');

const recipeSchema = new Schema(
  {
    originalId: String,
    title: {
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
    description: {
      type: String,
      default: '',
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
    popularity: {
      type: Number,
      default: 0,
    },
    favorites: {
      type: [Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    youtube: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    ingridients: {
      _id: false,
      type: [
        {
          id: {
            type: Schema.Types.ObjectId,
            ref: 'ingridient',
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
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post('save', mongooseHandleError);
recipeSchema.pre('save', function (next) {
  this.popularity = this.favorites.length + this.likes.length;
  next();
});

const addSchema = Joi.object({});

const schemas = {
  addSchema,
};

const Recipe = model('recipe', recipeSchema);

module.exports = { Recipe, schemas };
