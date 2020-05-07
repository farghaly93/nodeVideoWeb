const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    items: [{
        itemId: {
            type: String,
            required: true,
        },
        name: String,
        quantity: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            default: 0
        }
    }],
    userId: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    checked: {
        type: Number,
        default: 0
    },
    confirmed: {
        type: Number,
        default: 0
    },
    shiped: {
        type: Number,
        default: 0
    },
    delievered: {
        type: Number,
        default: 0
    },
    done: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: new Date()
    }
});
wishlistSchema.statics.getCarts = function(){
    return this.aggregate([
        {$match: {done: 0}},
       {$unwind: '$userId'},
       {$group:{_id: {userId: '$userId', cartId: '$_id' }}},
       {$sort:{date:-1}}
     ]);
 }
module.exports = new mongoose.model('wishlist', wishlistSchema);