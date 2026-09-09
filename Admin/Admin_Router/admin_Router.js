import express from "express";
import {
  Admin_Signup,
  AminLogin,
  Admin_Forgetpassword,
} from "../Admin_Controller/Admin_Controller.js";
const AdminRouter = express.Router();

AdminRouter.route("/adminsignup").post(Admin_Signup);
AdminRouter.route("/aminLogin").post(AminLogin);
AdminRouter.route("/admin_Forgetpassword").post(Admin_Forgetpassword);
export default AdminRouter;
