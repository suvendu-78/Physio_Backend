import mongoose from "mongoose";
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
const Admin = mongoose.model("Admmin", AdminSchema);
export default Admin;
