import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
dotenv.config();
const App = express();
App.use(cors({ origin: process.env.Cors }));
App.use(express.json({ limit: "50mb" }));
App.use(express.urlencoded({ extended: true }));

import Router from "./Router/router.js";

App.use("/api/v1/user", Router);
export default App;
