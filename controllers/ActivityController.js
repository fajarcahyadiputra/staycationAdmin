const Activity = require('../models/Activity');
const Item = require('../models/Item');
const fs   = require('fs-extra');
const path = require('path');

module.exports = {
    addActivity: async(req, res)=>{
        const {name, type, itemId, nameType} = req.body;
        try {
            const item = await Item.findOne({_id: itemId});
            if(!req.file){
                req.flash('alertMessage', `Image Not Found`);
                req.flash('alertStatus', 'success');
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
            }
            
            const activity = await Activity.create({
                name, 
                type, 
                imageUrl: `images/${req.file.filename}`,
                itemId
            })
            .then((activity)=>{
                item.activityId.push({_id: activity._id});
                item.save();
            })
            .catch((error)=>{
                req.flash('alertMessage', `${error.message}`);
                req.flash('alertStatus', 'danger');
                res.redirect(`/admin/item/show-detail-item/${itemId}/${nameType}`);
            })
            req.flash('alertMessage', `Success Add Data Activity`);
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/item/show-detail-item/${itemId}/${nameType}`);
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${itemId}/${nameType}`);
        }
    },
    deleteActivity: async(req, res)=>{
        const {id, type, itemid} = req.query;

        try {
            const activity = await Activity.findOne({_id: id});
            const item     = await Item.findOne({_id: itemid}).populate({path: "activityId"})
            for(let i=0; i < item.activityId.length; i++){
                if(toString(item.activityId._id) == toString(activity._id)){
                    item.activityId.pull({_id: activity._id});
                    await item.save();
                }
            }
            fs.unlink(path.join(`public/${activity.imageUrl}`));
            activity.remove();
            req.flash('alertMessage', `Success Delete Data Activity`);
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/item/show-detail-item/${itemid}/${type}`);
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${itemid}/${type}`);
        }
    },
    editActivity: async (req, res)=>{
        const {name, type, nameType, activityId, itemId} = req.body;

        try {
            const activity = await Activity.findOne({_id: activityId});
            const item     = await Item.findOne({_id: itemId});

            if(!req.file){
                activity.name       = name;
                activity.type       = type;
                activity.save();
            }else{
                fs.unlink(path.join('public/'+activity.imageUrl));
                activity.name       = name;
                activity.type       = type;
                activity.imageUrl   = `images/${req.file.filename}`
                activity.save();
            }
            req.flash('alertMessage', `Success Edit Data Activity`);
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/item/show-detail-item/${itemId}/${nameType}`);
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/item/show-detail-item/${itemId}/${nameType}`);
        }
    }
}