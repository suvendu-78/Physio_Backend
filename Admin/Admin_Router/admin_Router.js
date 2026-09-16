import express from "express";
import {
  Admin_Signup,
  AminLogin,
  Admin_Forgetpassword,
  clinicpendingData,
  GetPendingDoctors,
  VerifyAdminJWT,
  FindAdmin,
  AdminLogout,
} from "../Admin_Controller/Admin_Controller.js";
const AdminRouter = express.Router();

AdminRouter.route("/adminsignup").post(Admin_Signup);
AdminRouter.route("/aminLogin").post(AminLogin);
AdminRouter.route("/admin_Forgetpassword").post(Admin_Forgetpassword);
AdminRouter.route("/clinicpendingData").get(clinicpendingData);
AdminRouter.route("/getPendingDoctors").get(GetPendingDoctors);
AdminRouter.route("/findAdmin").get(VerifyAdminJWT, FindAdmin);
AdminRouter.route("/adminLogout").post(AdminLogout);

export default AdminRouter;
