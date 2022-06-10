import { Router } from "express";
const indexRoutes = Router();

export default indexRoutes;
indexRoutes.get("/", (req, res) => {
  res.send({ index: "index routes desde routes" });
});

indexRoutes.get("/about", (req, res) => {
  res.send({ about: "Ruta de about" });
});
