import express from "express";

import Product from "../models/productModel.js";

const router = express.Router();

router.get("/", async (res, req) => {
  let products = await Product.find({});

  res.json(products);
});

router.get("/:id", async (res, req) => {
  let product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export default router;
