import express from "express";
import { Signup } from "../Controller/userController.js";
import { Login } from "../Controller/userController.js";
import { Booking } from "../Controller/userController.js";
import { GetUser } from "../Controller/userController.js";
import verifyJWT from "../Middlewire/middlewire.js";
import {
  RefreshAccessToken,
  Logout,
  Forgetpassword,
} from "../Controller/userController.js";

const Router = express.Router();

Router.route("/signup").post(Signup);
Router.route("/login").post(Login);
Router.route("/booking").post(Booking);
Router.route("/getuser").get(verifyJWT, GetUser);
Router.route("/refreshAccessToken").post(RefreshAccessToken);
Router.route("/logout").post(Logout);
Router.route("/forgetpassword").post(Forgetpassword);
export default Router;
