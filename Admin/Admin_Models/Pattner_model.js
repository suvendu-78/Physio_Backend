import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const PattnerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      // required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    Password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["clinic", "doctor", "patient", "admin"],
      required: true,
    },

    registrationNumber: {
      type: String,
      trim: true,
    },

    qualification: {
      type: String,
      trim: true,
    },

    specialization: {
      type: String,
      trim: true,
    },

    experience: {
      type: Number,
      min: 0,
    },

    clinicName: {
      type: String,
      trim: true,
    },
    ownerName: {
      type: String,
      trim: true,
    },

    clinicType: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    pincode: {
      type: String,
      trim: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
    },

    otpExpiresAt: {
      type: Date,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

PattnerSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password, 10);
  } else {
    next();
  }
});
PattnerSchema.methods.isPasswordCorrect = async function (password) {
  const Pattner_data = await bcrypt.compare(password, this.Password);
  return Pattner_data;
};
PattnerSchema.methods.PattnergererateAccesstoke = function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.fullName,
      email: this.email,
    },
    process.env.Access_Token,
    {
      expiresIn: process.env.Access_Token_expiry,
    },
  );
};
PattnerSchema.methods.PattnergenerateRefreshtoken = function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.fullName,
      email: this.email,
      moblie: this.phone,
    },
    process.env.Refresh_Token,
    {
      expiresIn: process.env.Refresh_Token_expiry,
    },
  );
};
const Pattner = mongoose.model("Pattner", PattnerSchema);

export default Pattner;
