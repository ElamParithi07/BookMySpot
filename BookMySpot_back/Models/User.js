const mongoose = require('mongoose')
const MySpot = require('../Models/MySpot')

const User = new mongoose.model('User',mongoose.Schema({
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    saved:[
        {type:mongoose.Schema.Types.ObjectId, ref:'MySpot'}
    ],
    history:[
        {type:mongoose.Schema.Types.ObjectId, ref:'Booking'}
    ],
    myspot:{type:mongoose.Schema.Types.ObjectId, ref:'MySpot'}
}))

module.exports = User