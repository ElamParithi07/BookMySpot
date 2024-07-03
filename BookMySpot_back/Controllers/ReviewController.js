const mongoose = require('mongoose');
const Review = require('../Models/Review');
const MySpot = require('../Models/MySpot');

async function postreview(req, res) {
    try {
        const userId = req.locals.userid;
        const { spotid, content, rating } = req.body;

        // Find the spot by ID and populate the reviews to check if the user has already reviewed it
        const spot = await MySpot.findOne({ _id: spotid }).populate('reviews');

        if (!spot) {
            return res.status(404).json({ message: "Spot doesn't exist" });
        }

        if (spot.ownedBy.toString() === userId.toString()) {
            return res.status(403).json({ message: "Spot owner cannot review their own spot" });
        }

        if (spot.reviews.some(review => review.reviewer.toString() === userId.toString())) {
            return res.status(409).json({ message: "You can review a spot only once." });
        }

        const review = new Review({ reviewer: userId, reviewedSpot: spotid, content, rating });
        await review.save();

        spot.reviews.push(review._id);
        await spot.save();

        return res.status(200).json({ message: "Review posted successfully", data: review });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


//editreview
//deletereview will be updated

module.exports = { postreview }