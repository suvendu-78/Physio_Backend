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
import {
  doctorUpload,
  clinicUpload,
} from "../Admin_Middlewire/DV_pattner_middlewire.js";
import upload from "../Admin_Middlewire/DV_pattner_middlewire.js";
import { Doctor_DV } from "../Admin_Controller/Doctor_DV_Controller.js";
import { CliniDv } from "../Admin_Controller/Clinic_DV_Controller.js";
const PattnerRouter = express.Router();

PattnerRouter.route("/pattnersignup").post(SignupPattner);
PattnerRouter.route("/SignupPattner_Doctor").post(SignupPattner_Doctor);
PattnerRouter.route("/doctor_Login").post(Doctor_Login);
PattnerRouter.route("/clinicLogin").post(ClinicLogin);
PattnerRouter.route("/pattner_Forgetpassword").post(Pattner_Forgetpassword);
PattnerRouter.route("/clinic_Forgetpassword").post(Clinic_Forgetpassword);
PattnerRouter.route("/cliniDv").post(clinicUpload, CliniDv);
PattnerRouter.route("/doctor_dv").post(doctorUpload, Doctor_DV);
export default PattnerRouter;
