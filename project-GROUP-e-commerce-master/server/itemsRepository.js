const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const dbName = "watchstore";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getAllItems = async (page, size) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("watchstore");

        const filterable = !isNaN(page) && !isNaN(size);

        const cursor = filterable ? await db.collection("items").find().skip(page * size).limit(size)
            : await db.collection("items").find();

        const hasNext = await cursor.hasNext();
        const items = await cursor.toArray();

        let result = { ok: true, items: items }
        if (filterable) {
            result["hasNext"] = hasNext;
        }

        return result;

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

const getItemDetails = async (item) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("watchstore");
        const items = await db.collection("items").findOne({ _id: item });
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

const getCompanyAllItems = async (companyId, page, size) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("watchstore");

        const cursor = await db.collection("items").find({ companyId: companyId }).skip(page * size).limit(size);
        const hasNext =await cursor.hasNext();
        const items = await cursor.toArray();
        console.log(items.length)
        return {
            ok: true,
            items: items,
            hasNext : hasNext
        }
    }
    catch (err) {
        return {
            ok: false,
            message: err,
        }
    }
    finally {
        await client.close();
        console.log("disconnected");
    }
}

const putUserCardInfo = async (userId, shoppInfo) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        let info = {};

        // connect dataBase
        await client.connect();
        const db = client.db(dbName);
        console.log("connected!");

        Object.keys(shoppInfo).map((itemId) => {
            if (!isNaN(itemId)) {
                info[itemId] =  shoppInfo[itemId];
            } else {
                console.log(`${itemId} is is not valid itemId`);
            };
        });
        const result = await db.collection("carts").updateOne({"client_id":userId}, {$inc: info }  );

        return {
            ok: true, 
            result: result,
        }
    } catch (err) {
        console.log("err.stack:",err);
        return {
            ok: false,
            message: err,
        }
    } finally {
        // close and disconnected database
        client.close();
        console.log("disconnected!");
    };
}

const removeItemInfo = async (userId, shoppInfo) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        let info = {};

        // connect dataBase
        await client.connect();
        const db = client.db(dbName);
        console.log("connected!");

        Object.keys(shoppInfo).map((itemId) => {
            info[itemId] =  shoppInfo[itemId];
        });
        const result = await db.collection("carts").updateOne({"client_id":userId}, {$unset: info }  );

        return {
            ok: true, 
            result: result,
        }
    } catch (err) {
        console.log("err.stack:",err);
        return {
            ok: false,
            message: err,
        }
    } finally {
        // close and disconnected database
        client.close();
        console.log("disconnected!");
    };
}

module.exports = { getAllItems, getItemDetails, putUserCardInfo, removeItemInfo, getCompanyAllItems };