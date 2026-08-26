import express from "express";
import { Signup } from "../Controller/userController.js";

const Router = express.Router();

Router.route("/signup").post(Signup);

export default Router;
