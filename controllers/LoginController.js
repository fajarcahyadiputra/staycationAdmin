const User = require('../models/Users');
const bcrypt = require('bcryptjs');

module.exports = {
    loginPage: async (req, res)=>{
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert        = {status: alertStatus, message: alertMessage};
            if(req.session.user == null || req.session.user == undefined){
                res.render('index',{
                    alert,
                    title: 'Staycation | Login Page'
                });
            }else{
                res.redirect('/admin/dashboard');
            }
           
        } catch (error) {
            res.redirect('/admin/signin');
        }
    },
    loginAction: async(req, res)=>{
        const {username, password} = req.body;
        try {
            const user = await User.findOne({username: username});

            if(!user){
                req.flash('alertMessage', `Username Is wrong`);
                req.flash('alertStatus', 'danger');
                res.redirect('/admin/signin'); 
            }

            const isPasswordMath = await bcrypt.compare(password, user.password);

            if(!isPasswordMath){
                req.flash('alertMessage', `Password Is wrong`);
                req.flash('alertStatus', 'danger');
                res.redirect('/admin/signin'); 
            }

            req.session.user = {
                id: user.id,
                username: user.username
            };

            res.redirect('/admin/dashboard');
        } catch (error) {
                req.flash('alertMessage', `${error.message}`);
                req.flash('alertStatus', 'danger');
                res.redirect('/admin/signin'); 
        }
    },
    logoutAction: async(req, res)=>{
        req.session.destroy();
        res.redirect('/admin/signin');
    }
}