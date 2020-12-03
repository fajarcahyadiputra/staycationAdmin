const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageUrl :{
        type    : String,
        required: [true, 'Image Url Can Not Be Null]
    }
})

module.exports = mongoose.model('Image', ImageSchema);