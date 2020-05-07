const mongoose = require('mongoose');

const mainPageSchema = mongoose.Schema({
  text1: {
    type: String,
    required: true,
  },
  text2: {
    type: String,
    required: true,
  },
  text3: {
    type: String,
    required: true,
  },
  text4: {
    type: String,
    required: true,
  },
  text5: {
    type: String,
    required: true,
  },
  text6: {
    type: String,
    required: true,
  },
  text7: {
    type: String,
    required: true,
  },
  text8: {
    type: String,
    required: true,
  },
  text9: {
    type: String,
    required: true,
  },
  text10: {
    type: String,
    required: true,
  },
  text11: {
    type: String,
    required: true,
  },
  text12: {
    type: String,
    required: true,
  },
  text13: {
    type: String,
    required: true,
  },
  text14: {
    type: String,
    required: true,
  },
  text15: {
    type: String,
    required: true,
  },
  text16: {
    type: String,
    required: true,
  },
  text17: {
    type: String,
    required: true,
  },
  text18: {
    type: String,
    required: true,
  },
  text19: {
    type: String,
    required: true,
  },
  text20: {
    type: String,
    required: true,
  },
  text21: {
    type: String,
    required: true,
  },
  text22: {
    type: String,
    required: true,
  },
  text23: {
    type: String,
    required: true,
  },
  text24: {
    type: String,
    required: true,
  },
  text25: {
    type: String,
    required: true,
  },
  text26: {
    type: String,
    required: true,
  },
  text27: {
    type: String,
    required: true,
  },
  text28: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  image: {
    type: String
  },
  visitors: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('mainPage', mainPageSchema);
