const mongoose = require("mongoose");
mongoose
  .connect("mongodb://mongo/mymongodatabase")
  .then((db) => console.log("DB connection established", db.connection.host));
