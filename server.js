require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
//dotenv file here, to hide any sensitive data in deployment
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

//on database error, take function with error and print it
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to database!"))

app.use(express.json())

//route the page name subscribers to this js file
const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

//connect to server and run the function ONCE on startup
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

