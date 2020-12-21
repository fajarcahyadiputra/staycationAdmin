const Item = require('../../models/Item');
const Bank = require('../../models/Bank');

module.exports = {
    detailPage: async (req, res)=>{
        const {id} = req.params;
        try {
            const item = await Item.findOne({_id: id})
            .populate({path: "imageId", select: "_id imgaeUrl"})
            .populate({path: "activityId", select: "_id name type imageUrl"})
            .populate({path: "featureId", select: "_id name type imageUrl"});

            const bank = await Bank.find();

            const testimonial = {
                _id: "asd1293uasdads1",
                imageUrl: "/images/testimonial1.jpg",
                name: "Happy Family",
                rate: 4.55,
                content: "What a great trip with my family and I should try again next time soon ...",
                familyName: "Angga",
                familyOccupation: "Product Designer"
              }

            res.status(200).json({...item._doc, bank, testimonial});

        } catch (error) {
            console.log(error.message)
            res.status(500).json({message: "Somthing Error"});
        }
    }
}