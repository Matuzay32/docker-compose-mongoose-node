import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import session from "express-session";
import { engine } from "express-handlebars";
import methodOverride from "method-override";
import bodyParser from "body-parser";

//Routes
import usersRoutes from "./routes/users.routes.js";
import indexRoutes from "./routes/index.routes.js";
import productsRoutes from "./routes/products.routes.js";

//DB
import main from "./database.js";

//File name system
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname, "__dirname");
console.log(__filename, "filename");
const app = express();
app.use(cors());

//Config bodyParser
app.use(bodyParser.json());
//Config settings
app.set("port", process.env.PORT || 3000);
app.set("views", `${__dirname}/views`);

//Config view engine
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: `${app.get("views")}/layouts`,
    partialsDir: `${app.get("views")}/partials`,
  })
);

//Aplication routes
app.use(usersRoutes);
app.use(indexRoutes);
app.use(productsRoutes);

//app public folder
app.use(express.static(`${__dirname}/public`));

//Conection server
const server = async () => {
  await app.listen(app.get("port"));
  console.log(`server listening on port: ${app.get("port")}`);
};
//Activando server
server();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Dando uso al express sesion

app.use(
  session({ secret: "mysecretapp", resave: true, saveUninitialized: true })
);
