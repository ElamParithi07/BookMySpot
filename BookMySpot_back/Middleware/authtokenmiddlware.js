const User = require('../Models/User')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const key = process.env.SECRET_KEY

async function checkauthtoken(req,res, next){
    let token = req.headers.authorization;

    if(!token){
        return res.status(404).json({message:"Auth Token Not Found"});
    }
    token = token.replace("Bearer ", "");

    try{
        const decoded = jwt.verify(token, key)
        const isValid = await User.findOne({email:decoded.email})

        if(!isValid){
            return res.status(400).json({message:"Invalid Auth Token"});
        }
        req.locals= {
            userid:isValid.id,
            email:decoded.email
        }
        next();
    }
    catch(error){
        if(error.name === "TokenExpiredError"){
            console.log("token expired")
            return res.status(401).json({message:"Token Expired"})
        }
        return res.status(500).json({Error:"Invalid Auth Token"})
    }
}

module.exports = checkauthtoken