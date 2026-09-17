// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import multer from "multer";
// import cookieParser from "cookie-parser";

// dotenv.config();
// const App = express();
// App.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:5174"],
//     credentials: true,
//   }),
// );
// App.use(express.json({ limit: "50mb" }));
// App.use(express.urlencoded({ extended: true }));
// App.use(cookieParser());
// import Router from "./Router/router.js";

// App.use("/api/v1/user", Router);

// import AdminRouter from "./Admin/Admin_Router/admin_Router.js";

// App.use("/api/v1/onboard", AdminRouter);

// import PattnerRouter from "./Admin/Admin_Router/pattner_Router.js";

// App.use("/api/v1/pattner", PattnerRouter);
// export default App;

import App from "./App.js";
import Database from "./DataBase/databse.js";

const databaseConnection = Database();

App.use(async (req, res, next) => {
  try {
    await databaseConnection;
    next();
  } catch (error) {
    console.log("Database connection error:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 8000;

  databaseConnection
    .then(() => {
      App.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log("There is some error from database:", error);
    });
}

export default App;
