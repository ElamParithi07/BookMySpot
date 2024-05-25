const express = require('express')
const BookingRouter = express.Router()
const checkauthtoken = require('../Middleware/authtokenmiddlware')

const {bookspot, getbooking} = require('../Controllers/BookingController')

BookingRouter.post('/bookspot',checkauthtoken,bookspot)
BookingRouter.get('/getbooking',checkauthtoken, getbooking)

module.exports = BookingRouter