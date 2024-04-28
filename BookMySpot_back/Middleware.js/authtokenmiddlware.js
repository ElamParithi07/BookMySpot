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
        const decoded = jwt.verify(token, key)
        const isValid = await User.findOne({email:decoded.email})

        if(!isValid){
            return res.status(400).json({message:"Invalid Auth Token"})
        }
        next();
    }
    catch(error){
        console.log(error)
        return res.status(400).json({Error:"Invalid Auth Token"})
    }
}

module.exports = checkauthtoken