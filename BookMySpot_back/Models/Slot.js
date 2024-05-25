const mongoose = require('mongoose')

const Slot = mongoose.model('slots',new mongoose.Schema({
    myspot:{type:mongoose.Schema.Types.ObjectId, ref:'MySpot'},
    startTime:{type:String, required:true},
    endTime:{type:String},
    bookedBy:{type:mongoose.Schema.Types.ObjectId, ref:'User', default:null}
}))

module.exports = Slot