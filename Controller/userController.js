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

// const Login = Async(async (req, res, next) => {
//   const { Email, Password } = req.body;

//   console.log("Login Payload:", req.body);
//   if (!Email) {
//     throw new ApiError(400, "Email is required!");
//   }
//   if (!Password) {
//     throw new ApiError(400, "Password is required!");
//   }

//   const user = await User.findOne({ Email: Email.toLowerCase().trim() });
//   if (!user) {
//     throw new ApiError(404, "User does not exist. Please sign up first.");
//   }

//   const isPasswordValid = await user.isPasswordCorrect(Password);
//   if (!isPasswordValid) {
//     throw new ApiError(401, "Invalid user credentials");
//   }

//   const accessToken = user.generateAccessToken();
//   const refreshToken = user.generateRefreshToken();

//   user.Refresh_Token = refreshToken;
//   await user.save({ validateBeforeSave: false });

//   const loggedInUser = await User.findById(user._id).select(
//     "-Password -Refresh_Token",
//   );

//   const options = {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//   };

//   return res
//     .status(200)
//     .cookie("accessToken", accessToken, options)
//     .cookie("refreshToken", refreshToken, options)
//     .json(
//       new Apiresponse(
//         200,
//         { user: loggedInUser, accessToken, refreshToken },
//         "Login successful",
//       ),
//     );
// });

const Login = Async(async (req, res) => {
  const { Email, Password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ Email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const passwordValid = await user.isPasswordCorrect(Password);
  if (!passwordValid) {
    throw new ApiError(400, "Password is incorrect");
  }

  const accessToken = user.generateAccessToken();

  const logedin = await User.findById(user._id).select(
    "-Password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return (
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      // .cookie("refreshToken", refreshToken, options) // Uncomment if you have refreshToken
      .json(
        new Apiresponse(
          200,
          { logedin, accessToken },
          "User logged in successfully",
        ),
      )
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

export { Signup, Login, Booking };
