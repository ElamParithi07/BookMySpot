const mongoose = require('mongoose')

const Review = mongoose.model('Review', new mongoose.Schema({
    reviewer:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    reviewedSpot:{type:mongoose.Schema.Types.ObjectId, ref:'MySpot'},
    content:{type:String, required:true},
    rating:{type:Number, required:true}
},{
    timestamps:true
}))

module.exports = Review