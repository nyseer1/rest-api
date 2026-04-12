//MODEL(ENTITY) DEFINITION
// (mongoose definines each type entity as a model(json aka javascript object notation))
//this file defines a subscriber
import mongoose from "mongoose";
//mongoose is a mongodb framework for nodejs, just makes it easier to do object modeling for mongodb. (Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.)
//creates schema and objects
const subSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sellerName: {
        type: String,
        required: true,
    },
    // sellerID: {
    //     type: mongoose.ObjectId,
    //     required: true,
    // },
    price: {
        type: mongoose.Decimal128,
        min: 1.00,
        max: 1000000.00,
        required: true,
        default: 0.00,
    },
    // subscribedToChannel: {
    //     type: [String],
    //     required: true,
    //     default: []
    // },
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
export default mongoose.model('Listing', subSchema);