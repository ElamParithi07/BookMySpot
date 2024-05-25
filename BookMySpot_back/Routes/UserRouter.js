const express = require('express')
const UserRouter = express.Router()
const checkauthtoken = require('../Middleware/authtokenmiddlware')

const {register,sendotp, verifyotp, checkvalidemail, getUser, checkandcreatetoken} = require('../Controllers/UserController')

UserRouter.post('/register',register);
UserRouter.post('/sendotp',sendotp);
UserRouter.post('/verifyotp',verifyotp);
UserRouter.post('/verifyemail',checkvalidemail);
UserRouter.get('/getuser',checkauthtoken,getUser);
UserRouter.post('/refreshuser',checkandcreatetoken);

module.exports = UserRouter
