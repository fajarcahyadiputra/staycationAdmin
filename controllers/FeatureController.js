const Feature = require('../models/Feature');
const Item    = require('../models/Item');
const fs      = require('fs-extra');
const path    = require('path');
const { json } = require('express');
const { findOne } = require('../models/Item');
const { type } = require('os');

module.exports = {
    addDataFeature: async (req, res)=>{
        // const data = Object.values(req.body); 
        // data.name = null;
        // delete data.name;

       try {
        const data = req.body;
        if(!req.file){
            req.flash('alertMessage', `Image Not Found`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${req.body.itemId}`);
            return false;
        }
        data.imageUrl = "images/"+req.file.filename;
        const featute = await Feature.create(data);
        const item = await Item.findOne({_id: req.body.itemId});
        item.featureId.push({_id: featute._id});
        item.save();
        req.flash('alertMessage', `Success Add Data`);
        req.flash('alertStatus', 'success');
        res.redirect(`/admin/item/show-detail-item/${req.body.itemId}/${req.body.type}`);
       } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${req.body.itemId}/${req.body.type}`);
       }
    },
    deleteFeature: async(req, res)=>{
        const itemId = req.query.itemid;
        const featureId = req.query.id;
        const type      = req.query.type;
        try {
            const feature = await Feature.findOne({_id: featureId});
            const item =  await Item.findOne({_id: itemId}).populate('featureId');
            for(let i =0; i < item.featureId.length; i++){
                if(toString(item.featureId._id) == toString(feature._id)){
                    item.featureId.pull({_id: feature._id});
                    await item.save();
                }
            }
            fs.unlink(path.join('public/'+feature.imageUrl));
            feature.remove();
            req.flash('alertMessage', `Success Delete Data`);
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/item/show-detail-item/${itemId}/${type}`);
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${itemId}/${type}`);
        }

    },
    editFeature : async(req, res)=>{
        const {name, id, qty, itemId, type} = req.body;
      try {
        const feature = await Feature.findOne({_id: id});
        if(!req.file){
            feature.name = name;
            feature.qty  = qty;
            feature.save();
        }else{
            fs.unlink(path.join('public/'+feature.imageUrl))
            feature.name = name;
            feature.qty  = qty;
            feature.imageUrl = `images/${req.file.filename}`;
            feature.save();
        }
        req.flash('alertMessage', `Success Edit Data`);
        req.flash('alertStatus', 'success');
        res.redirect(`/admin/item/show-detail-item/${itemId}/${type}`);
      } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect(`/admin/item/show-detail-item/${itemId}/${type}`);
      }
    }
}

