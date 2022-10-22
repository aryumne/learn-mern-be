import HttpError from "../models/HttpError.js";
import { MongoClient } from "mongodb";

const url = 'mongodb+srv://be-mern:BE_Mern@mern-db.ca3u4tj.mongodb.net/db-test?retryWrites=true&w=majority';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'learn-mern-db';

// async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection('products');
//     return 'done.';
// }

// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());

const getProduct = async (req, res, next) => {
    const client = new MongoClient(url);
    let products;
    try {
        await client.connect();
        const db = client.db();
        products = await db.collection('products').find().toArray();
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            message: 'Could not store data!',
            error: error
        });
    }
    client.close();
    res.json(products);
}

const storeProduct = async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db();
        await db.collection('products').insertOne(newProduct);
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            message: 'Could not store data!',
            error: error
        });
    };
    client.close();
    res.json(newProduct);
}

const MongoController = {
    getProduct,
    storeProduct
}

export default MongoController
