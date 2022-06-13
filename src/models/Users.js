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
  role: {
    type: [
      {
        type: String,
        // Another properties
      },
    ],
    default: ["USER"],
  },
});

export const userModel = mongoose.model("User", productSchema);
