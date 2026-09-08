import Admin_Async from "../Admin_Utils/Admin_Async.js";
import Pattner from "../Admin_Models/Pattner_model.js";
import ApiError from "../../UTLS/Apierror.js";
import Apiresponse from "../../UTLS/Apiresponse.js";
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
    const existClinic = await Pattner.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (existClinic) {
      throw new ApiError(400, "Clinc already exist !");
    }
    const clinic = await Pattner.create({
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
    const CreatedClinic = await Pattner.findById(clinic.id).select(
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
  const clinic = await Pattner.findOne({
    $or: [{ email: email }, { role: "clinic" }],
  });
  const accessToken = clinic.PattnergererateAccesstoke();
  const refreshToken = clinic.PattnergenerateRefreshtoken();

  const logedin = await Pattner.findById(clinic.id).select(
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

export { SignupPattner, ClinicLogin };
