import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Type.ObjectId,
      required: true,
      ref: "User",
      //to link userId we ref User which is coming from UserSchema
    },
    image: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    catagory: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamp: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
