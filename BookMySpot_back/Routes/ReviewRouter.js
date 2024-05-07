const express = require('express')
const ReviewRouter = express.Router()

const {postreview} = require('../Controllers/ReviewController')

module.exports = ReviewRouter