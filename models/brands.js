const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  url: {
    type: String,
  },
  modelsList: [
    {
      type: Types.ObjectId,
      ref: 'Models',
    },
  ],
});

module.exports = model('Brands', schema);
