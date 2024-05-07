const express = require('express')
const BookingRouter = express.Router()
const checkauthtoken = require('../Middleware/authtokenmiddlware')

const {bookspot} = require('../Controllers/BookingController')

BookingRouter.post('/bookspot',checkauthtoken,bookspot)

module.exports = BookingRouter