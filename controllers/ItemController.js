const Item = require('../models/Item');
const Category = require('../models/Category');
const Image  = require('../models/Image');
const fs     = require('fs-extra');
const path   = require('path');
const { createSecretKey } = require('crypto');
const Feature = require('../models/Feature');
const Activity =  require('../models/Activity');
const { findOneAndRemove, findByIdAndRemove } = require('../models/Item');

module.exports = {
    viewItem: async (req, res)=>{
        try {
            //populate for get data relation of image
            const item = await Item.find()
            .populate({path: 'imageId', select: 'id imageUrl'})
            .populate({path: 'categoryId', select: 'name'});

            const alertStatus = req.flash('alertStatus');
            const alertMessage = req.flash('alertMessage');
            const alert        = {message:alertMessage, status: alertStatus};
            const category = await Category.find();
            res.render('admin/item/view_item',{title: "Staycation | Item", category, alert,item, action: "view",user: req.session.user});
        } catch (error) {
            req.flash('alertMessage', `${error}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/item');
        }
    },
    addData: async(req, res)=>{
        try {
            const {title, price, city, categoryId, description} = req.body;
            // console.log(req.files)
            if(req.files.length > 0){
                const category = await Category.findOne({_id: categoryId});
                const newItem = {
                    categoryId: category._id,
                    title,
                    price,
                    city,
                    description
                };
                const item = await Item.create(newItem);
                //for push to relation array data
                category.itemId.push({_id: item._id});
                await category.save();
                for(let i=0; i<req.files.length; i++){
                    const newImage = await Image.create({imageUrl: `images/${req.files[i].filename}`})
                     //for push to relation array data
                    item.imageId.push({_id: newImage._id});
                    await item.save();
                }
                req.flash('alertMessage', `Success Add Data`);
                req.flash('alertStatus', 'success');
                res.redirect('/admin/item');
            }
        } catch (error) {
            req.flash('alertMessage', `${error}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/item');
        }

    },
    showImage: async (req, res)=>{
        try {
            
        const alertMessage = req.flash("alertMessage");
        const alertStatus  = req.flash("alertStatus");
        const alert        = {status: alertStatus, message: alertMessage}

        const id   = req.params.id;
        const item = await Item.findOne({_id: id}).populate({path: "imageId", select: "id imageUrl"});
        res.render('admin/item/view_item', {
            item,
            title: "Staycation | Item",
            alert,
            action: "showImage",
            user: req.session.user
        });
        } catch (error) {
            res.send(error.message)
        }
    },
    showEditPage: async(req, res)=>{
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus  = req.flash("alertStatus");
            const alert        = {message: alertMessage, status: alertStatus}
            const id = req.params.id;
            const item = await Item.findOne({_id: id}).populate({path: "imageId", select: "id imageUrl"});
            console.log(item)
            const category =  await Category.find();
            res.render('admin/item/view_item',{
                title: "Staycation | Edit Page Item",
                item,
                category,
                action: "editPage",
                alert,
                user: req.session.user
            });
        } catch (error) {
            res.send(error.message)
        }
    },
    editAction: async(req, res)=>{
       try {
        const {id, title, price, city, description, categoryId} = req.body;
        const item = await Item.findOne({_id: id})
        .populate({path: "imageId", select: "id imageUrl"})
        .populate({path: "categoryId", select: "id name"})

        if(req.files.length > 0){
            for(let i =0; i < item.imageId.length; i++){
                const imageUpdate = await Image.findOne({_id: item.imageId[i]._id});
                fs.unlink(path.join('public/', imageUpdate.imageUrl));
                imageUpdate.imageUrl = `images/${req.files[i].filename}`;
                imageUpdate.save();
            }
            item.title          = title;
            item.price          = price;
            item.city           = city;
            item.description    = description;
            item.categoryId     = categoryId;
            item.save();
        }else{
            item.title          = title;
            item.price          =     price;
            item.city           = city;
            item.description    = description;
            item.categoryId     = categoryId;
            item.save();
        }

        req.flash('alertMessage', `Success Add Data`);
        req.flash('alertStatus', 'success');
        res.redirect('/admin/item');

       } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/item');
       }
    },
    deleteData: async(req, res)=>{
        try {
            const id = req.body.id;
            const item = await Item.findOne({_id: id});
            const category = await Category.findOne({_id: item.categoryId}).populate('itemId');

            for(let i=0; i < category.itemId.length; i++){
                if(toString(category.itemId[i]._id) == toString(item._id)){
                    category.itemId.pull({_id: item._id});
                    category.save();
                }
            }

            //remove feature
            const feature = await Feature.find({itemId: id});
            for(let f = 0; f < feature.length; f++){
                await Feature.findByIdAndRemove({_id: feature[f]._id});
                fs.unlink(path.join('public/'+feature[f].imageUrl));
            }

            //remove activity
            const activity = await Activity.find({itemId: id});
            for(let a = 0; a < activity.length; a++){
                await Activity.findByIdAndRemove({_id: activity[a]._id});
                fs.unlink(path.join('public/'+activity[a].imageUrl));
            }

            // item.remove();
            for(let i=0; i < item.imageId.length; i++){
                 Image.findOne({_id: item.imageId[i]._id})
                .then((img)=>{
                    fs.unlink(path.join(`public/${img.imageUrl}`));
                    img.remove();
                }).catch((err)=>{
                    req.flash('alertMessage', `${error.message}`);
                    req.flash('alertStatus', 'danger');
                    res.redirect('/admin/item');
                })
            }

            item.remove();
            res.json({delete: true});
        } catch (error) { 
            // req.flash('alertMessage', `${error.message}`);
            // req.flash('alertStatus', 'danger');
            // res.redirect('/admin/item');
            res.json({delete: false});
        }
    },
    detaiIitem: async(req, res)=>{
        const {id, type} = req.params;
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus  = req.flash('alertStatus');
            const alert        = {message: alertMessage, status: alertStatus}

            const feature = await Feature.find({itemId: id});
            const activity = await Activity.find({itemId: id});


            res.render('admin/item/detailItem/viewDetailItem', {
                title: "Staycation | Detail Item",
                alert,
                itemId: id,
                activity,
                feature,
                type,
                user: req.session.user
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${id}/${type}`);
        }
    }
}