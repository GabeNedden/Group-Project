"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const {
  test,
  getItems,
  getItem,
  getCompanies,
  getCompany,
  getCompanyItems,
  removeItemFromCart,
  updateCart,
  incrementItem,
  decrementItem,
  getCart,
  purchaseOrder,
  getCartByEmail
} = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/bacon", (req, res) => res.status(200).json("🥓"))

  .get("/test", test)
  .get("/api/items", getItems)
  .get("/api/items/:itemId", getItem)
  .get("/api/companies", getCompanies)
  .get("/api/companies/:companyId", getCompany)
  .get("/api/companies/:companyId/items", getCompanyItems)

  .get("/api/carts/:userId", getCart)

  .get("/api/cartsEmail/:userEmail", getCartByEmail)

  .post("/api/order", purchaseOrder)

  // creeat, add or decrease items in cart EX: {itemId: quantities}
  .put("/api/carts/", updateCart)
  .put("/api/carts/increment", incrementItem)
  .put("/api/carts/decrement", decrementItem)

  // remove items from shopping cart
  .delete("/api/users/items/:userId", removeItemFromCart)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
