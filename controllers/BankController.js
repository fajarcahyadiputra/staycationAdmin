const Bank = require('../models/Bank');
const fs   = require('fs-extra');
const path = require('path');

module.exports = {
    viewBank: async (req, res)=>{
        const alertStatus = req.flash('alertStatus');
        const alertMessage = req.flash('alertMessage');
        const alert        = {message:alertMessage, status: alertStatus};
        const bank = await  Bank.find();
        res.render('admin/bank/view_bank',{bank, alert, title: "Staycation | Bank"});
    },
    insertBank: async (req, res)=>{
        console.log(req.file)
        try {
            const {nameBank, number, name} = req.body;
            await Bank.create({nameBank, number, name, image: `images/${req.file.filename}`});
            req.flash('alertMessage', 'Success Add Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/bank');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');
        }
    },
    deleteData: async (req, res)=>{
        try {
            const bank = await Bank.findOne({_id: req.body.id});
           fs.unlink(path.join(`public/${bank.image}`))
           await bank.remove();
           res.json({delete: true})
       } catch (error) {
        res.json({delete: false})
       }
    },
    editBank: async (req, res)=>{
        try {
            const {id, name, nameBank, number} = req.body;
            const bank = await Bank.findOne({_id: id});
            // console.log(req.body.image)
            if(req.file == undefined){
                bank.name = name;
                bank.nameBank = nameBank;
                bank.number = number;
                // console.log('ksoong')
            }else{
                // console.log('ada')
                await fs.unlink(path.join('public/'+bank.image))
                bank.name = name;
                bank.nameBank = nameBank;
                bank.number = number;
                bank.image = 'images/'+req.file.filename;
            }
            await bank.save();
            req.flash('alertMessage', 'Success Edit Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/bank')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank')
        }
    }

}