//ROUTES AND CONTROLLERS
import express from "express";
const router = express.Router()
import Subscriber from '../models/subscriber.js';
// const subscriber = require('../models/subscriber')
//res response, req request


//GET (ALL) (OR BY NAME REGEX) lowercase i means ignore case
router.get('/', async (req, res) => {
    try {
        const name = req.body.name;
        const condition = { name: new RegExp(name, 'i') }; //make this a fast anchored regex if # of entities reaches 100k-1M - new RegExp('^' + name) uses index to go straight to elements that start with name
        //if condition exists, add that condition to the filter. else just get all
        if (name != "") {
            const result = await Subscriber.find(condition).exec()
            console.log(`get (filter by name: ${name} ) request was made here`); //must use backticks 
            res.status(200).json(result);
        }
        else {
            const result = await Subscriber.find().exec();
            console.log('get (read all) request was made here');
            res.status(200).json(result);
        }

    } catch (err) { //500 = error on the database(server), not client
        res.status(500).json({ message: err.message });
    }
})

//GET (ONE : ID) id is needed so it is routed into the link as well
router.get('/:id', getSubscriber, (req, res) => { //getSubscriber finds user by their id then this func runs
    console.log('get (read) request was made here for id: ' + req.params.id)
    res.json(res.subscriber)

})

//CREATE (ONE)
router.post('/', async (req, res) => {

    //if name is not taken, create new entity with name specified
    const nameCheck = await Subscriber.find();
    if (nameCheck.size == 1) res.status(400).json({ message: 'Username already in use :(' });

    //creates new js object (using mongoose object model)
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel,
    })
    // console.log('post (create) request was made here')

    //save it to the db
    try {
        //.save tries to save the object to the db, if successful it is saved in the variable
        const newSubscriber = await subscriber.save()
        //201 means successfully created object
        res.status(201).json(newSubscriber)
    } catch (err) {
        //400 user gave invalid data. er ror with user not server
        res.status(400).json({ message: err.message })
    }
})

//UPDATE (ONE)
router.patch('/:id', getSubscriber, async (req, res) => {
    try { // console.log('patch (update) request was made here')
        await res.subscriber.updateOne(req.body);
        // res.json({ message: "updated subscriber successfully" })
        res.json(res.subscriber);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//DELETE (ONE)
router.delete('/:id', getSubscriber, async (req, res) => {
    console.log('delete (one) request was made here for id: ' + req.params.id)
    try {
        await res.subscriber.deleteOne()
        res.json({ message: "deleted subscriber successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//DELETE (ALL)
router.delete('/', async (req, res) => {
    console.log('delete (all) request was made here')
    try {
        const result = await Subscriber.deleteMany({})
        res.json({
            message: "Successfully deleted " + result.deletedCount + " subscribers.",
            deletedCount: result.deletedCount
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//FIND (passes specific criteria, ex: verified)
router.get('/verified', async (req, res) => {
    console.log('find request for verified users made here')
    try {
        const result = Subscriber.find({ verified: true }).exec();
        // res.json({
        //     message: "Found " + result.size + " subscribers.",
        // })
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


/*
MIDDLEWARE
instead of rewriting code where we need to get the id first, lets use middleware to reuse it
next is the callback (function passed into a function to be called later)
*/
async function getSubscriber(req, res, next) {
    let subscriber
    try { //the code that will be used by multiple other functions to get user from their id
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) return res.status(404).json({ message: "user not found" })
    } catch (err) { return res.status(500).json({ message: err.message }) }

    //res value passed to the function that called this as a middleware
    res.subscriber = subscriber
    next() //tells it move to next piece (another middleware or the iriginal request)
}

//TODO WRITE EVERY FUNCTION AS AN EXPORT

//GET (ALL) (OR BY NAME REGEX) lowercase i means ignore case
export const getAll = async (req, res) => {
    try {
        const name = req.body.name;
        const condition = { name: new RegExp(name, 'i') }; //make this a fast anchored regex if # of entities reaches 100k-1M - new RegExp('^' + name) uses index to go straight to elements that start with name
        //if condition exists, add that condition to the filter. else just get all
        if (name != "") {
            const result = await Subscriber.find(condition).exec()
            console.log(`get (filter by name: ${name} ) request was made here`); //must use backticks 
            res.status(200).json(result);
        }
        else {
            const result = await Subscriber.find().exec();
            console.log('get (read all) request was made here');
            res.status(200).json(result);
        }

    } catch (err) { //500 = error on the database(server), not client
        res.status(500).json({ message: err.message });
    }
}

//GET (ONE : ID) id is needed so it is routed into the link as well
export const getOne = async (req, res) => { //getSubscriber finds user by their id then this func runs
    console.log('get (read) request was made here for id: ' + req.params.id)
    res.json(res.subscriber)
}

//CREATE (ONE)
export const createOne = async (req, res) => {

    //if name is not taken, create new entity with name specified
    const nameCheck = await Subscriber.find();
    if (nameCheck.size == 1) res.status(400).json({ message: 'Username already in use :(' });

    //creates new js object (using mongoose object model)
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel,
    })
    // console.log('post (create) request was made here')

    //save it to the db
    try {
        //.save tries to save the object to the db, if successful it is saved in the variable
        const newSubscriber = await subscriber.save()
        //201 means successfully created object
        res.status(201).json(newSubscriber)
    } catch (err) {
        //400 user gave invalid data. er ror with user not server
        res.status(400).json({ message: err.message })
    }
}

//UPDATE (ONE)
router.patch('/:id', getSubscriber, async (req, res) => {
    try { // console.log('patch (update) request was made here')
        await res.subscriber.updateOne(req.body);
        // res.json({ message: "updated subscriber successfully" })
        res.json(res.subscriber);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

/*
MIDDLEWARE
instead of rewriting code where we need to get the id first, lets use middleware to reuse it
next is the callback (function passed into a function to be called later)
*/
export const getEntityByID = async (req, res, next) => {
    // let subscriber
    try { //the code that will be used by multiple other functions to get user from their id
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) return res.status(404).json({ message: "user not found" })
    } catch (err) { return res.status(500).json({ message: err.message }) }

    //res value passed to the function that called this as a middleware
    res.subscriber = subscriber
    next() //tells it move to next piece (another middleware or the iriginal request)
}


export default router;