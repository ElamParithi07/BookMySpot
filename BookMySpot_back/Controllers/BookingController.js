const Booking = require('../Models/Booking')

async function bookspot(req,res){
    try{
        const userid = req.locals.userid
        const {bookedto, transactionid, date, hours, slotime, paidamount, totalamount} = req.body

        const newbooking = new Booking({bookedby:userid ,bookedto, transactionid, date, hours, slotime, paidamount, totalamount})
        await newbooking.save()

    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:error})
    }
}

module.exports = { bookspot}