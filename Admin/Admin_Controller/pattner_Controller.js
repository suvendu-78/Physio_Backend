import Admin_Async from "../Admin_Utils/Admin_Async.js";
import Pattner_clinic from "../Admin_Models/pattner_model_Clinic.js";
import ApiError from "../../UTLS/Apierror.js";
import Apiresponse from "../../UTLS/Apiresponse.js";
import Pattner_sendMail from "../Mail_Amin/pattner.nodemail.js";
import crypto from "crypto";
const SignupPattner = Admin_Async(async (req, res, next) => {
  try {
    const {
      clinicName,
      ownerName,
      email,
      phone,
      registrationNumber,
      clinicType,
      address,
      city,
      state,
      pincode,
      Password,
      role,
    } = req.body;
    console.log(req.body);
    if (!clinicName) {
      throw new ApiError(404, "Clinic name is required !");
    }

    if (!ownerName) {
      throw new ApiError(404, "Owner name is required !");
    }

    if (!email) {
      throw new ApiError(404, "Email is required !");
    }

    if (!phone) {
      throw new ApiError(404, "Phone number is required !");
    }

    if (!registrationNumber) {
      throw new ApiError(404, "Registration number is required !");
    }

    if (!clinicType) {
      throw new ApiError(404, "Clinic type is required !");
    }

    if (!address) {
      throw new ApiError(404, "Address is required !");
    }

    if (!city) {
      throw new ApiError(404, "City is required !");
    }

    if (!state) {
      throw new ApiError(404, "State is required !");
    }

    if (!pincode) {
      throw new ApiError(404, "Pincode is required !");
    }

    if (!Password) {
      throw new ApiError(404, "Password is required !");
    }
    const existClinic = await Pattner_clinic.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (existClinic) {
      throw new ApiError(400, "Clinc already exist !");
    }
    const clinic = await Pattner_clinic.create({
      clinicName: clinicName,
      ownerName: ownerName,
      email: email,
      phone: phone,
      registrationNumber: registrationNumber,
      clinicType: clinicType,
      address: address,
      city: city,
      state: state,
      pincode: pincode,
      Password: Password,
      role: role,
    });
    const CreatedClinic = await Pattner_clinic.findById(clinic.id).select(
      "-Password -Refresh_Token",
    );

    return res
      .status(201)
      .json(
        new Apiresponse(201, CreatedClinic, "user registered successfully"),
      );
  } catch (err) {
    console.log("FULL ERROR TRACE:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
      errorStack: err.stack,
    });
  }
});

const ClinicLogin = Admin_Async(async (req, res) => {
  const { email, Password } = req.body;
  console.log(req.body);
  if (!email) {
    throw new ApiError(400, "email is required");
  }
  if (!Password) {
    throw new ApiError(400, "Password is required");
  }
  const clinic = await Pattner_clinic.findOne({
    $or: [{ email: email }],
  });
  const isPasswordCorrect = await clinic.isPasswordCorrect(Password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }
  const accessToken = clinic.PattnergererateAccesstoke();
  const refreshToken = clinic.PattnergenerateRefreshtoken();

  const logedin = await Pattner_clinic.findById(clinic.id).select(
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
      "Doctor logged in successfully",
    ),
  );
});

const Clinic_Forgetpassword = Admin_Async(async (req, res, next) => {
  console.log(req.body);
  const { email } = req.body;
  console.log(email);
  console.log("1. Email:", email);

  const exist = await Pattner_clinic.findOne({ email: email.toLowerCase() });
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
    exist.email,
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

export { SignupPattner, ClinicLogin, Clinic_Forgetpassword };
