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

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import Database from "./DataBase/databse.js";
dotenv.config();

const App = express();

App.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

App.use(async (req, res, next) => {
  try {
    await Database();
    next();
  } catch (error) {
    console.log("DATABASE CONNECTION ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

App.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Physio backend is running",
  });
});

App.use(express.json({ limit: "50mb" }));
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());

App.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Physio backend is running",
  });
});

import Router from "./Router/router.js";
App.use("/api/v1/user", Router);

import AdminRouter from "./Admin/Admin_Router/admin_Router.js";
App.use("/api/v1/onboard", AdminRouter);

import PattnerRouter from "./Admin/Admin_Router/pattner_Router.js";
App.use("/api/v1/pattner", PattnerRouter);

export default App;
