const mongoose = require('mongoose');

const bankShema = new mongoose.Schema({
    namaBank: {
        type: String,
        required: true
    },
    nomerRekening: {
        type: String,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Bank', bankShema);