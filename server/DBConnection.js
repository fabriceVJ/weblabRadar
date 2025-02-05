import {MongoClient} from "mongodb"

const url = process.env.MONGODB_URI;
const client = new MongoClient(connectionStr$ing);
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@${url}}/?authMechanism=DEFAULT`
let connection;
try {
    connection = await client.connect();
} catch (err) {
    console.log("Could not connect to MongoDB. " + err.message);
}
// TODO change dbName
let db = connection.db("technologies");
export default db;