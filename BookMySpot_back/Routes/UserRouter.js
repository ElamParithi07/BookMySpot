const express = require('express')
const UserRouter = express.Router()

const {register,sendotp, verifyotp} = require('../Controllers/UserController')

UserRouter.post('/register',register);
UserRouter.post('/sendotp',sendotp);
UserRouter.post('/verifyotp',verifyotp);

module.exports = UserRouter
