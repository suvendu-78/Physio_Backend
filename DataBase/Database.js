import Resume from "./Const.js";
import mongoose from "mongoose";
const Database = async () => {
  try {
    const data = await mongoose.connect(`${process.env.MONGODB_URL}/${Resume}`);
    console.log("database connected successfully");
    return data;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
export default Database;
