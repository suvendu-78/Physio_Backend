import Async from "../UTLS/Async.js";
import { User } from "../Models/usermodels.js";

const FeedBack = Async(async (req, res) => {
  console.log(req.body);
});
export default FeedBack;
