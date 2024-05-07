const express = require('express')
const AddSpotRouter = express.Router()
const checkspotauthtoken = require('../Middleware/spottokenmiddleware')
const {addmyspot, updatespot, deletespot} = require('../Controllers/SpotController')

AddSpotRouter.post('/addspot',checkspotauthtoken,addmyspot)
AddSpotRouter.put('/updatespot',checkspotauthtoken,updatespot)
AddSpotRouter.delete('/deletespot',checkspotauthtoken,deletespot)

module.exports = AddSpotRouter