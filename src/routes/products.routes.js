import { Router } from "express";
import { productModel } from "../models/Product.js";
const productsRoutes = Router();

export default productsRoutes;
//Find all products in the  database
productsRoutes.get(`/products/allproducts`, async (req, res) => {
  const { limit, skip, names } = req.query;
  const resAll = await productModel.find({}).limit(limit);
  const allNamesFind = await productModel.find({}, { name: 1 }).limit(limit);
  if (names) {
  } else {
    res.send(resAll);
  }
  res.status(200);
});

//Upload multiple   products
productsRoutes.post("/products/upload", async (req, res) => {
  var product = req.body;
  const productCreated = await productModel.create(product);
  res.send(productCreated);
  res.status(200);
});
//Find One Product
productsRoutes.get(`/products/:param`, async (req, res) => {
  const params = req.params;
  const { param: productId } = params;
  try {
    const findProduct = await productModel.findById({ _id: productId });
    console.log(findProduct);
    if (findProduct) {
      res.send({ productFind: findProduct });
    } else if (!findProduct) {
      res.send({ notFound: `Not found product with id : ${productId}` });
    }
  } catch (error) {
    res.send({ notFound: `Not found product with id : ${productId}` });
  }
});

//Delete One product
productsRoutes.delete(`/products/:param`, async (req, res) => {
  const params = req.params;
  const { param: productId } = params;

  try {
    const findProductAndDelete = await productModel.findByIdAndDelete({
      _id: productId,
    });
    console.log(findProductAndDelete);
    if (findProductAndDelete) {
      res.send({ productDeleted: findProductAndDelete });
    } else if (!findProductAndDelete) {
      res.send({ notFound: `Not found product with id : ${productId}` });
    }
  } catch (error) {
    res.send({ notFound: `Not found product with id : ${productId}` });
  }
  res.status(200);
});

//Update One product
productsRoutes.put(`/products/:param`, async (req, res) => {
  const params = req.params;
  const { name, description, price } = req.body;
  const { param: productId } = params;

  try {
    const updateOneProduct = await productModel.updateOne(
      { _id: productId },
      { name, description, price }
    );
    if (updateOneProduct) {
      res.send({ productUpdated: { name, description, price } });
    } else if (!updateOneProduct) {
      res.send({ notFound: `Not found product with id : ${productId}` });
    }
  } catch (error) {
    res.send({ notFound: `Not found product with id : ${productId}` });
  }
  res.status(200);
});
