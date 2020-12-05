const mongoose = require('mongoose');

const bankShema = new mongoose.Schema({
    nameBank: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Bank', bankShema);