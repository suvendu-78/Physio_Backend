// import jwt from "jsonwebtoken";
// import { User } from "../Models/usermodels.js";

// const verifyJWT = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized - token missing",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.Access_Token);

//     const user = await User.findById(decoded.id).select(
//       "-Password -Refresh_Token",
//     );

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     req.user = user;

//     next();
//   } catch (error) {
//     console.log("JWT ERROR:", error);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// export default verifyJWT;

import jwt from "jsonwebtoken";
import { User } from "../Models/usermodels.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    console.log("ACCESS TOKEN:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - access token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.Access_Token);

    console.log("DECODED:", decoded);

    const user = await User.findById(decoded.id).select(
      "-Password -Refresh_Token",
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};

export default verifyJWT;
