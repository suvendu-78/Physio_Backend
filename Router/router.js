import express from "express";
import { Signup } from "../Controller/userController.js";
import { Login } from "../Controller/userController.js";
import { Booking } from "../Controller/userController.js";
const Router = express.Router();

Router.route("/signup").post(Signup);
Router.route("/login").post(Login);
Router.route("/booking").post(Booking);
export default Router;
