const mongoose = require('mongoose')

const User = new mongoose.model('users',mongoose.Schema({
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    saved:[
        {type:mongoose.Schema.Types.ObjectId, ref:'MySpot'}
    ],
    history:[
        {type:mongoose.Schema.Types.ObjectId, ref:'Booking'}
    ],
    myspot:{type:String, default:null}
}))

module.exports = User