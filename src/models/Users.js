import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  username: {
    type: String,
    required: true,
    match: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
  },

  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
  },
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
