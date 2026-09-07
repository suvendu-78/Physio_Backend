import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const AdminSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      lowercase: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Mobile: {
      type: Number,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Secretcode: {
      type: String,
    },
  },
  { timestamp: true },
);

AdminSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password, 10);
  } else {
    next();
  }
});

AdminSchema.methods.isPasswordCorrect = async function (password) {
  const data = await bcrypt.compare(this.Password, password);
  return data;
};

AdminSchema.methods.generateAccessToken_admin = function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.Name,
      email: this.Email,
    },
    process.env.Access_Token,
    {
      expiresIn: process.env.Access_Token_expiry,
    },
  );
};

AdminSchema.methods.generateRefreshToken_admin = function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.Name,
      email: this.Email,
    },
    process.env.Refresh_Token,
    {
      expiresIn: process.env.Refresh_Token_expiry,
    },
  );
};
const Admin = mongoose.model("Admmin", AdminSchema);

export default Admin;
