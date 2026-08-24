import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
dotenv.config();
App.use(cors({ origin: process.env.Cors }));
App.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

export default App;
