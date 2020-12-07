const Item = require('../models/Item');
const Category = require('../models/Category');
const Image  = require('../models/Image');

module.exports = {
    viewItem: async (req, res)=>{
        try {
            //populate for get data relation of image
            const item = await Item.find()
            .populate({path: 'imageId', select: 'id imageUrl'})
            .populate({path: 'categoryId', select: 'name'});

            console.log(item);

            const alertStatus = req.flash('alertStatus');
            const alertMessage = req.flash('alertMessage');
            const alert        = {message:alertMessage, status: alertStatus};
            const category = await Category.find();
            res.render('admin/item/view_item',{title: "Staycation | Item", category, alert});
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
    }
}