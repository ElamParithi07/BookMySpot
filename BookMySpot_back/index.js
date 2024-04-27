const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const client = require('./Redis')

const UserRouter = require('./Routes/UserRouter')

require('dotenv').config()
const app = express();

app.use(cors({
    origin: '*', // Allow any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, etc.)
    optionsSuccessStatus: 204, // Respond to preflight requests with 204 No Content
}))
app.use(express.json())
app.use('/auth',UserRouter)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected!")
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(process.env.PORT, () => {
    console.log("Server started!");
})
