const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
  },
  years: {
    type: Array,
  },
  brand: {
    type: Types.ObjectId,
    ref: 'Brands',
  },
});

module.exports = model('Models', schema);
