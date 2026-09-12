// // import Doctor from "../Admin_Models/pattner_model_DoctorDV.js";
// // import Admin_Async from "../Admin_Utils/Admin_Async.js";
// // import uploadon_Cloudnary from "../Admin_Utils/cloudnary.js";
// // import ApiError from "../../UTLS/Apierror.js";
// // import Apiresponse from "../../UTLS/Apiresponse.js";
// // import Pattner from "../Admin_Models/Pattner_model_Doctor.js";
// // import fs from "fs";
// // const Doctor_DV = Admin_Async(async (req, res) => {
// //   console.log("BODY:", req.body);
// //   console.log("FILES:", req.files);

// //   const { email } = req.body;

// //   if (!email) {
// //     throw new ApiError(400, "Email is required");
// //   }

// //   const doctor = await Pattner.findOne({ email });

// //   if (!doctor) {
// //     throw new ApiError(404, "Doctor not found");
// //   }

// //   const uploadFile = async (file, folder) => {
// //     if (!file) {
// //       return null;
// //     }

// //     console.log("Uploading file:", file.path);
// //     console.log("File exists before Cloudinary:", fs.existsSync(file.path));

// //     const result = await uploadon_Cloudnary(file.path, folder);

// //     console.log("Cloudinary result:", result);

// //     return result || null;
// //   };
// //   if (req.files?.medicalLicense?.[0]) {
// //     doctor.medicalLicense = await uploadFile(
// //       req.files.medicalLicense[0],
// //       "doctor-documents",
// //     );
// //   }

// //   if (req.files?.identityProof?.[0]) {
// //     doctor.identityProof = await uploadFile(
// //       req.files.identityProof[0],
// //       "doctor-documents",
// //     );
// //   }

// //   if (req.files?.degreeCertificate?.[0]) {
// //     doctor.degreeCertificate = await uploadFile(
// //       req.files.degreeCertificate[0],
// //       "doctor-documents",
// //     );
// //   }

// //   if (req.files?.experienceCertificate?.[0]) {
// //     doctor.experienceCertificate = await uploadFile(
// //       req.files.experienceCertificate[0],
// //       "doctor-documents",
// //     );
// //   }

// //   if (req.files?.profilePhoto?.[0]) {
// //     doctor.profilePhoto = await uploadFile(
// //       req.files.profilePhoto[0],
// //       "doctor-documents",
// //     );
// //   }

// //   if (req.files?.clinicImages?.[0]) {
// //     doctor.clinicImages = await uploadFile(
// //       req.files.clinicImages[0],
// //       "doctor-documents",
// //     );
// //   }

// //   await doctor.save();

// //   const updatedDoctor = await Doctor.findById(doctor._id).select(
// //     "-Password -otp",
// //   );

// //   return res
// //     .status(200)
// //     .json(
// //       new Apiresponse(
// //         200,
// //         updatedDoctor,
// //         "Doctor documents uploaded successfully",
// //       ),
// //     );
// // });

// // export { Doctor_DV };

// import Doctor from "../Admin_Models/pattner_model_DoctorDV.js";
// import Admin_Async from "../Admin_Utils/Admin_Async.js";
// import uploadon_Cloudnary from "../Admin_Utils/cloudnary.js";
// import Apiresponse from "../../UTLS/Apiresponse.js";
// import fs from "fs";

// const Doctor_DV = Admin_Async(async (req, res) => {
//   console.log("BODY:", req.body);
//   console.log("FILES:", req.files);

//   const uploadFile = async (file, folder) => {
//     if (!file) {
//       return null;
//     }

//     console.log("Uploading file:", file.path);
//     console.log("File exists before Cloudinary:", fs.existsSync(file.path));

//     const result = await uploadon_Cloudnary(file.path, folder);

//     console.log("Cloudinary result:", result);

//     return result || null;
//   };

//   const doctor = new Doctor({
//     fullName: req.body.fullName,
//     email: req.body.email,
//     phone: req.body.phone,
//     dateOfBirth: req.body.dateOfBirth,
//     gender: req.body.gender,
//     address: req.body.address,
//     specialization: req.body.specialization,
//     qualification: req.body.qualification,
//     registrationNumber: req.body.registrationNumber,
//     experience: req.body.experience,
//     consultationFee: req.body.consultationFee,
//     about: req.body.about,
//     availableDays: req.body.availableDays,
//     clinicName: req.body.clinicName,
//     clinicType: req.body.clinicType,
//     clinicAddress: req.body.clinicAddress,
//     city: req.body.city,
//     state: req.body.state,
//     pincode: req.body.pincode,
//     clinicPhone: req.body.clinicPhone,
//     workingHours: req.body.workingHours,
//     declarationAccepted: req.body.declarationAccepted,
//   });

//   if (req.files?.medicalLicense?.[0]) {
//     doctor.medicalLicense = await uploadFile(
//       req.files.medicalLicense[0],
//       "doctor-documents",
//     );
//   }

//   if (req.files?.identityProof?.[0]) {
//     doctor.identityProof = await uploadFile(
//       req.files.identityProof[0],
//       "doctor-documents",
//     );
//   }

