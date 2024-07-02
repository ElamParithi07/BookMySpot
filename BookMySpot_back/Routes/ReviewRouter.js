const express = require('express')
const ReviewRouter = express.Router()

const {postreview} = require('../Controllers/ReviewController')
const checkauthtoken = require('../Middleware/authtokenmiddlware')

ReviewRouter.post('/postreview',checkauthtoken,postreview)

module.exports = ReviewRouter