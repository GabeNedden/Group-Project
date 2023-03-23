const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getAllCompanies = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("watchstore");
    const items = await db.collection("companies").find().toArray();
    console.log(items.length);
    return {
      ok: true,
      items: items,
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

const getCompanyDetails = async(companyId) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
      await client.connect();
      const db = client.db("watchstore");
      const items = await db.collection("companies").findOne({ _id: companyId });

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
      console.log("disconnected",getCompanyDetails);
  }
}

module.exports = { getAllCompanies,getCompanyDetails };
