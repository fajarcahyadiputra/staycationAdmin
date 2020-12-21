const Booking = require('../models/Booking');
const Member  = require('../models/Member');
const Bank    = require('../models/Bank');

module.exports = {
    viewBooking: async (req, res)=>{   
      try {
        const booking = await Booking.find()
        .populate('memberId')
        .populate('bankId');

        res.render('admin/booking/view_booking',{
            title: "Staycation | Booking",
            user: req.session.user,
            booking
        })
      } catch (error) {
          res.send(error.message)
      }
    },
    viewDetailBooking: async(req, res)=>{
        const {id} = req.params;
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus  = req.flash('alertStatus');
            const alert        = {status: alertStatus, message: alertMessage};
            const booking = await Booking.findOne({_id: id})
            .populate('memberId')
            .populate('bankId');

            res.render("admin/booking/viewDetailBooking",{
                booking,
                user: req.session.user,
                title: "Staycation | Detail Booking",
                alert
            });
        } catch (error) {
            res.send(error.message);
        }
    },
    updateStatus: async(req, res)=>{
        const {id, status} = req.params;

        try {
            const booking =await Booking.findOne({_id: id});
            booking.payments.status = status;
            booking.save();
            req.flash('alertMessage','Status Has Been Update');
            req.flash('alertStatus','success');
            res.redirect('/admin/booking/detail-booking/'+id);
        } catch (error) {
            req.flash('alertMessage',`${error.messsage}`);
            req.flash('alertStatus','danger');
            res.redirect('/admin/booking/detail-booking/'+id);
        }
    }
}