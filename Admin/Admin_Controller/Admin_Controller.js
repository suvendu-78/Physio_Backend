import Admin_Async from "../Admin_Utils/Admin_Async.js";
import Admin from "../Admin_Models/admin_model.js";

const Admin_Signup = Admin_Async(async (req, res, next) => {
  console.log(req.body);
});
export { Admin_Signup };
