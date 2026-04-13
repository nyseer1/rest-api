import * as controllers from "../controllers/controllers.js";
import express from "express";
//ROUTES 
//they tell express call these funcs when getting a http request (the method names) at a specified page (link)
export default (app) => {
    let router = express.Router();

    // create new entity
    router.post("/", controllers.dbConnect, controllers.createOne);

    // get all entities
    router.get("/", controllers.dbConnect, controllers.getAll);

    // get one entity with id (middleware getEntityByID runs first and gives the user to the 2nd function)
    router.get("/:id", controllers.dbConnect, controllers.getEntityByID, controllers.getOne);

    // update one entity with id
    router.patch("/:id", controllers.dbConnect, controllers.getEntityByID, controllers.updateOne);

    // delete one with id
    router.delete("/:id", controllers.dbConnect, controllers.getEntityByID, controllers.deleteOne);

    // delete all
    router.delete("/", controllers.dbConnect, controllers.deleteAll);

    // find all by filter
    router.get("/verified", controllers.dbConnect, controllers.findVerified);

    //tells express to use /controller as its default path for all of these routes
    app.use("/api/listings", router);
};