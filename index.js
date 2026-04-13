//sets up express to handle backend logic including middlware and routing
import routes from "./routes/routes.js";
import dotenv from 'dotenv';
import cors from 'cors'; //to let client recieve info from server
dotenv.config();
import express from 'express';
const app = express()
import mongoose from 'mongoose';
const port = 3000;
//dotenv file here, to hide any sensitive data in deployment

//on database error, take function with error and print it
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to database!"))

app.use(express.json())
//TODO I HAVE TO PROVIDE VERCEL WITH A ENV VARIABLE THAT SAYS NODE_ENV = 'production' OR ELSE THIS WONT WORK
// cors allows frontend to recieve http responses for a specified url
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://https://nyseer-ecommerce-site.vercel.app/'  //if production then allow this url
        : 'http://localhost:3001' //if local then allow this url
}));

//routes
routes(app); //imports and tells express to use the routes that i defined in routes.js file

//routes the js file to the page. express is using the imported crud functions as a middleware for every page(can be a series of middleware with .use)
const page = '/api';
import httpRequestFunctions from './controllers/controllers.js';
app.use(page, httpRequestFunctions)

//for development only: (will not work on vercel) (its for local server responses)
if (process.env.NODE_ENV === 'development') {
    //connect to server and run the function ONCE on startup
    app.listen(port, () => {
        console.log(`app listening on port ${port}`)
    })
}




//export so i can use this on vercel
export default app;
