import Admin_Async from "../Admin_Utils/Admin_Async.js";
import Admin from "../Admin_Models/admin_model.js";
import ApiError from "../../UTLS/Apierror.js";
import Apiresponse from "../../UTLS/Apiresponse.js";
import Pattner_sendMail from "../Mail_Amin/pattner.nodemail.js";
import crypto from "crypto";
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

    const CreatedAdmin = await Admin.findById(admin.id).select(
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

  console.log(req.body);

  if (!Email) {
    throw new ApiError(400, "Email is required");
  }

  if (!Password) {
    throw new ApiError(400, "Password is required");
  }

  console.log("LOGIN DATA:", req.body);

  const admin = await Admin.findOne({ Email });

  if (!admin) {
    throw new ApiError(404, "admin not found");
  }

  const isPasswordValid = await admin.isPasswordCorrect(Password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const accessToken = admin.generateAccessToken_admin();
  const refreshToken = admin.generateRefreshToken_admin();

  const logedin = await Admin.findById(admin.id).select(
    "-Password -Refresh_Token",
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
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

const Admin_Forgetpassword = Admin_Async(async (req, res, next) => {
  console.log(req.body);
  const { Email } = req.body;
  console.log(Email);
  console.log("1. Email:", Email);

  const exist = await Admin.findOne({ Email: Email.toLowerCase() });
  console.log("2. User:", exist ? "Found" : "Not Found");

  if (!exist) {
    throw new ApiError(404, "User not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  console.log("3. Token generated");

  exist.resetPasswordToken = resetToken;
  exist.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  try {
    await exist.save();

    console.log("4. Token saved");
  } catch (error) {
    console.log("SAVE ERROR:", error);
    throw error;
  }

  // console.log("4. Token saved");

  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  console.log("5. Reset URL created");

  await Pattner_sendMail(
    exist.Email,
    "Reset Your Password",
    `
      <h2>Reset Your Password</h2>

      <p>Hello,</p>

      <p>You requested to reset your password.</p>

      <p>Click the button below:</p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>This link will expire in 15 minutes.</p>

      <p>If you did not request this, ignore this email.</p>
    `,
  );

  console.log("6. Email sent");

  res.status(200).json({
    success: true,
    message: "Password reset link sent to your email",
  });
});
export { Admin_Signup, AminLogin, Admin_Forgetpassword };
