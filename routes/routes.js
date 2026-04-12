import * as controllers from "../controllers/controllers.js";
import express from "express";
//ROUTES 
//they tell express call these funcs when getting a http request (the method names) at a specified page (link)
export default (app) => {
    let router = express.Router();

    // create new entity
    router.post("/", controllers.createOne);

    // get all entities
    router.get("/", controllers.getAll);

    // get one entity with id (middleware getEntityByID runs first and gives the user to the 2nd function)
    router.get("/:id", controllers.getEntityByID, controllers.getOne);

    // update one entity with id
    router.patch("/:id", controllers.getEntityByID, controllers.updateOne);

    // delete one with id
    router.delete("/:id", controllers.getEntityByID, controllers.deleteOne);

    // delete all
    router.delete("/", controllers.deleteAll);

    // find all by filter
    router.get("/verified", controllers.findVerified);

    //tells express to use /controller as its default path for all of these routes
    app.use("/api/listings", router);
};