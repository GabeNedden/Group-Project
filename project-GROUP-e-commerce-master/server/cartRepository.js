const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const dbName = "watchstore";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getCartInfo = async (userId) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        console.log("userId",userId);
        await client.connect();
        const db = client.db(dbName);
        const items = await db.collection("carts").find({ "client_id": userId }, {projection:{_id:0, "email":0, "client_id":0}}).toArray();
        console.log("cartItems:", items);
        return {
            ok: true,
            result: items,
        };
    } catch (err) {
        return {
            ok: false,
            message: err,
        };
    } finally {
        await client.close();
        console.log("disconnected");
    }
};

const getCartInfoByEmail = async (userEmail) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        console.log("userEmail",userEmail);
        await client.connect();
        const db = client.db(dbName);
        const items = await db.collection("carts").find({ "email": userEmail }, {projection:{_id:0, "email":0, "client_id":0}}).toArray();
        console.log("cartItems:", items);
        return {
            ok: true,
            result: items,
        };
    } catch (err) {
        return {
            ok: false,
            message: err,
        };
    } finally {
        await client.close();
        console.log("disconnected");
    }
};

module.exports = {getCartInfo, getCartInfoByEmail};
