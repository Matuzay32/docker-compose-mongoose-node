const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const dataBase = require("./database");
const routes = require("./routes/index.routes");

app.set("port", process.env.PORT || 3000);

app.set("views", `${__dirname}/views`);

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: `${app.get("views")}/layouts`,
    partialsDir: `${app.get("views")}/partials`,
  })
);
//server
const server = async () => {
  await app.listen(app.get("port"));
  console.log(`server listening on port: ${app.get("port")}`);
};
server();
app.use(routes);
