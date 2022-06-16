import { Router } from "express";
import { productModel } from "../models/Product.js";
const productsRoutes = Router();
import { verifyToken } from "./middelwares/validateToken.js";

export default productsRoutes;
//Find all products in the  database
productsRoutes.get(`/products/allproducts`, async (req, res) => {
  const { limit, skip, names } = req.query;
  const resAll = await productModel.find({}).limit(limit);
  const allNamesFind = await productModel.find({}, { name: 1 }).limit(limit);
  if (names) {
    res.status(200);
    res.send(allNamesFind);
  } else {
    res.status(200);
    res.send(resAll);
  }
});

//Upload multiple   products
productsRoutes.post("/products/upload", async (req, res) => {
  var product = req.body;
  const { name, description, price } = product;
  if (name && description && price) {
    const productCreated = await productModel.create(product);
    res.status(200).send(productCreated);
  } else {
    res.status(200).send({
      error: "Enter all the values, both price and description, and the name",
    });
  }
});
//Find One Product
productsRoutes.get(`/products/id/:param`, async (req, res) => {
  const params = req.params;
  const { param: productId } = params;
  try {
    const findProduct = await productModel.findById({ _id: productId });
    if (findProduct) {
      res.status(200).send({ productFind: findProduct });
    } else if (!findProduct) {
      res
        .status(200)
        .send({ notFound: `Not found product with id : ${productId}` });
    }
  } catch (error) {
    res
      .status(400)
      .send({ notFound: `Not found product with id : ${productId}` });
  }
});

//Delete One product
productsRoutes.delete(`/products/id/:param`, async (req, res) => {
  const params = req.params;
  const { param: productId } = params;

  try {
    const findProductAndDelete = await productModel.findByIdAndDelete({
      _id: productId,
    });
    if (findProductAndDelete) {
      res.status(200).send({ productDeleted: findProductAndDelete });
    } else if (!findProductAndDelete) {
      res
        .status(200)
        .send({ notFound: `Not found product with id : ${productId}` });
    }
  } catch (error) {
    res
      .status(400)
      .send({ notFound: `Not found product with id : ${productId}` });
  }
});

//Update One product
productsRoutes.put(`/products/id/:param`, async (req, res) => {
  const params = req.params;
  const { name, description, price } = req.body;
  const { param: productId } = params;
  var updateOneProduct = await productModel.updateOne(
    { _id: productId },
    { name, description, price }
  );

  try {
    if (updateOneProduct) {
      res.status(200);
      res.send({ productUpdated: { name, description, price } });
    } else if (!updateOneProduct) {
      res.status(400);
      res.send({ notFound: `Not found product with id : ${productId}` });
    }
  } catch (error) {
    res.status(400);
    res.send({ notFound: `Not found product with id : ${productId}` });
  }
});
