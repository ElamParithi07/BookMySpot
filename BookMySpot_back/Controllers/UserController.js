let User = require('../Models/User')
const bcrypt = require('bcryptjs')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const OtpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
const { client } = require('../Redis')
const axios = require('axios')
const { default: mongoose } = require('mongoose')
let MySpot = require('../Models/MySpot')

require('dotenv').config()

const key = process.env.SECRET_KEY
const refreshkey = process.env.REFRESH_TOKEN_KEY;

const signupSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
})

async function register(req, res) {
    try {
        //JOI validation
        const { value, error } = signupSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.EMAIL_VALID_API}&email=${value.email}`)
        // Accessing response data
        const responseData = response.data;

        if (responseData.deliverability === "UNDELIVERABLE") {
            return res.json({ status: false, message: "No such email Exists!" });
        }
        //Check Existing User
        const ExistingUser = await User.findOne({ email: value.email });
        if (ExistingUser) return res.json({ status: false, message: "Email already exists!" })

        //hashing the password
        const hashpassword = await bcrypt.hash(value.password, 10)

        //Create new User
        const newUser = new User({ email: value.email, password: hashpassword });
        await newUser.save();
        return res.json({ status: true, message: "Account Created successfully", email: newUser.email })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error })
    }
}

async function sendotp(req, res) {
    try {
        const { email, password } = req.body;

        //Check Existing User
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            //Generate OTP
            const otp = await generateotp();

            //Storing otp in redis
            await client.set(`${email}`, `${otp}`, 'EX', 60)

            //sending mail to user
            const isMailsent = sendMail(email, otp)
            // if (isMailsent) {
            return res.status(200).json({ status: true, message: "OTP sent successfully!" })
            // }
            // else {
            //     return res.status(400).json({ message: "Error in sending OTP" })
            // }
        }
        else {
            if (password !== "") {
                //hashing the password
                const hashpassword = await bcrypt.hash(password, 10)

                //Create new User
                const newUser = new User({ email: email, password: hashpassword });
                await newUser.save();

                //Generate OTP
                const otp = await generateotp();

                //Storing otp in redis
                await client.set(`${email}`, `${otp}`, 'EX', 60)

                //sending mail to user
                const isMailsent = sendMail(email, otp)
                // if (isMailsent) {
                return res.status(200).json({ message: "OTP sent successfully!" })
                // }
                // else {
                //     return res.status(400).json({ message: "Error in sending OTP" })
                // }

            }
            return res.json({ status: false, message: "Account doesn't exist! Enter password to create a new account" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ Error: error })
    }
}

async function verifyotp(req, res) {
    const { email, otp } = req.body;
    try {
        // Get OTP from Redis
        const value = await client.get(`${email}`);
        if (!value) {
            return res.json({ status: false, message: "OTP expired!" });
        }

        // Check if OTP is valid
        if (value === otp) {
            const user = await User.findOne({ email: email });

            

            // Create auth token
            const authtoken = jwt.sign({ email: email }, key, { expiresIn: '1d' });
            const refreshToken = jwt.sign({ email: email }, key);

            // Store only the saved list in Redis
            console.log(user.saved)
            await client.set(`${email}`, JSON.stringify(user.saved));

            return res.status(200).json({ status: true, message: "Login successful!", authtoken: authtoken, msatoken: user.myspot, refreshToken: refreshToken });
        } else {
            return res.json({ status: false, message: "Invalid OTP" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

async function checkandcreatetoken(req,res){
    const { email, token} = req.body;
    try{
        const decoded = jwt.verify(token , key)
        if( email === decoded.email){
            const newtoken = jwt.sign({email: decoded.email}, key, {expiresIn:'1d'})
            return res.status(200).json({authtoken : newtoken})
        }
        else{
            return res.status(400).json({message:"Invalid User Token"})
        }
    }
    catch(error){
        console.log(error)
        if(error.name === 'JsonWebTokenError'){
            return res.status(400).json({message:"Invalid Refresh Token"})
        }
        return res.status(500).json({message:error.response})
    }
}

async function checkvalidemail(req, res) {
    const { email } = req.body;
    try {
        const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.EMAIL_VALID_API}&email=${email}`)

        // Accessing response data
        const responseData = response.data;
        if (responseData.is_valid_format.value === false) {
            return res.json({ status: false, message: "Invalid email format" });
        }
        if (responseData.deliverability === "UNDELIVERABLE") {
            return res.json({ status: false, message: "No such email Exists!" })
        }
        return res.json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

async function getUser(req, res) {
    try {
        const email = req.locals.email;
        const user = await client.get(`${email}`);
        
        if (user) {
            let parsedUser;
            try {
                parsedUser = JSON.parse(user);
            } catch (jsonError) {
                console.error("Error parsing JSON from Redis:", jsonError);
                return res.status(500).json({ message: "Invalid user data format" });
            }

            return res.status(200).json({ data: parsedUser });
        }

        return res.status(404).json({ message: "User Not Found" });
    } catch (error) {
        console.error("Error in getUser:", error);
        return res.status(500).json({ message: error.message });
    }
}

async function getProfile(req,res){
    try{
        const email = req.locals.email;
        const user = await User.findOne({email: email}).populate('myspot').populate('saved')
        if(user){
            const userData = {
                email : user.email,
                saved: user.saved,
                history: user.history,
                myspot : user.myspot
            }
            return res.status(200).json(userData)
        }
        else{
            return res.status(404).json({message:"User not found"});
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal Server error"})
    }
}

async function saveSpot(req, res) {
    try {
        const { userid, email } = req.locals;
        const { spotid } = req.body;

        // Ensure the spotid is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(spotid)) {
            return res.status(400).json({ message: 'Invalid spot ID' });
        }

        // Find the user by email and update the saved array without duplicates
        const user = await User.findOneAndUpdate(
            { email },
            { $addToSet: { saved: spotid } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Store only the saved list in Redis
        
        await client.set(`${email}`, JSON.stringify(user.saved));

        return res.status(200).json({ message: 'Spot added to your wishlist' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

async function removeSpot(req, res) {
    try {
        const { email } = req.locals
        const { spotid } = req.body;

        // Ensure the spotid is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(spotid)) {
            return res.status(400).json({ message: 'Invalid spot ID' });
        }

        // Find the user by email and remove the spotid from the saved array
        const user = await User.findOneAndUpdate(
            { email },
            { $pull: { saved: spotid } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await client.set(`${email}`, JSON.stringify(user.saved));

        return res.status(200).json({ message: 'Spot removed from your wishlist'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

async function removedata(req, res) {
    try {
        const { email } = req.locals;

        // Remove the data stored in Redis with the given email as the key
        const result = await client.del(`${email}`);
        
        if (result === 1) {
            return res.status(200).json({ message: 'Data successfully removed from Redis' });
        } else {
            return res.status(404).json({ message: 'Data not found in Redis' });
        }
    } catch (error) {
        console.error("Error in removedata:", error);
        return res.status(500).json({ message: error.message });
    }
}

async function generateotp() {
    const otp = await OtpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    return otp
}

async function sendMail(email, otp) {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.ACC_PASS
            }
        })

        let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: `${email}`,
            subject: "OTP Verification",
            html: `
                <h2>Your One Time Password (OTP)</h2>
                <p><b>${otp}</b></p>
                <p>Don't share this OTP with anyone. 
                Our customer service team will never ask you for your password, OTP, Credit card,
                or banking info.</p>
            `
        })

        // console.log(info.messageId);
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}


module.exports = { register, sendotp, verifyotp, checkvalidemail, getUser, checkandcreatetoken, saveSpot, removeSpot, removedata, getProfile }