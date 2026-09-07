import Admin_Async from "../Admin_Utils/Admin_Async.js";
import Pattner from "../Admin_Models/Pattner_model.js";

const SignupPattner_Doctor = Admin_Async(async (req, res, next) => {
  console.log(req.body);
});

export { SignupPattner_Doctor };
