const mongoose = require('mongoose')

const User = new mongoose.model('users',mongoose.Schema({
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true}
}))

module.exports = User