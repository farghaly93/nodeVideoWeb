const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('categories', categoriesSchema);