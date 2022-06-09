const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  const db = await mongoose.connect("mongodb://mongo/mymongodatabase");
  await console.log(db.connection.host.toUpperCase(), "DB CONECTED");
}
