const MySpot = require('../Models/MySpot');
const Slot = require('../Models/Slot');
const User = require('../Models/User');
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
        const { name, about, location, slots, feeperhour, phonenumber, gmaplink } = req.body;

        const newSpot = new MySpot({
            ownedBy: userid,
            name,
            about,
            location,
            feeperhour,
            phonenumber,
            gmaplink
        });
        await newSpot.save();

        const slotidarray = [];
        const slotPromises = slots.map(async (startTime) => {
            // Parse start time to extract hours, minutes, and AM/PM
            const [hourMinute, ampm] = startTime.split(' ');
            const [startHour, startMinute] = hourMinute.split(':').map(Number);

            let endHour, endAMPM;

            // Special case handling for 11:00 AM
            if (startHour === 11 && ampm === 'AM') {
                endHour = 12;
                endAMPM = 'PM';
            }
            // Special case handling for 11:00 PM
            else if (startHour === 11 && ampm === 'PM') {
                endHour = 12;
                endAMPM = 'AM';
            }
            else {
                // Convert hours to 24-hour format if necessary
                const hour24 = ampm === 'PM' ? (startHour === 12 ? 12 : startHour + 12) % 24 : startHour;

                // Calculate end time (adding 1 hour to start time)
                endHour = (hour24 + 1) % 24; // Handling overflow to next day if needed
                endAMPM = endHour < 12 ? 'AM' : 'PM';
                endHour = endHour === 0 ? 12 : endHour; // Convert 0 to 12 for 12-hour format
            }

            // Formatting end time
            const endHourFormatted = endHour < 10 ? '0' + endHour : endHour;
            const endMinuteFormatted = startMinute < 10 ? '0' + startMinute : startMinute;
            const endTime = `${endHourFormatted}:${endMinuteFormatted} ${endAMPM}`;

            // Create new slot
            const newSlot = new Slot({
                myspot: newSpot._id,
                startTime,
                endTime
            });

            // Save new slot
            await newSlot.save();
            slotidarray.push(newSlot._id);
        });

        // Execute all slot promises concurrently
        await Promise.all(slotPromises);

        // Creating JWT for spot
        const spottoken = jwt.sign({ spotid: newSpot._id, spotowner: userid }, spotkey);

        // Updating the user document
        const updatedUser = await User.findByIdAndUpdate(
            userid,
            { myspot: spottoken },
            { new: true }
        );

        //updating the spot slots document
        const updatedspots = await MySpot.findByIdAndUpdate(
            newSpot._id,
            { slots: slotidarray },
            { new: true }
        )

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
        console.log("Inside api");
        console.log(spotid)
        const data = await MySpot.findById(spotid)
        console.log(data)
        if (!data) {
            return res.status(404).json({ message: "No data found" });
        }
        return res.status(200).json({ data: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

module.exports = { addmyspot, updatespot, deletespot, getAllSpot, getSpotbyId }