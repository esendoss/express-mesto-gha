const mongoose = require('mongoose');

const { linkReqExp } = require('../middlewares/validation');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: linkReqExp,
      message: 'Неправильный формат URL',
    },
  },
  owner: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardSchema);
