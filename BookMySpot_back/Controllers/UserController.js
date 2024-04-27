let User = require('../Models/User')
const bcrypt = require('bcryptjs')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const OtpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
const { client } = require('../Redis')

require('dotenv').config()

const key = process.env.SECRET_KEY

const signupSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

async function register(req, res) {
    try {
        //JOI validation
        const { value, error } = signupSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        //Check Existing User
        const ExistingUser = await User.findOne({ email: value.email });
        if (ExistingUser) return res.json({ message: "Email already exists!" })

        //hashing the password
        const hashpassword = await bcrypt.hash(value.password, 10)

        //Create new User
        const newUser = new User({ email: value.email, password: hashpassword });
        await newUser.save();
        return res.json({ status: true, message: "User Created successfully", data: newUser })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, message: error })
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
            const isMailsent = await sendMail(email, otp)
            if (isMailsent) {
                return res.status(200).json({ message: "OTP sent successfully!" })
            }
            else {
                return res.status(400).json({ message: "Error in sending OTP" })
            }
        }
        else {
            if (password) {
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
                const isMailsent = await sendMail(email, otp)
                if (isMailsent) {
                    return res.status(200).json({ message: "OTP sent successfully!" })
                }
                else {
                    return res.status(400).json({ message: "Error in sending OTP" })
                }

            }
            return res.status(500).json({ messge: "Enter password to create an account" })
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
        // Get otp from Redis
        const value = await client.get(`${email}`);
        if (!value) {
            return res.status(404).json({ message: "OTP expired!" });
        }

        if (value === otp) {
            // Create auth token
            const authtoken = jwt.sign({ email: email }, key);
            return res.status(200).json({ message: "Login successful!", authtoken: authtoken });
        } else {
            return res.status(404).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error });
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



module.exports = { register, sendotp, verifyotp }