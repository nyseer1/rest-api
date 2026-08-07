/* BACKEND
sets up express to handle backend logic (restful api)
-initializes routes that http requests can be made on
-receives requests
-run the requests through middleware (aka funcs) (usually including requesting data from a database during this)
-send http response back to client
*/
import cors from "cors"; //to let client receive info from server
import express from "express";
import routes from "./routes/routes.js";
import "dotenv/config"; //needed to load dotenv files

const app = express(); //start express
const port = 3001;

app.use(express.json()); //(auto-convert string client requests into json)

routes(app); //tells express to use the routes that i defined in routes.js file (that was imported earlier)

//app.use: route js file path to url (all js files in path linked). Controllers: crud functions applied to each http request for every js page
const listingsPage = "/api/listings";
import httpRequestFunctions from "./controllers/controllers.js";
app.use(listingsPage, httpRequestFunctions);

// cors allows frontend to receive http responses for a specified url(indicates specified origins other than its original url can receive responses) make sure vercel has NODE_ENV=production env
//for development only: (its for local server responses)
if (process.env.NODE_ENV === "development") {
	app.use(cors({ origin: "http://localhost:3001" })); //local path
	app.listen(port, () => {
		console.log(`app listening on port ${port}`);
	});
}
//for production (vercel etc)
else {
	app.use(
		cors({ origin: "https://https://nyseer-ecommerce-site.vercel.app/" }),
	); //local path
}
//export so i can use this on vercel
export default app;
