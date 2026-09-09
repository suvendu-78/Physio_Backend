import jwt from "jsonwebtoken";
import { Pattner } from "../Models/usermodels.js";

const verifyJWT_Pattner = async (req, res, next) => {
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

    const pattner = await Pattner.findById(decoded.id).select(
      "-Password -Refresh_Token",
    );

    if (!pattner) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.pattner = pattner;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};

export default verifyJWT_Pattner;
