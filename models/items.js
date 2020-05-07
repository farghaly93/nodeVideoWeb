const mongoose = require('mongoose');

const itemsSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    text: true
  },
  char1: {
    type: String,
    required: true,
    text: true
  },
  char2: {
    type: String,
    required: true,
    text: true
  },
  char3: {
    type: String,
    required: true,
    text: true
  },
  char4: {
    type: String,
    required: true,
    text: true
  },
  char5: {
    type: String,
    required: true,
    text: true
  },
  description: {
    type: String,
    required: true,
    text: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: true
  },
  video: {
    type: Object
  },
   star1: {
    type: Number,
    default: 0
  },
  star2: {
    type: Number,
    default: 0
  },
  star3: {
    type: Number,
    default: 0
  },
  star4: {
    type: Number,
    default: 0
  },
  star5: {
    type: Number,
    default: 0
  },
  visits: {
    type: Number,
    default: 0
  },
  actors: [{
    name: String,
    image: String,
    desc: String
  }]
});


// itemsSchema.index({
//   name: 'text',
//   char1: 'text',
//   char2: 'text',
//   char3: 'text',
//   char4: 'text',
//   char5: 'text',
//   descreption: 'text'
// })

// itemsSchema.virtual('rating')
//   .get(function() {
//     return this.star1 / this.total;
//   });
itemsSchema.statics.getChars = function(cat, char){
    return this.aggregate([
       {$match: {category: cat}},
       {$unwind: '$'+char},
       {$group:{_id:'$'+char , count: {$sum: 1}}},
       {$sort:{count:-1}}
     ]);
 }
 itemsSchema.statics.getTags = function(char){
    return this.aggregate([
       {$unwind: '$'+char},
       {$group:{_id:'$'+char , count: {$sum: 1}}},
       {$sort:{count:-1}}
     ]);
 }

module.exports = mongoose.model('items', itemsSchema);
