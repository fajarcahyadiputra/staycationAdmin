const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const ItemShema = new mongoose.Schema({
    title: {
        type    : String,
        required: true
    },
    sumBooking: {
        type: Number,
        required: true
    },
    price: {
        type    : String,
        required: true
    },
    country: {
        type    : String,
        default : 'indonesia'
    },
    duration:  {
        type: Number,
        required : true
    },
    city: {
        type    : String,
        required: true
    },
    sumBooking: {
        type    : Number,
        required: 0
    },
    isPopular: {
        type    : Boolean,
        default : false
    },
    unit: {
        type    : String,
        default : 'night'
    },
    description: {
        type: String
    },
    categoryId: {
        type    : ObjectId, 
        ref     : 'Category'
    },
    imageId: [{
        type    : ObjectId,
        ref     : 'Image'
    }],
    featureId: [{
        type    : ObjectId,
        ref     : 'Feature'
    }],
    activityId: [{
        type    : ObjectId,
        ref     : 'Activity'
    }]
})

module.exports = mongoose.model("Item", ItemShema);