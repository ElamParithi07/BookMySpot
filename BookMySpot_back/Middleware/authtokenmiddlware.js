const User = require('../Models/User')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const key = process.env.SECRET_KEY

async function checkauthtoken(req,res, next){
    //req.headers.authorization to access token in the headers
    let token = req.headers.authorization;

    if(!token){
        return res.status(404).json({message:"Auth Token Not Found"});
    }
    token = token.replace("Bearer ", "");

    try{
        //verify jwt token for user
        console.log(token)
        const decoded = jwt.verify(token, key)
        console.log(decoded)
        const isValid = await User.findOne({email:decoded.email})

        if(!isValid){
            return res.status(400).json({message:"Invalid Auth Token"})
        }
        console.log(isValid)
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