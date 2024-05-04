const { number, ref } = require('joi')
const mongoose = require('mongoose')

const MySpot =new mongoose.model('myspots',mongoose.Schema({
    ownedBy:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    name:{type:String, required:true},
    about:{type:String, required:true},
    rating:{type:Number},
    reviews:[
        {type:mongoose.Schema.Types.ObjectId}
    ],
    location:{type:String, required:true},
    gmaplink:{type:String},
    slots:[
        {type:String, required:true}
    ],
    feeperhour:{type:String, required:true},
    spotstatus:{type:Boolean, default:true}
}))

module.exports = MySpot