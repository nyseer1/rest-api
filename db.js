import { MongoClient } from 'mongodb';

let cachedClient = null;
// global variable to reuse database connection (needed for Vercel. vercel runs the function on each request, so by storing the db we dont need to reconnect,reauthenticate,reset connection pools, and requery the data on each request)
let cachedDb = null;

export async function connectToDatabase() {
    if (cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    const db = client.db();

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}