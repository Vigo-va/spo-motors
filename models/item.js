const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  article: {
    type: String,
  },
  year: {
    type: String,
  },
  img: {
    type: Array,
  },
  url: {
    type: String,
  },
  model: {
    type: Types.ObjectId,
    ref: 'Models',
  },
  brand: {
    type: Types.ObjectId,
    ref: 'Brands',
  },
});

module.exports = model('Item', schema);
