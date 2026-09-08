import express from "express";
import {
  Admin_Signup,
  AminLogin,
} from "../Admin_Controller/Admin_Controller.js";
const AdminRouter = express.Router();

AdminRouter.route("/adminsignup").post(Admin_Signup);
AdminRouter.route("/aminLogin").post(AminLogin);
export default AdminRouter;
