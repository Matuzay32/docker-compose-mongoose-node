import mongoose from "mongoose";

main().catch((err) => console.log(err));

export default async function main() {
  const db = await mongoose.connect("mongodb://mongo/mymongodatabase");
  await console.log(db.connection.host.toUpperCase(), "DB CONECTED");
}
