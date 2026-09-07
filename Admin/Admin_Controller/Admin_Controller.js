import Admin_Async from "../Admin_Utils/Admin_Async.js";
import Admin from "../Admin_Models/admin_model.js";
import ApiError from "../../UTLS/Apierror.js";
import Apiresponse from "../../UTLS/Apiresponse.js";
const Admin_Signup = Admin_Async(async (req, res, next) => {
  try {
    const { Name, Email, Password, Mobile, Secretcode } = req.body;
    console.log(req.body);
    if (!Name) {
      throw new ApiError(400, "Name is missing");
    }
    if (!Email) {
      throw new ApiError(400, "Email is required");
    }
    if (!Password) {
      throw new ApiError(400, "Password is missaing");
    }
    if (!Mobile) {
      throw new ApiError(400, "Mobile nUmber is require");
    }
    if (!Secretcode) {
      throw new ApiError(400, "Secretcode is missing");
    }
    const AdminExist = await Admin.findOne({
      $or: [{ Email: Email }],
    });
    if (AdminExist) {
      throw new ApiError(400, "user already exist !");
    }

    const admin = await Admin.create({
      Name: Name.toLowerCase(),
      Email: Email,
      Password: Password,
      Mobile: Mobile,
      Secretcode: Secretcode,
    });

    const CreatedAdmin = await Admin.findById(admin._id).select(
      "-Password -Refresh_Token",
    );

    return res
      .status(201)
      .json(new Apiresponse(201, CreatedAdmin, "User registered successfully"));
  } catch (err) {
    console.log("FULL ERROR TRACE:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
      errorStack: err.stack,
    });
  }
});

const AminLogin = Admin_Async(async (req, res) => {
  const { Email, Password } = req.body;

  console.log("LOGIN DATA:", req.body);

  const admin = await Admin.findOne({ Email });

  if (!admin) {
    throw new ApiError(404, "admin  not found");
  }

  const accessToken = admin.generateAccessToken_admin();
  const refreshToken = admin.generateRefreshToken_admin();

  const logedin = await Admin.findById(admin.id).select(
    "-Password -Refresh_Token",
  );

  // Access Token Cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false, // true in production HTTPS
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  // Refresh Token Cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // true in production HTTPS
    sameSite: "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(
    new Apiresponse(
      200,
      {
        logedin,
      },
      "Admin logged in successfully",
    ),
  );
});

export { Admin_Signup };
