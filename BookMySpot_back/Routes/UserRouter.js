const express = require('express')
const UserRouter = express.Router()

const {register,sendotp, verifyotp, checkvalidemail} = require('../Controllers/UserController')

UserRouter.post('/register',register);
UserRouter.post('/sendotp',sendotp);
UserRouter.post('/verifyotp',verifyotp);
UserRouter.post('/verifyemail',checkvalidemail);

module.exports = UserRouter
