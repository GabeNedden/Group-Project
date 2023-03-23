const { getCartInfo, getCartInfoByEmail } = require("./cartRepository");
const {
  getAllItems,
  getItemDetails,
  getCompanyAllItems,
  putUserCardInfo,
  removeItemInfo,
} = require("./itemsRepository");

const { MongoClient } = require("mongodb");
const { getAllCompanies, getCompanyDetails } = require("./companiesRepository");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbName = "watchstore";

const test = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("watchstore");
    console.log("connected");

    return res.status(200).json({ status: 200, message: "You have arrived" });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

const getItems = async (req, res) => {
  let page = parseInt(req.query.page);
  let size = parseInt(req.query.size);

  let filterable = true;
  if (isNaN(page) || isNaN(size)) {
    page = size = NaN;
    filterable = false;
  }

  const result = filterable
    ? await getAllItems(page, size)
    : await getAllItems();
  console.log(result.items.length);
  return filterable
    ? res
        .status(200)
        .json({ status: 200, data: result.items, hasNext: result.hasNext })
    : res.status(200).json({ status: 200, data: result.items });
};

const getItem = async (req, res) => {
  const item = req.params.itemId;
  const id = parseInt(item);

  if (isNaN(id)) {
    return res
      .status(400)
      .json({ status: 400, data: item, message: "Id is not valid" });
  }
  const details = await getItemDetails(id);
  details.result
    ? res.status(200).json({ status: 200, data: details.result })
    : res
        .status(404)
        .json({ status: 404, data: item, message: "Item not found" });
};

const getCompany = async (req, res) => {
  const id = parseInt(req.params.companyId);
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ status: 400, data: id, message: "Company Id is not valid" });
  }

  const details = await getCompanyDetails(id);
  details.result
    ? res
        .status(200)
        .json({ status: 200, company: details.result })
    : res
        .status(404)
        .json({ status: 404, data: id, message: "Item not found" });
};

const getCompanies = async (req, res) => {
  const result = await getAllCompanies();
  res.status(200).json({ status: 200, data: result.items });
};

const getCompanyItems = async (req, res) => {
  
  const id = parseInt(req.params.companyId);
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ status: 400, data: id, message: "Company Id is not valid" });
  }

  let page = parseInt(req.query.page);
  let size = parseInt(req.query.size);

  if (isNaN(page) || isNaN(size)) {
    page = 0;
    size = 20;
  }

  const result = await getCompanyAllItems(id, page, size);
  console.log(result);
  res.status(200).json({ status: 200, items: result.items, hasNext:result.hasNext });
};

const updateCart = async (req, res) => {
  const { productId, quantity, userEmail } = req.body;
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect dataBase
    await client.connect();
    const db = client.db(dbName);
    console.log("connected!");

    const options = { upsert: true };
    const filter = { email: userEmail };
    const updateDoc = {
      email: userEmail,
    };

    console.log("connected!", userEmail);

    updateDoc[productId] = parseInt(quantity);

    const result = await db
      .collection("carts")
      .updateOne(filter, { $set: updateDoc }, options);

    result
      ? res.status(200).json({
          status: 200,
          data: result,
          request: req.body,
          message: "Cart Updated",
        })
      : res
          .status(404)
          .json({ status: 404, data: userId, message: "Item not found" });
  } catch (err) {
    console.log("err", err);
    return res
      .status(500)
      .json({ status: 500, error: err, message: "unknown error occured" });
  } finally {
    // close and disconnected database
    client.close();
    console.log("disconnected!");
  }
};

const incrementItem = async (req, res) => {
  const { productId, userEmail } = req.body;
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect dataBase
    await client.connect();
    const db = client.db(dbName);
    console.log("connected!");

    const options = { upsert: true };
    const filter = { email: userEmail };
    const updateDoc = {
      email: userEmail,
    };
    //create an object that looks like {1655: 1}
    const incrementer = {};
    incrementer[productId] = 1;

    const result = await db
      .collection("carts")
      .updateOne(filter, { $set: updateDoc, $inc: incrementer }, options);

    result
      ? res.status(200).json({
          status: 200,
          data: result,
          request: req.body,
          message: "Cart Updated",
        })
      : res
          .status(404)
          .json({ status: 404, data: userId, message: "Item not found" });
  } catch (err) {
    console.log("err", err);
    return res
      .status(500)
      .json({ status: 500, error: err, message: "unknown error occured" });
  } finally {
    // close and disconnected database
    client.close();
    console.log("disconnected!");
  }
};

const decrementItem = async (req, res) => {
  const { productId, userEmail } = req.body;
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect dataBase
    await client.connect();
    const db = client.db(dbName);
    console.log("connected!");

    const options = { upsert: true };
    const filter = { email: userEmail };
    const updateDoc = {
      email: userEmail,
    };

    //create an object that looks like {1655: -1}
    const incrementer = {};
    incrementer[productId] = -1;

    const result = await db
      .collection("carts")
      .updateOne(filter, { $set: updateDoc, $inc: incrementer }, options);

    result
      ? res.status(200).json({
          status: 200,
          data: result,
          request: req.body,
          message: "Cart Updated",
        })
      : res
          .status(404)
          .json({ status: 404, data: userId, message: "Item not found" });
  } catch (err) {
    console.log("err", err);
    return res
      .status(500)
      .json({ status: 500, error: err, message: "unknown error occured" });
  } finally {
    // close and disconnected database
    client.close();
    console.log("disconnected!");
  }
};

const removeItemFromCart = async (req, res) => {
  const userId = req.params.userId;
  const shoppInfo = req.body;

  const details = await removeItemInfo(userId, shoppInfo);
  details.result
    ? res.status(200).json({ status: 200, data: details.result })
    : res
        .status(404)
        .json({ status: 404, data: userId, message: "Item not found" });
};

const getCart = async (req, res) => {
  const userId = req.params.userId;

  const details = await getCartInfo(userId);
  details.result
    ? res.status(200).json({ status: 200, data: details.result })
    : res
        .status(404)
        .json({ status: 404, data: userId, message: "Your cart is empty" });
};

const getCartByEmail = async (req, res) => {
  const userEmail = req.params.userEmail;

  console.log("get by email", userEmail);

  const details = await getCartInfoByEmail(userEmail);
  details.result
    ? res.status(200).json({ status: 200, data: details.result })
    : res
        .status(404)
        .json({ status: 404, data: userEmail, message: "Your cart is empty" });
};



const purchaseOrder = async (req, res) => {
  const { cart, userEmail } = req.body;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("watchstore");
    console.log("connected");

    //got through the items in the cart and decrease their stock in the db
    Object.keys(cart).forEach((itemId) => {
      const decrease = -Math.abs(cart[itemId]);
      console.log(itemId);
      db.collection("items").updateOne(
        { _id: parseInt(itemId) },
        { $inc: { numInStock: decrease } }
      );
    });

    //track the email of the user, the date of the order, and the ordered items
    const doc = {
      email: userEmail,
      itemsOrdered: cart,
      orderDate: new Date(),
    };
    const result = await db.collection("orders").insertOne(doc);

    return res
      .status(200)
      .json({ status: 200, data: result, message: "Order Confirmed!" });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

module.exports = {
  test,
  getItems,
  getItem,
  getCart,
  getCompanies,
  getCompany,
  getCompanyItems,
  updateCart,
  removeItemFromCart,
  incrementItem,
  decrementItem,
  purchaseOrder,
  getCartByEmail
};
