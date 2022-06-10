import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
});

export const productModel = mongoose.model("Product", productSchema);
