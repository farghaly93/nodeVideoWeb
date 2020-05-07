const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    userEmail: String,
    message: String,
    role: String,
    date: String
});

messagesSchema.statics.getMessages = function(){
    return this.aggregate([
       {$unwind: '$userEmail'},
       {$group:{_id:'$userEmail' , count: {$sum: 1}}},
       {$sort:{date:-1}}
     ]);
 }

module.exports = new mongoose.model('messages', messagesSchema);