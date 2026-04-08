const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')
// const subscriber = require('../models/subscriber')
module.exports = router
//res response, req request


//GET (ALL)
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find() //async method to find all for resource
        console.log('get (read all) request was made here')
        res.json(subscribers)
    } catch (err) { //500 = error on the database(server), not client
        res.status(500).json({ message: err.message })
    }
})

//GET (ONE : ID) id is needed so it is routed into the link as well
router.get('/:id', getSubscriber, (req, res) => { //getSubscriber finds user by their id then this func runs
    console.log('get (read) request was made here for id: ' + req.params.id)
    res.json(res.subscriber)

})

//CREATE (ONE)
router.post('/', async (req, res) => {
    //creates new js object (using mongoose object model)
    const subscriber = new Subscriber({
        name: req.body.name,
        downloadingFrom: req.body.downloadingFrom,
    })
    console.log('post (create) request was made here')

    //save it to the db
    try {
        //.save tries to save the object to the db, if successful it is saved in the variable
        const newSubscriber = await subscriber.save()
        //201 means successfully created object
        res.status(201).json(newSubscriber)
    } catch (err) {
        //400 user gave invalid data. error with user not server
        res.status(400).json({ message: err.message })
    }
})

//UPDATE (ONE)
router.patch('/:id', getSubscriber, (req, res) => {
    res.send('patch (update) request was made here')

})

//DELETE (ONE)
router.delete('/:id', getSubscriber, async (req, res) => {
    console.log('delete (delete) request was made here for id: ' + req.params.id)
    try {
        await res.subscriber.deleteOne()
        res.json({ message: "deleted subscriber successfully" })
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