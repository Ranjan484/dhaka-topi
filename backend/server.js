// const express = require("express");
// const products = require("./data/products");
// const cors = require("cors");
import express from "express";
import products from "./data/products.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import productRouters from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API server is working");
});

app.get("/api/products", (req, res, next) => {
  res.json(products);
});

app.use("/api/products", productRouters);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT} `.bgGreen));
