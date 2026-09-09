import Admin_Async from "../Admin_Utils/Admin_Async.js";
import Pattner from "../Admin_Models/Pattner_model.js";
import ApiError from "../../UTLS/Apierror.js";
import Apiresponse from "../../UTLS/Apiresponse.js";
// import crypto from "crypto";
// import sendMail from "../Mail/pattner.nodemail.js";

const SignupPattner_Doctor = Admin_Async(async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      registrationNumber,
      qualification,
      specialization,
      experience,
      clinicName,
      address,
      city,
      state,
      pincode,
      Password,
      confirmPassword,
      role,
    } = req.body;
    console.log(req.body);
    if (!fullName) {
      throw new ApiError(400, "fullname is missing");
    }

    if (!email) {
      throw new ApiError(400, "email is missing");
    }

    if (!phone) {
      throw new ApiError(400, "phone is missing");
    }

    if (!registrationNumber) {
      throw new ApiError(400, "registrationNumber is missing");
    }

    if (!qualification) {
      throw new ApiError(400, "qualification is missing");
    }

    if (!specialization) {
      throw new ApiError(400, "specialization is missing");
    }

    if (!experience) {
      throw new ApiError(400, "experience is missing");
    }

    if (!clinicName) {
      throw new ApiError(400, "clinicName is missing");
    }

    if (!address) {
      throw new ApiError(400, "address is missing");
    }

    if (!city) {
      throw new ApiError(400, "city is missing");
    }

    if (!state) {
      throw new ApiError(400, "state is missing");
    }

    if (!pincode) {
      throw new ApiError(400, "pincode is missing");
    }

    if (!Password) {
      throw new ApiError(400, "password is missing");
    }

    if (!confirmPassword) {
      throw new ApiError(400, "confirmPassword is missing");
    }

    const existDoctor = await Pattner.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (existDoctor) {
      throw new ApiError(400, "Doctor is already exiest !");
    }
    const Doctor = await Pattner.create({
      fullName: fullName.toLowerCase(),
      email: email.toLowerCase(),
      phone: phone,
      registrationNumber: registrationNumber,
      qualification: qualification,
      specialization: specialization,
      experience: experience,
      clinicName: clinicName,
      address: address,
      city: city,
      state: state,
      pincode: pincode,
      Password: Password,
      role: role,
    });
    const CreatedDoctor = await Pattner.findById(Doctor.id).select(
      "-Password -Refresh_Token",
    );

    return res
      .status(201)
      .json(
        new Apiresponse(201, CreatedDoctor, "User registered successfully"),
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

const Doctor_Login = Admin_Async(async (req, res) => {
  const { Password, Email } = req.body;
  console.log(req.body);
  if (!Password) {
    throw new ApiError(400, "Password is required !");
  }
  if (!Email) {
    throw new ApiError(400, "Email is required !");
  }
  const doctor = await Pattner.findOne({
    $or: [{ email: Email }],
  });
  const accessToken = doctor.PattnergererateAccesstoke();
  const refreshToken = doctor.PattnergenerateRefreshtoken();

  const logedin = await Pattner.findById(doctor.id).select(
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

const Pattner_Forgetpassword = Admin_Async(async (req, res, next) => {
  console.log(req.body);
  const { email } = req.body;
  console.log(email);
  // console.log("1. Email:", email);

  // const exist = await Pattner.findOne({ email: email.toLowerCase() });
  // console.log("2. User:", exist ? "Found" : "Not Found");

  // if (!exist) {
  //   throw new ApiError(404, "User not found");
  // }

  // const resetToken = crypto.randomBytes(32).toString("hex");

  // console.log("3. Token generated");

  // exist.resetPasswordToken = resetToken;
  // exist.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  // try {
  //   await exist.save();

  //   console.log("4. Token saved");
  // } catch (error) {
  //   console.log("SAVE ERROR:", error);
  //   throw error;
  // }

  // // console.log("4. Token saved");

  // const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  // console.log("5. Reset URL created");

  // await sendMail(
  //   exist.email,
  //   "Reset Your Password",
  //   `
  //     <h2>Reset Your Password</h2>

  //     <p>Hello,</p>

  //     <p>You requested to reset your password.</p>

  //     <p>Click the button below:</p>

  //     <a href="${resetUrl}">
  //       Reset Password
  //     </a>

  //     <p>This link will expire in 15 minutes.</p>

  //     <p>If you did not request this, ignore this email.</p>
  //   `,
  // );

  // console.log("6. Email sent");

  // res.status(200).json({
  //   success: true,
  //   message: "Password reset link sent to your email",
  // });
});

export { SignupPattner_Doctor, Doctor_Login, Pattner_Forgetpassword };
