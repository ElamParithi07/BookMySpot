const mongoose = require('mongoose')
const User = require('../Models/User')
const Review = require('./Review')
const Slot = require('./Slot')

const MySpot =new mongoose.model('MySpot',mongoose.Schema({
    ownedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    about: { type: String, required: true },
    rating: { type: Number },
    reviews: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Review' }
    ],
    location: { type: String, required: true },
    gmaplink: { type: String },
    slots: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' }
    ],
    phonenumber: { type: String, required: true },
    feeperhour: { type: String, required: true },
    spotstatus: { type: Boolean, default: true }
}))

module.exports = MySpot;