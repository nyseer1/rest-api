//dbConnect.js cached connection setup. store the connection so we dont have to reset it when its called again. (Vercel uses serverless functions so a standard connection will create a new database instance for every request (each function call runs its own instance), quickly hitting your MongoDB connection limit. )
import mongoose from 'mongoose';
const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

//global variable to keep the mongoose connection. 
//node stores env variables as module, which is needed for the connection.in vercel and next, module cache gets cleared if its not labelled global to keep it persistent.so the connection would be cleared if not saved in this manner.
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) return cached.conn;

    //if theres already a connection pending, wait for that first. 
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        //this updates global. mongoose promise value
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => { return mongoose; });
    }
    //if no other connections exist yet, start one. this updates the global.mongoose conn value
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}

export default dbConnect;



