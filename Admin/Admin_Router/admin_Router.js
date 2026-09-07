import express from "express";
import { Admin_Signup } from "../Admin_Controller/Admin_Controller.js";
const AdminRouter = express.Router();

AdminRouter.route("/adminsignup").post(Admin_Signup);
export default AdminRouter;
