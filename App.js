import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

dotenv.config();
const App = express();
App.use(cors({ origin: "http://localhost:5173", credentials: true }));
App.use(express.json({ limit: "50mb" }));
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());
import Router from "./Router/router.js";

App.use("/api/v1/user", Router);
export default App;
