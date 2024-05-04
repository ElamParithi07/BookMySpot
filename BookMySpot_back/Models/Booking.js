const mongoose = require('mongoose')

const Booking = new mongoose.model('bookings', mongoose.Schema({
    bookedby:{type:mongoose.Schema.Types.ObjectId, required:true},
    bookedto:{type:mongoose.Schema.Types.ObjectId, required:true},
    transactionid:{type:String,required:true},
    date:{type:String, required:true},
    hours:{type:Number,required:true},
    slottime:{type:String, required:true},
    paidamount:{type:String, required:true},
    totalamount:{type:String, required:true}    
}))

module.exports = Booking