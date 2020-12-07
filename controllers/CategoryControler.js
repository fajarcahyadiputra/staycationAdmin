const Category = require('../models/Category');

module.exports = {
    viewCategory: async (req, res)=>{
        const alertStatus = req.flash('alertStatus');
        const alertMessage = req.flash('alertMessage');
        const alert        = {message:alertMessage, status: alertStatus}
        const dataCategory = await Category.find();
        res.render('admin/category/view_category',{dataCategory, alert, title:"Staycation | Category"});
    },
    addCategory: async (req, res)=>{
       try {
            const {name} = req.body;
            await Category.create({name})
            req.flash('alertMessage', 'Success Add Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage', `$.error.message`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category'); 
       }
    },
    updateData: async (req, res)=>{
       try {
            const {name, id} = req.body;
            const category = await Category.findOne({_id: id});
            category.name = name;
            await category.save();
            req.flash('alertMessage', 'Success EDit Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category')
        } catch (error) {
            req.flash('alertMessage', `$.error.message`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category')
       }
    },
    deletData: async (req, res)=>{
        try {
            const id = req.query.id;
            const category = await Category.findOne({_id: id});
            await category.remove();
            req.flash('alertMessage', 'Success Delete Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category')
        } catch (error) {
            req.flash('alertMessage', `$.error.message`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category')
        }
    }
}