import { Router } from "express";
import { productModel } from "../models/Product.js";
const productsRoutes = Router();

export default productsRoutes;

productsRoutes.get(`/products/allproducts`, async (req, res) => {
  const { limit, skip, names } = req.query;
  const resAll = await productModel.find({}).limit(limit);
  const allNamesFind = await productModel.find({}, { name: 1 }).limit(limit);
  console.log(allNamesFind);
  if (names) {
  } else {
    res.send(resAll);
  }
  res.status(200);
});

productsRoutes.post("/products/upload", async (req, res) => {
  var product = req.body;
  console.log(req.body);
  const productCreated = await productModel.create(product);
  res.send(productCreated);
  res.status(200);
});
