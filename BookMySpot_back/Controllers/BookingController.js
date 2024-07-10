const Booking = require('../Models/Booking')
const MySpot = require('../Models/MySpot')

async function bookspot(req, res) {
    try {
        const userid = req.locals.userid;
        const { bookedto, transactionid, date, hours, slotime, paidamount, totalamount } = req.body;

        const spot = await MySpot.findOne({ _id: bookedto });
        if (!spot) {
            return res.status(404).json({ message: "Requested Spot doesn't exist!" });
        }

        if (spot.ownedBy.equals(userid)) {
            return res.status(403).json({ message: "Spot owner can't book their own spots" });
        }

        const newbooking = new Booking({
            bookedby: userid,
            bookedto,
            transactionid,
            date,
            hours,
            slotime,
            paidamount,
            totalamount
        });
        await newbooking.save();
        return res.status(200).json({ message: "Your Spot has been Booked Successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message || "An error occurred while booking the spot." });
    }
}

async function getbooking(req,res){
    const userid = req.locals.userid
    try{
        const booking = await Booking.find({bookedby:userid})
        if(!booking){
            return res.status(404).json({message:"No data found"})
        }
        return res.status(200).json({data:booking})
    }
    catch(error){
        console.log(error.response)
        return res.status(500).json({message:error.response})
    }
}

module.exports = { bookspot, getbooking}