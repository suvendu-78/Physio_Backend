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

userSchema.pre("save", async function (next) {
  // Check capital "Password" and exit early if unchanged
  if (!this.isModified("Password")) return next();

  this.Password = await bcrypt.hash(this.Password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  const data = await bcrypt.compare(this.Password, password);
};
// Access Token Generator
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      FName: this.FName,
      LName: this.LName,
      Email: this.Email,
      Role: this.Role,
    },
    process.env.Access_Token || "DEFAULT_ACCESS_SECRET",
    {
      expiresIn: process.env.Access_Token_expiry || "1d",
    },
  );
};

// Refresh Token Generator
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.Refresh_Token || "DEFAULT_REFRESH_SECRET",
    {
      expiresIn: process.env.Refresh_Token_expiry || "10d",
    },
  );
};
export const User = mongoose.model("User", userSchema);
