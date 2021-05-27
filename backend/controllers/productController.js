import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// fetch all the product
// GET /api/products
// public file

const getProducts = asyncHandler(async (req, res) => {
  let products = await Product.find({});

  res.json(products);
});

// fetch product by id
// GET /api/products/:id
// public file

const getProductById = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export { getProducts, getProductById };
