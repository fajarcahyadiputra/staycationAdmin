const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
    invoice: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    bookingStartDate: {
        type    :Date,
        required: true
    },
    bookingEndDate: {
        type    :Date,
        required: true
    },
    bookingStartDate: {
        type    :Date,
        required: true
    },
    itemId: {
    _id: {
        type: ObjectId,
        ref : 'Item',
        required: true
       },
    price:{
            type: Number,
            required: true
        },
    duration: {
            type: Number,
            required: true
        },
    title: {
        type: String,
        required: true
    }
    },
    total: {
        type: Number,
        required: true
    },
    memberId:{
            type: ObjectId,
            ref : 'Member'
    },
    bankId:{
        type: ObjectId,
        ref : 'Bank'
    },
    payments: {
        proofPayment: {
            type    : String,
            required: true
        },
        bankFrom: {
            type    : String,
            required: true
        },
        accountHolder: {
            type    : String,
            required: true
        },
        status: {
            type    : String,
            default: "process"
        }

    }
    
})


module.exports = mongoose.model('Booking', bookingSchema);