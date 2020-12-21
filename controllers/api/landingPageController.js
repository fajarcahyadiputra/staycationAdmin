const Item = require('../../models/Item');
const Treasure = require('../../models/Activity');
const Traveler = require('../../models/Booking');
const Category = require('../../models/Category');

module.exports = {
    dataLandingPage: async(req, res)=>{
        try {
            const mostPicked = await Item.find()
            .select('_id city country isPopuler unit price title')
            .limit(5)
            .populate({path: 'imageId', select: '_id imageUrl'});

            const categories = await Category.find()
            .select("_id name")
            .limit(3)
            .populate({
                path: 'itemId', 
                select: '_id city country isPopuler unit price title sumBooking',
                perDocumentLimit: 4,
                option: {sort: {sumBooking: -1}},
                populate: {
                    path: 'imageId', 
                    select: 'imageUrl',
                    perDocumentLimit: 1
                }
            });

            for(let i=0; i < categories.length; i++){
                for(let x=0; x < categories[i].isDirectModified.length; x++){
                    const item = await Item.findOne({_id: categories[i].itemId[x]._id});
                    item.isPopuler = false;
                    await item.save();

                    if(categories[i].itemId[3] === categories[i].itemId[x]){
                        item.isPopuler = true;
                        await item.save();
                    }
                }
            }

            const testimonial = {
                _id: "asd1293uasdads1",
                imageUrl: "/images/testimonial1.jpg",
                name: "Happy Family",
                rate: 4.55,
                content: "What a great trip with my family and I should try again next time soon ...",
                familyName: "Angga",
                familyOccupation: "Product Designer"
              }

            const treasure =  (await Treasure.find()).length
            const traveler =  (await Traveler.find()).length
            const cities   =  (await Item.find()).length

            res.status(200).json({
                hero:{
                    treasure,
                    traveler,
                    cities
                },
                mostPicked,
                categories,
                testimonial
            });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}