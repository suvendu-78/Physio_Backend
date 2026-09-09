import Async from "../UTLS/Async.js";
import ApiError from "../UTLS/Apierror.js";
import Apiresponse from "../UTLS/Apiresponse.js";
import { User } from "../Models/usermodels.js";
import crypto from "crypto";
import sendMail from "../Mail/nodemail.js";
const Signup = Async(async (req, res, next) => {
  try {
    const { FName, LName, Role, Email, Password, Mobile, Address } = req.body;
    console.log("RECEIVED DATA:", req.body);

    if (!FName) throw new ApiError(400, "First name is required!");
    if (!LName) throw new ApiError(400, "Last name is required!");
    if (!Role) throw new ApiError(400, "Role is required!");
    if (!Email) throw new ApiError(400, "Email is required!");
    if (!Password) throw new ApiError(400, "Password is required!");
    if (!Mobile) throw new ApiError(400, "Mobile number is required!");
    if (!Address) throw new ApiError(400, "Address is required!");

    const Exiestuser = await User.findOne({
      $or: [{ Email: Email }, { Mobile: Mobile }],
    });

    if (Exiestuser) {
      throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
      FName: FName.toLowerCase(),
      LName: LName.toLowerCase(),
      Role,
      Password,
      Email,
      Mobile,
      Address,
    });

    const CreatedUser = await User.findById(user._id).select(
      "-Password -Refresh_Token",
    );

    return res
      .status(201)
      .json(new Apiresponse(201, CreatedUser, "User registered successfully"));
  } catch (err) {
    console.log("FULL ERROR TRACE:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
      errorStack: err.stack,
    });
  }
});

const Login = Async(async (req, res) => {
  const { Email, Password } = req.body;
  console.log(Email);
  console.log("LOGIN DATA:", req.body);

  const user = await User.findOne({ Email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // IMPORTANT:
  // You should verify Password here.
  // Use your existing password comparison method if you have one.

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const logedin = await User.findById(user._id).select(
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
      "User logged in successfully",
    ),
  );
});
const Booking = Async(async (req, res, next) => {
  const { Type, Date, Time, Fullname, Age, Number, Problem, Address } =
    req.body;

  if (
    !Type ||
    !Date ||
    !Time ||
    !Fullname ||
    !Age ||
    !Number ||
    !Problem ||
    !Address
  ) {
    throw new ApiError(400, "All booking fields are required!");
  }

  return res
    .status(200)
    .json(new Apiresponse(200, {}, "Booking created successfully"));
});

const GetUser = Async(async (req, res) => {
  console.log("REQ.USER:", req.user);

  const user = await User.findById(req.user._id).select(
    "-Password -Refresh_Token",
  );

  console.log("USER FROM DB:", user);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json({
    success: true,
    data: user,
    message: "User data fetched successfully",
  });
});

const RefreshAccessToken = Async(async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.Refresh_Token);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const newAccessToken = user.generateAccessToken();

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    return res
      .status(200)
      .json(new Apiresponse(200, {}, "Access token refreshed successfully"));
  } catch (error) {
    console.log("REFRESH TOKEN ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
});
const Logout = Async(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json(new Apiresponse(200, {}, "User logged out successfully"));
});

const Forgetpassword = Async(async (req, res, next) => {
  const { Email } = req.body;

  console.log("1. Email:", Email);

  const exist = await User.findOne({ Email: Email });

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

  await sendMail(
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
export {
  Signup,
  Login,
  Booking,
  GetUser,
  RefreshAccessToken,
  Logout,
  Forgetpassword,
};
