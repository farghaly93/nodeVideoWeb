const mongoose = require('mongoose');

const charsSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true
  },
  char1: {
    type: String,
    required: true
  },
  char2: {
    type: String,
  },
  char3: {
    type: String,
  },
  char4: {
    type: String,
  },
  char5: {
    type: String,
  },
  image: {
    type: String,
  },
});

// userSchema.indexes({
//   username: 'text'
// })

// userSchema.virtual('cart', {
//   ref: 'Cart',
//   localField: '_id',
//   foreignField: 'userid'
// });


module.exports = mongoose.model('chars', charsSchema);
