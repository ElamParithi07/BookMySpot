const Booking = require('../Models/Booking')

async function bookspot(req,res){
    try{
        const userid = req.locals.userid
        const {bookedto, transactionid, date, hours, slotime, paidamount, totalamount} = req.body

        const newbooking = new Booking({bookedby:userid ,bookedto, transactionid, date, hours, slotime, paidamount, totalamount})
        await newbooking.save()
        return res.status(200).json({message:"Your Spot has been Booked Successfully!"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:error})
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