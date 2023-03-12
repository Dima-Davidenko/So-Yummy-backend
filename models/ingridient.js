const { Schema, model } = require('mongoose');

const { mongooseHandleError } = require('../helpers');

const ingrSchema = new Schema(
  {
    ttl: String,
    desc: String,
    t: String,
    thb: String,
  },
  { versionKey: false }
);

ingrSchema.post('save', mongooseHandleError);

const Ingridient = model('ingridient', ingrSchema);

module.exports = { Ingridient };
