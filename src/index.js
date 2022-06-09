const port = 3000;
const express = require("express");
const app = express();
const dataBase = require("./database");
const routes = require("./routes/index.routes");

const server = async () => {
  await app.listen(port);
  console.log(`server listening on port: ${port}`);
};

server();
app.use(routes);
