const express = require('express')
const AddSpotRouter = express.Router()
const checkspotauthtoken = require('../Middleware/spottokenmiddleware')
const {addmyspot, updatespot, deletespot, getAllSpot, getSpotbyId, getSpotbyToken} = require('../Controllers/SpotController')
const checkauthtoken = require('../Middleware/authtokenmiddlware')

AddSpotRouter.post('/addspot',checkauthtoken,addmyspot);
AddSpotRouter.put('/updatespot',checkspotauthtoken,updatespot)
AddSpotRouter.delete('/deletespot',checkspotauthtoken,deletespot)
AddSpotRouter.get('/getspots',getAllSpot)
AddSpotRouter.get('/getspotbyid',getSpotbyId)
AddSpotRouter.get('/getspot',checkspotauthtoken, getSpotbyToken)

module.exports = AddSpotRouter