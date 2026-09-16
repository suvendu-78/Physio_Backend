import express from "express";
import {
  SignupPattner,
  ClinicLogin,
  Clinic_Forgetpassword,
  verifyJWTClinic,
  getClinic,
  ClinicLogout,
} from "../Admin_Controller/pattner_Controller.js";
import {
  SignupPattner_Doctor,
  Doctor_Login,
  Pattner_Forgetpassword,
  VerifyDoctorJWT,
  findDoctor,
  DoctorLogout,
} from "../Admin_Controller/pattner_Doctor_controller.js";
import {
  doctorUpload,
  clinicUpload,
} from "../Admin_Middlewire/DV_pattner_middlewire.js";
import upload from "../Admin_Middlewire/DV_pattner_middlewire.js";
import {
  Doctor_DV,
  UpdateDoctorVerification,
  getDoctorDocumentVerification,
} from "../Admin_Controller/Doctor_DV_Controller.js";
import {
  CliniDv,
  UpdateClinicVerification,
} from "../Admin_Controller/Clinic_DV_Controller.js";
const PattnerRouter = express.Router();

PattnerRouter.route("/pattnersignup").post(SignupPattner);
PattnerRouter.route("/SignupPattner_Doctor").post(SignupPattner_Doctor);
PattnerRouter.route("/doctor_Login").post(Doctor_Login);
PattnerRouter.route("/clinicLogin").post(ClinicLogin);
PattnerRouter.route("/pattner_Forgetpassword").post(Pattner_Forgetpassword);
PattnerRouter.route("/clinic_Forgetpassword").post(Clinic_Forgetpassword);
PattnerRouter.route("/cliniDv").post(clinicUpload, CliniDv);
PattnerRouter.route("/doctor_dv").post(doctorUpload, Doctor_DV);
PattnerRouter.route("/clinic/status/:id").patch(UpdateClinicVerification);
PattnerRouter.route("/getclinic").get(verifyJWTClinic, getClinic);
PattnerRouter.route("/doctor/status/:id").patch(UpdateDoctorVerification);
PattnerRouter.route("/finddoctor").get(VerifyDoctorJWT, findDoctor);
PattnerRouter.route("/doctorLogout").post(DoctorLogout);
PattnerRouter.route("/clinicLogout").post(ClinicLogout);
PattnerRouter.get(
  "/doctor/document-verification",
  VerifyDoctorJWT,
  getDoctorDocumentVerification,
);
export default PattnerRouter;
