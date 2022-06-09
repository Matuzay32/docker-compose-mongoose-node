import { Router } from "express";
const indexRoutes = Router();

export default indexRoutes;
indexRoutes.get("/", (req, res) => {
  res.json({ usuario: "index routes desde routes" });
});
