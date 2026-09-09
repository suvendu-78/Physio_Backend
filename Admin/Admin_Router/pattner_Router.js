import express from "express";
import {
  SignupPattner,
  ClinicLogin,
  Clinic_Forgetpassword,
} from "../Admin_Controller/pattner_Controller.js";
import {
  SignupPattner_Doctor,
  Doctor_Login,
  Pattner_Forgetpassword,
} from "../Admin_Controller/pattner_Doctor_controller.js";
const PattnerRouter = express.Router();

PattnerRouter.route("/pattnersignup").post(SignupPattner);
PattnerRouter.route("/SignupPattner_Doctor").post(SignupPattner_Doctor);
PattnerRouter.route("/doctor_Login").post(Doctor_Login);
PattnerRouter.route("/clinicLogin").post(ClinicLogin);
PattnerRouter.route("/pattner_Forgetpassword").post(Pattner_Forgetpassword);
PattnerRouter.route("/clinic_Forgetpassword").post(Clinic_Forgetpassword);
export default PattnerRouter;
