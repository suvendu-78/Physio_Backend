import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    FName: {
      type: String,
      required: true,
      lowercase: true,
    },
    LName: {
      type: String,
      required: true,
      lowercase: true,
    },
    Password: {
      type: String,
      requered: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Mobile: {
      type: Number,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      required: true,
    },
    Refresh_Token: {},
  },
  { timestamps: true },
);
export const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (req, res, next) {
  if (this.isModify("password")) {
    this.password = await bcrypt.hash(this.Password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  const data = await bcrypt.compare(this.Password, password);
};

jwt.sign(
  {
    name: this.Name,
    Email: this.Email,
  },
  process.env.Access_Token,
  {
    expiresIn: process.env.Access_token_expiry,
  },
);
jwt.sign(
  {
    Email: this.Email,
    Mobile: this.Mobile,
    Role: this.Role,
  },
  process.env.Refresh_Token,
  {
    expiresIn: process.env.Refresh_Token_expiry,
  },
);
