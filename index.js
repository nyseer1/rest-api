//connection to mongodb (or any) db server
import routes from "./routes/routes.js";
import dotenv from 'dotenv';
import cors from 'cors'; //to let client recieve info from server
dotenv.config();
import express from 'express';
const app = express()
import mongoose from 'mongoose';
const port = 3000
//dotenv file here, to hide any sensitive data in deployment
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

//on database error, take function with error and print it
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to database!"))

app.use(express.json())


app.use(cors({
    origin: 'http://localhost:3001' // your frontend URL
}));

//routes
routes(app);

//routes the js file to the page. express is using the imported crud functions as a middleware for every page(can be a series of middleware)
const page = '/api';
import middleware from './controllers/controllers.js';
app.use(page, middleware)

//connect to server and run the function ONCE on startup
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

