import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import multer from "multer";
const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);
export default User;
