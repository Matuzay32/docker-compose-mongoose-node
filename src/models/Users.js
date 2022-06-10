import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  username: String,

  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  password: String,
});

export const userModel = mongoose.model("User", productSchema);
