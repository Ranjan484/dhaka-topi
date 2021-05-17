import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import user from "./data/user.js";
import products from "./data/products.js";
dotenv.config();

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

import connectDB from "./config/db.js";

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(user);

    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    const createdProducts = await Product.insertMany(sampleProducts);
    // console.log(createdProducts);
    console.log("Data Imported!".green.inverse);
  } catch (err) {
    console.error(`${err}`.red.inverse);

    process.exit(1);
  }
};

importData();