//   if (req.files?.degreeCertificate?.[0]) {
//     doctor.degreeCertificate = await uploadFile(
//       req.files.degreeCertificate[0],
//       "doctor-documents",
//     );
//   }

//   if (req.files?.experienceCertificate?.[0]) {
//     doctor.experienceCertificate = await uploadFile(
//       req.files.experienceCertificate[0],
//       "doctor-documents",
//     );
//   }

//   if (req.files?.profilePhoto?.[0]) {
//     doctor.profilePhoto = await uploadFile(
//       req.files.profilePhoto[0],
//       "doctor-documents",
//     );
//   }

//   if (req.files?.clinicImages?.[0]) {
//     doctor.clinicImages = await uploadFile(
//       req.files.clinicImages[0],
//       "doctor-documents",
//     );
//   }

//   await doctor.save();

//   const updatedDoctor = await Doctor.findById(doctor._id).select(
//     "-Password -otp",
//   );

//   return res
//     .status(200)
//     .json(
//       new Apiresponse(
//         200,
//         updatedDoctor,
//         "Doctor documents uploaded successfully",
//       ),
//     );
// });

// export { Doctor_DV };

import Doctor from "../Admin_Models/pattner_model_DoctorDV.js";
import Admin_Async from "../Admin_Utils/Admin_Async.js";
import uploadon_Cloudnary from "../Admin_Utils/cloudnary.js";
import Apiresponse from "../../UTLS/Apiresponse.js";
import ApiError from "../../UTLS/Apierror.js";
import fs from "fs";

const Doctor_DV = Admin_Async(async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);

  const {
    fullName,
    email,
    phone,
    dateOfBirth,
    gender,
    address,
    professionalType,
    specialization,
    highestQualification,
    otherQualification,
    universityOrCollege,
    yearOfGraduation,
    experience,
    registrationNumber,
    registrationCouncil,
    registrationDate,
    consultationFee,
    availableDays,
    about,
    clinicName,
    clinicType,
    clinicAddress,
    city,
    state,
    pincode,
    clinicPhone,
    workingHours,
    declarationAccepted,
  } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const uploadFile = async (file, folder) => {
    if (!file) {
      return null;
    }

    console.log("Uploading file:", file.path);
    console.log("File exists before Cloudinary:", fs.existsSync(file.path));

    const result = await uploadon_Cloudnary(file.path, folder);

    console.log("Cloudinary result:", result);

    if (!result) {
      throw new ApiError(500, "Cloudinary upload failed");
    }

    return {
      url: result,
      fileName: file.originalname,
    };
  };

  const doctor = new Doctor({
    fullName,
    email,
    phone,
    dateOfBirth,
    gender,
    address,
    professionalType,
    specialization,
    highestQualification: highestQualification || req.body.qualification,
    otherQualification,
    universityOrCollege,
    yearOfGraduation,
    experience,
    registration: {
      registrationNumber,
      registrationCouncil,
      registrationDate,
    },
    consultationFee,
    availableDays:
      typeof availableDays === "string"
        ? JSON.parse(availableDays)
        : availableDays,
    about,
    clinic: {
      name: clinicName,
      type: clinicType,
      address: clinicAddress,
      city,
      state,
      pincode,
      phone: clinicPhone,
      workingHours,
    },
    declarationAccepted:
      declarationAccepted === true || declarationAccepted === "true",
  });

  if (req.files?.medicalLicense?.[0]) {
    doctor.documents.medicalLicense = await uploadFile(
      req.files.medicalLicense[0],
      "doctor-documents",
    );
  }

  if (req.files?.identityProof?.[0]) {
    doctor.documents.identityProof = await uploadFile(
      req.files.identityProof[0],
      "doctor-documents",
    );
  }

  if (req.files?.degreeCertificate?.[0]) {
    doctor.documents.degreeCertificate = await uploadFile(
      req.files.degreeCertificate[0],
      "doctor-documents",
    );
  }

  if (req.files?.experienceCertificate?.[0]) {
    doctor.documents.experienceCertificate = await uploadFile(
      req.files.experienceCertificate[0],
      "doctor-documents",
    );
  }

  if (req.files?.profilePhoto?.[0]) {
    doctor.documents.profilePhoto = await uploadFile(
      req.files.profilePhoto[0],
      "doctor-documents",
    );

    doctor.profilePhoto = doctor.documents.profilePhoto;
  }

  if (req.files?.clinicImages?.length) {
    doctor.documents.clinicImages = [];

    for (const file of req.files.clinicImages) {
      const uploadedFile = await uploadFile(file, "doctor-documents");

      doctor.documents.clinicImages.push(uploadedFile);
    }
  }

  try {
    await doctor.save();
    console.log("DOCTOR SAVED SUCCESSFULLY:", doctor._id);
  } catch (error) {
    console.error("DOCTOR SAVE ERROR:", error);
    throw error;
  }

  const updatedDoctor = await Doctor.findById(doctor._id).select(
    "-Password -otp",
  );

  return res
    .status(200)
    .json(
      new Apiresponse(
        200,
        updatedDoctor,
        "Doctor documents uploaded successfully",
      ),
    );
});

export { Doctor_DV };
