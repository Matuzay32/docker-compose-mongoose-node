import { Router } from "express";
import { productModel } from "../models/Product.js";
const productsRoutes = Router();

export default productsRoutes;

productsRoutes.get("/products/allproducts", async (req, res) => {
  const respuesta = await productModel.find({});
  console.log(await productModel.find());
  res.send(respuesta);
});
