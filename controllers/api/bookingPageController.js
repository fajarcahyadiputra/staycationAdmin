const Item = require("../../models/Item");
const Member = require("../../models/Member");
const Booking = require('../../models/Booking');

module.exports = {
    bookingPage: async(req, res)=>{
        const {
            idItem ,
            duration, 
            bookingStartDate,
            bookingEndDate,
            firstName,
            lastName,
            email,
            phoneNumber,
            accountHolder,
            bankFrom,
        } = req.body;
        try {
            if(!req.file){
               res.status(500).json({message: "Image Is Not Undefined"}) 
            }
            await Item.findOne({_id: idItem})
            .then((item)=>{
                item.sumBooking += 1;
                item.save();

               Member.create({
                    firstName,
                    lastName,
                    phoneNumber,
                    email
                }).then((member)=>{
                    let date = new Date();
                    let dateUnique = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
                    let invoice = Math.floor(1000000 + Math.random()* 9000000) + dateUnique;
                    let total = item.price * duration;
                    let tax   = total * 0.10;
                    
                    Booking.create({
                        bookingStartDate,
                        bookingEndDate,
                        total: total+=tax,
                        invoice,
                        itemId: {
                            _id: item._id,
                            title: item.title,
                            price: item.price,
                            duration: duration
                        },
                        memberId: member._id,
                        payments: {
                            accountHolder,
                            proofPayment: `images/${req.file.filename}`,
                            bankFrom
                        }
                    }).then((booking)=>{
                        res.status(200).json({message: "success", booking})
                    }).catch((error)=>{
                        console.log('item')
                        res.status(500).json({message: error.message})
                    })
                    
                }).catch((error)=>{
                    console.log('member')
                    res.status(500).json({message: error.message})
                })

            })
            .catch((error)=>{
                console.log('booking')
                res.status(500).json({message: "Item Not Found"});
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message: "Somthing Error"});
        }
    }
}