const User = require('../Models/User')
const MySpot = require('../Models/MySpot')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const key = process.env.SPOT_TOKEN_SECRET_KEY

async function checkspotauthtoken(req,res, next){
    //req.headers.authorization to access token in the headers
    let token = req.headers.authorization;

    if(!token){
        return res.status(404).json({message:"Auth Token Not Found"});
    }
    token = token.replace("Bearer ", "");

    try{
        //verify jwt token for user 
        const decoded = jwt.verify(token, key)
        const isValidtoken = await MySpot.findOne({_id:decoded.spotid})

        if(!isValidtoken){
            return res.status(400).json({message:"Spot not found"})
        }

        req.locals= {
            spotid:isValidtoken._id,
            userid:decoded.spotowner
        }
        console.log("spotid- ",req.locals.spotid)
        next();
    }
    catch(error){
        console.log(error)
        return res.status(500).json({Error:error})
    }
}

module.exports = checkspotauthtoken