//MODEL DEFINITION
// (mongoose definines each type of objects/resource as a model)
//this file defines a subscriber
const mongoose = require('mongoose')
//mongoose is a mongodb framework for nodejs, just makes it easier to do object modeling for mongodb. (Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.)
//creates schema and objects
const subSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subscribedToChannel: {
        type: [String],
        required: true,
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now

    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
})
//exports the mongoose schema to be used in other files
module.exports = mongoose.model('Subscriber', subSchema)