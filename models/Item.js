const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const ItemShema = new mongoose.Schema({
    title: {
        type    : String,
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
    city: {
        type    : String,
        required: true
    },
    isPopular: {
        type    : Boolean,
    },
    description: {
        type: String
    },
    imageId: {
        type    : Object,
        ref     : 'Image'
    },
    featureId: {
        type    : Object,
        ref     : 'Feature'
    },
    activityId: {
        type    : Object,
        ref     : 'Activity'
    }
})