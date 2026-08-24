import mongoose from "mongoose";
import Resume from "./Const.js";

const Database = async () => {
  try {
    const data = await mongoose.connect(`${process.env.MONGODB_URL}/${Resume}`);
    console.log("database connected successfully");
    return data;
  } catch (error) {
    console.log("database not connected", error);
  }
};
export default Database;
