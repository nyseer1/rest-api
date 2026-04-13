//CONTROLLERS (FUNCTIONS THAT ARE GONNA BE CALLED LATER IN EXPRESS ROUTES) res response, req request
import express from "express";
const router = express.Router()
import Listing from '../models/listing.js';
import dbConnect from "../lib/dbConnect.js";

//GET (ALL) (OR BY NAME REGEX) lowercase i means ignore case
export const getAll = async (req, res) => {
    console.log('get all request was made here');
    try {
        let name = "";
        if (req.body && req.body.name) name = req.body.name; //make sure properties were given, including a name prop
        const condition = { name: new RegExp(name, 'i') }; //make this a fast anchored regex if # of entities reaches 100k-1M - new RegExp('^' + name) uses index to go straight to elements that start with name
        //if condition exists, add that condition to the filter. else just get all
        if (name != "") {
            const result = await Listing.find(condition).exec()
            console.log(`get (filter by name: ${name} ) request was made here`); //must use backticks 
            res.status(200).json(result);
        }
        else {
            const result = await Listing.find().exec();
            console.log('get (read all) request was made here');
            res.status(200).json(result);
        }

    } catch (err) { //500 = error on the database(server), not client
        res.status(500).json({ message: err.message });
    }
}

//GET (ONE : ID) id is needed so it is routed into the link as well
export const getOne = (req, res) => { //getListing finds user by their id then this func runs
    console.log("Data received from middleware:" + res.listing);
    res.json(res.listing)
}

//UPDATE (ONE : ID)
export const updateOne = async (req, res) => {
    console.log("updating entity now")
    try { // console.log('patch (update) request was made here')
        await res.listing.updateOne(req.body);
        res.send({ message: `${res.listing.name} was updated successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//CREATE (ONE)
export const createOne = async (req, res) => {

    //if name is not taken, create new entity with name specified
    const nameCheck = await Listing.find();
    if (nameCheck.size == 1) res.status(400).json({ message: 'Username already in use :(' });

    //creates new js object (using mongoose object model)
    const listing = new Listing({
        name: req.body.name,
        sellerName: req.body.sellerName,
        price: req.body.price,
    })

    //save it to the db
    try {
        //.save tries to save the object to the db, if successful it is saved in the variable
        const newListing = await listing.save()
        //201 means successfully created object
        res.status(201).json(newListing)
    } catch (err) {
        //400 user gave invalid data. er ror with user not server
        res.status(400).json({ message: err.message })
    }
}

//DELETE (ONE : ID)
export const deleteOne = async (req, res) => {
    console.log('delete (one) request was made here for id: ' + req.params.id)
    try {
        await res.listing.deleteOne()
        res.send({ message: `${res.listing.name} was deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//DELETE (ALL)
export const deleteAll = async (req, res) => {
    console.log('delete (all) request was made here')
    try {
        const result = await Listing.deleteMany({})
        res.json({
            message: "Successfully deleted " + result.deletedCount + " listings.",
            deletedCount: result.deletedCount
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//FIND (passes specific criteria, ex: verified)
export const findVerified = async (req, res) => {
    console.log('find request for verified users made here')
    try {
        const result = Listing.find({ verified: true }).exec();
        // res.json({
        //     message: "Found " + result.size + " listings.",
        // })
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/*
MIDDLEWARE ----------------------------------------------------------------------------
using middleware to reuse code that will be run often.
next is the callback (function passed into a function to be called later)
*/

//db connection
export const mongooseConnection = async (req, res, next) => {
    try {
        await dbConnect();
        console.log("successfully connected to server")
    }
    catch {
        console.log('Failed to connect to server at dbConnect()')
    }
    next()

}

//reusing function to get an entity by their id so that the next function can access it
export const getEntityByID = async (req, res, next) => {
    // console.log("starting get entity by id")

    try { //the code that will be used by multiple other functions to get user from their id
        const searchresult = await Listing.findById(req.params.id)
        if (searchresult == null) return res.status(404).json({ message: "user not found" })
        //res value passed to the function that called this as a middleware
        res.listing = searchresult
        console.log("done getting id")
    } catch (err) { return res.status(500).json({ message: err.message }) }

    next() //tells it move to ne xt piece (another middleware or the iriginal request)
}



export default router;