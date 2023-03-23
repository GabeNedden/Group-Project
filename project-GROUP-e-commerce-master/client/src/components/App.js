import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "../views/Homepage";
import NavBar from "../views/Nav/Navbar";
import ProductPage from "../views/ProductPage";
import BrandPage from "../views/BrandPage";
import ProductDetails from "../views/ProductDetails";
import AllBrands from "../views/AllBrands";
import UserPage from "../views/UserPage";
import CartPage from "../views/CartPage";

import Footer from "./Footer/Footer";
import Contact from "./Contact";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/products" element={<ProductPage />} />
          <Route exact path="/products/:companyId" element={<BrandPage />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/brands" element={<AllBrands />} />
          <Route exact path="/user/:email" element={<UserPage />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
