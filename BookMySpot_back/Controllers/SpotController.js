const MySpot = require('../Models/MySpot');
const Slot = require('../Models/Slot');
const User = require('../Models/User');
const Review = require('../Models/Review')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const spotkey = process.env.SPOT_TOKEN_SECRET_KEY

async function addmyspot(req, res) {
    try {
        // Retrieved from middleware
        const userid = req.locals.userid;

        // Check if already exists
        const isExistingSpot = await MySpot.findOne({ ownedBy: userid });
        if (isExistingSpot) {
            return res.status(409).json({ message: "Spot already exists" });
        }

        // Creating new Spot
        const { name, about, location, feeperhour, phonenumber, gmaplink } = req.body;

        const newSpot = new MySpot({
            ownedBy: userid,
            name,
            about,
            location,
            feeperhour,
            phonenumber,
            gmaplink
        });
        await newSpot.save()

        // Creating JWT for spot
        const spottoken = jwt.sign({ spotid: newSpot._id, spotowner: userid }, spotkey);

        // Updating the user document
        const updatedUser = await User.findByIdAndUpdate(
            userid,
            { myspot: newSpot._id },
            { new: true }
        );

        return res.status(200).json({
            data: newSpot,
            message: "Your Spot has been created successfully!",
            msatoken: spottoken
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

async function updatespot(req, res) {
    try {
        const spotid = req.locals.spotid

        //updating the spot
        const updatedSpot = await MySpot.findByIdAndUpdate(spotid, req.body, { new: true })
        return res.status(200).json({ message: "Your Spot has been updated!", data: updatedSpot })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
}

async function deletespot(req, res) {
    try {
        const spotid = req.locals.spotid
        const userid = req.locals.userid

        //deleting the spot
        const deletedspot = await MySpot.findByIdAndDelete(spotid)

        //updating the user document
        const updatedUser = await User.findByIdAndUpdate(userid, { myspot: null }, { new: true })

        return res.status(200).json({ message: "Your Spot has been deleted!" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
}

async function getAllSpot(req, res) {
    try {
        const data = await MySpot.find();
        if (!data) {
            return res.status(404).json({ message: "No data found" })
        }
        return res.status(200).json({ data: data })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
}

async function getSpotbyId(req, res) {
    try {
        const { spotid } = req.query;
        const data = await MySpot.findById(spotid).populate('reviews')
        if (!data) {
            return res.status(404).json({ message: "No data found" });
        }
        return res.status(200).json({ data: data })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

module.exports = { addmyspot, updatespot, deletespot, getAllSpot, getSpotbyId }