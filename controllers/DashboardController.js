const Item    = require('../models/Item');
const Member  = require('../models/Member');
const Booking = require('../models/Booking');

module.exports = {
    viewDashboard: async (req, res)=>{
        try {
            const booking = await Booking.find();
            const item    = await Item.find();
            const member  = await Member.find();

            res.render('admin/dashboard/view_dashboard',{
                title: "Staycation | Dashboard",
                user: req.session.user,
                booking,
                item,
                member
            })
        } catch (error) {
            res.redirect('/admin/signin');
        }
    }
}