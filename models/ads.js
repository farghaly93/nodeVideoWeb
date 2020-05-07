const mongoose = require('mongoose');

const adsSchema = mongoose.Schema({
  text1: {
    type: String,
    required: true,
  },
  text2: {
    type: String,
    required: true,
    text: true
  },
  description: {
    type: String,
    required: true,
    text: true
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model('ads', adsSchema);
