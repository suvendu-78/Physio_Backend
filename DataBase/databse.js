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
// const Database = async () => {
//   try {
//     if (mongoose.connection.readyState === 1) {
//       return mongoose.connection;
//     }

//     const data = await mongoose.connect(`${process.env.MONGODB_URL}/${Clinic}`);

//     console.log("database connected successfully");

//     return data;
//   } catch (error) {
//     console.log("database not connected:", error.message);
//     throw error;
//   }
// };
// export default Database;

import mongoose from "mongoose";
import Clinic from "../Const.js";

let dbPromise = null;

const Database = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!dbPromise) {
    const mongoUrl = process.env.MONGODB_URL;

    if (!mongoUrl) {
      throw new Error("MONGODB_URL is not defined");
    }

    dbPromise = mongoose
      .connect(`${mongoUrl}/${Clinic}`, {
        serverSelectionTimeoutMS: 10000,
      })
      .then(() => {
        console.log("MongoDB connected successfully");
        return mongoose.connection;
      })
      .catch((error) => {
        dbPromise = null;
        console.error("MongoDB connection error:", error.message);
        throw error;
      });
  }

  return dbPromise;
};

export default Database;
