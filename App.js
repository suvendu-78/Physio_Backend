import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const App = express();
App.use(cors({ origin: process.env.Cors }));
App.use(express.json({ limit: "50mb" }));
App.use(express.urlencoded({ limit: "50mb", extended: true }));

export default App;
