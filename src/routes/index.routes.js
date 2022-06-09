const { Router } = require("express");

const routes = Router();

routes.get("/", (req, res) => {
  res.json({ saludo: "hola mundo desde routers" });
});

module.exports = routes;
