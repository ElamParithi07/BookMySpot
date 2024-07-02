const mongoose = require('mongoose');
const Review = require('../Models/Review');
const MySpot = require('../Models/MySpot');

async function postreview(req,res){
    try{
        const userid = req.locals.userid;
        const { spotid, content, rating} = req.body;
        const spot = await MySpot.findOne({_id: spotid})
        console.log(spot)
        if(!spot){
            return res.status(404).json({message:"Spot doesn't exist"})
        }
        if(spot.ownedBy === userid){
            return res.status(403).json({message:"Spotowner cannot review their own spot"})
        }
        if(spot.reviews.includes(userid)){
            return res.status(409).json({message:"You can review a spot only once."})
        }
        const review = new Review({reviewer:userid, reviewedSpot: spotid, content: content, rating: rating});
        await review.save();

        const updatedSpot = await MySpot.findOneAndUpdate(
            {_id: spotid},
            { $addToSet: { reviews: review._id } },
            { new: true }
        )

        return res.status(200).json({message:"Review posted successfully",data : review})
    }
    catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

//editreview
//deletereview will be updated

module.exports = {postreview}