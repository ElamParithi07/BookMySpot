const express = require('express')
const UserRouter = express.Router()
const checkauthtoken = require('../Middleware/authtokenmiddlware')

const {register,sendotp, verifyotp, checkvalidemail, getUser, checkandcreatetoken, saveSpot, removeSpot} = require('../Controllers/UserController')

UserRouter.post('/register',register);
UserRouter.post('/sendotp',sendotp);
UserRouter.post('/verifyotp',verifyotp);
UserRouter.post('/verifyemail',checkvalidemail);
UserRouter.get('/getuser',checkauthtoken,getUser);
UserRouter.post('/refreshuser',checkandcreatetoken);
UserRouter.post('/addtolist',checkauthtoken,saveSpot);
UserRouter.post('/removefromlist',checkauthtoken, removeSpot);

module.exports = UserRouter
