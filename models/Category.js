const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type    : String,
        required: [true, 'Category Name Can Not Be Null]
    }
})

module.exports = mongoose.model('Category', categorySchema);