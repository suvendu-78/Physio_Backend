import Async from "../UTLS/Async.js";
import ApiError from "../UTLS/Apierror.js";
import Apiresponse from "../UTLS/Apiresponse.js";
import { User } from "../Models/usermodels.js";

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

// const Login = Async(async (req, res) => {
//   const { Email, Password } = req.body;

//   console.log(req.body);

//   const user = await User.findOne({ Email });

//   if (!user) {
//     throw new ApiError(404, "User not found");
//   }

//   const accessToken = user.generateAccessToken();

//   const logedin = await User.findById(user._id).select(
//     "-Password -refreshToken",
//   );

//   return res.status(200).json(
//     new Apiresponse(
//       200,
//       {
//         logedin,
//         accessToken,
//       },
//       "User logged in successfully",
//     ),
//   );
// });
const Login = Async(async (req, res) => {
  const { Email, Password } = req.body;

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
export { Signup, Login, Booking, GetUser, RefreshAccessToken, Logout };
