const mongoose = require('mongoose')

const Booking = new mongoose.model('bookings', mongoose.Schema({
    bookedby:{type:mongoose.Schema.Types.ObjectId,ref:'User', required:true},
    bookedto:{type:mongoose.Schema.Types.ObjectId, ref:'MySpot', required:true},
    transactionid:{type:String, default:null},
    date:{type:Date,default:null},
    hours:{type:Number,required:true},
    slottime:{type:String, default:null},
    paidamount:{type:String, default:null},
    totalamount:{type:String, default:null}    
},{
    timestamps:true
}))

module.exports = Booking