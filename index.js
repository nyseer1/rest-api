//sets up express to handle backend logic including middleware and routing
import cors from "cors"; //to let client receive info from server
import dotenv from "dotenv";
import express from "express";
// import mongoose from "mongoose";
import routes from "./routes/routes.js";
dotenv.config(); //stores env variables to protect sensitive data
const app = express(); //start express
const port = 3000;

app.use(express.json()); //(auto-convert string client requests into json)

//HAVE TO PROVIDE VERCEL WITH A ENV VARIABLE THAT SAYS NODE_ENV = 'production' OR ELSE THIS WONT WORK
// cors allows frontend to recieve http responses for a specified url(indicates specified origins other than its original url can receive responses)
app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production"
				? "https://https://nyseer-ecommerce-site.vercel.app/" //if production then allow this url
				: "http://localhost:3001", //if local then allow this url
	}),
);

routes(app); //tells express to use the routes that i defined in routes.js file (that was imported earlier)

//app.use: route js file path to url (all js files in path linked). Controllers: crud functions applied to each http request for every js page
const listingsPage = "/api/listings";
import httpRequestFunctions from "./controllers/controllers.js";
app.use(listingsPage, httpRequestFunctions);

//for development only: (will not work on vercel) (its for local server responses)
if (process.env.NODE_ENV === "development") {
	//connect to server and run the function ONCE on startup
	app.listen(port, () => {
		console.log(`app listening on port ${port}`);
	});
}

//export so i can use this on vercel
export default app;
