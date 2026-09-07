import express from "express";
import { SignupPattner } from "../Admin_Controller/pattner_Controller.js";
import { SignupPattner_Doctor } from "../Admin_Controller/pattner_Doctor_controller.js";
const PattnerRouter = express.Router();

PattnerRouter.route("/pattnersignup").post(SignupPattner);
PattnerRouter.route("/SignupPattner_Doctor").post(SignupPattner_Doctor);
export default PattnerRouter;
