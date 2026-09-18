import mongoose from "mongoose";
import Clinic from "../Const.js";

// const Database = async () => {
//   try {
//     const data = await mongoose.connect(`${process.env.MONGODB_URL}/${Clinic}`);
//     console.log("database connected successfully");
//     return data;
//   } catch (error) {
//     console.log("database not connected", error);
//     throw error;
//   }
// };
// export default Database;
const Database = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    const data = await mongoose.connect(`${process.env.MONGODB_URL}/${Clinic}`);

    console.log("database connected successfully");

    return data;
  } catch (error) {
    console.log("database not connected:", error.message);
    throw error;
  }
};
export default Database;
