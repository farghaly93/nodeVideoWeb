const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
  itemId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  }
});
commentsSchema.pre('save', (next) => {
  this.date = new Date();
  next();
});
module.exports = mongoose.model('comments', commentsSchema);
