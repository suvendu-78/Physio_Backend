import Admin_Async from "../Admin_Utils/Admin_Async.js";
import Clinic from "../Admin_Models/pattner_model_ClinicDV.js";
import uploadon_Cloudnary from "../Admin_Utils/cloudnary.js";

// const CliniDv = Admin_Async(async (req, res) => {
//   try {
//     console.log(" CLINIC REQUEST");
//     console.log("BODY:", req.body);
//     console.log("FILES:", req.files);

//     const {
//       clinicName,
//       clinicType,
//       email,
//       phone,
//       address,
//       city,
//       state,
//       pincode,
//       workingDays,
//     } = req.body;

//     const files = req.files || {};

//     const clinicRegistration = files.registration?.[0]
//       ? await uploadon_Cloudnary(
//           files.registration[0].path,
//           "clinic-documents/registration",
//         )
//       : undefined;

//     const ownerId = files.ownerId?.[0]
//       ? await uploadon_Cloudnary(
//           files.ownerId[0].path,
//           "clinic-documents/ownerId",
//         )
//       : undefined;

//     const addressProof = files.address?.[0]
//       ? await uploadon_Cloudnary(
//           files.address[0].path,
//           "clinic-documents/address",
//         )
//       : undefined;

//     const applicableLicense = files.license?.[0]
//       ? await uploadon_Cloudnary(
//           files.license[0].path,
//           "clinic-documents/license",
//         )
//       : undefined;

//     const pan = files.pan?.[0]
//       ? await uploadon_Cloudnary(files.pan[0].path, "clinic-documents/pan")
//       : undefined;

//     const gst = files.gst?.[0]
//       ? await uploadon_Cloudnary(files.gst[0].path, "clinic-documents/gst")
//       : undefined;

//     const biomedicalWasteAuthorization = files.supporting?.[0]
//       ? await uploadon_Cloudnary(
//           files.supporting[0].path,
//           "clinic-documents/supporting",
//         )
//       : undefined;

//     const photos = [];

//     if (files.clinicPhotos?.length) {
//       for (const file of files.clinicPhotos) {
//         const photoUrl = await uploadon_Cloudnary(
//           file.path,
//           "clinic-documents/photos",
//         );

//         photos.push({
//           url: photoUrl,
//         });
//       }
//     }

//     let parsedWorkingHours = [];

//     if (workingDays) {
//       try {
//         const parsedDays =
//           typeof workingDays === "string"
//             ? JSON.parse(workingDays)
//             : workingDays;

//         parsedWorkingHours = Object.entries(parsedDays).map(([day, data]) => ({
//           day,
//           enabled: Boolean(data.open),
//           open: data.open ? data.from : "",
//           close: data.open ? data.to : "",
//         }));
//       } catch (error) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid workingDays format",
//         });
//       }
//     }

//     console.log("DATA BEFORE MONGODB ");

//     const clinicData = {
//       clinicName,
//       clinicType,
//       email,
//       phone,
//       address,
//       city,
//       state,
//       pincode,

//       documents: {
//         clinicRegistration: clinicRegistration
//           ? { url: clinicRegistration }
//           : undefined,

//         ownerId: ownerId ? { url: ownerId } : undefined,

//         addressProof: addressProof ? { url: addressProof } : undefined,

//         applicableLicense: applicableLicense
//           ? { url: applicableLicense }
//           : undefined,

//         pan: pan ? { url: pan } : undefined,

//         gst: gst ? { url: gst } : undefined,

//         biomedicalWasteAuthorization: biomedicalWasteAuthorization
//           ? { url: biomedicalWasteAuthorization }
//           : undefined,
//       },

//       photos,

//       workingHours: parsedWorkingHours,

//       verificationStatus: "pending",

//       isActive: false,
//     };

//     console.log("CLINIC DATA:", clinicData);

//     const clinic = await Clinic.create(clinicData);

//     console.log(" MONGODB SUCCESS ");
//     console.log("CREATED CLINIC:", clinic);

//     return res.status(201).json({
//       success: true,
//       message: "Clinic profile submitted successfully",
//       data: clinic,
//     });
//   } catch (error) {
//     console.log("NAME:", error.name);
//     console.log("MESSAGE:", error.message);
//     console.log("ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

const CliniDv = Admin_Async(async (req, res) => {
  try {
    console.log("CLINIC REQUEST");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      clinicName,
      clinicType,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      workingDays,
    } = req.body;

    if (!clinicName) {
      return res.status(400).json({
        success: false,
        message: "Clinic name is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone is required",
      });
    }

    const files = req.files || {};

    const uploadFile = async (file, folder) => {
      if (!file) {
        return null;
      }

      const result = await uploadon_Cloudnary(file.path, folder);

      if (typeof result === "string") {
        return result;
      }

      if (result?.secure_url) {
        return result.secure_url;
      }

      if (result?.url) {
        return result.url;
      }

      throw new Error(`Cloudinary upload failed for ${file.originalname}`);
    };

    const clinicRegistration = await uploadFile(
      files.registration?.[0],
      "clinic-documents/registration",
    );

    const ownerId = await uploadFile(
      files.ownerId?.[0],
      "clinic-documents/ownerId",
    );

    const addressProof = await uploadFile(
      files.address?.[0],
      "clinic-documents/address",
    );

    const applicableLicense = await uploadFile(
      files.license?.[0],
      "clinic-documents/license",
    );

    const pan = await uploadFile(files.pan?.[0], "clinic-documents/pan");

    const gst = await uploadFile(files.gst?.[0], "clinic-documents/gst");

    const biomedicalWasteAuthorization = await uploadFile(
      files.supporting?.[0],
      "clinic-documents/supporting",
    );

    const photos = [];

    if (files.clinicPhotos?.length) {
      for (const file of files.clinicPhotos) {
        const photoUrl = await uploadFile(file, "clinic-documents/photos");

        if (photoUrl) {
          photos.push({
            url: photoUrl,
          });
        }
      }
    }

    let parsedWorkingHours = [];

    if (workingDays) {
      try {
        const parsedDays =
          typeof workingDays === "string"
            ? JSON.parse(workingDays)
            : workingDays;

        parsedWorkingHours = Object.entries(parsedDays).map(([day, data]) => ({
          day,
          enabled: Boolean(data?.open),
          open: data?.open ? data.from : "",
          close: data?.open ? data.to : "",
        }));
      } catch (error) {
        console.error("WORKING DAYS ERROR:", error);

        return res.status(400).json({
          success: false,
          message: "Invalid workingDays format",
        });
      }
    }

    const clinicData = {
      clinicName,
      clinicType,
      email,
      phone,
      address,
      city,
      state,
      pincode,

      documents: {
        clinicRegistration: clinicRegistration
          ? {
              url: clinicRegistration,
            }
          : undefined,

        ownerId: ownerId
          ? {
              url: ownerId,
            }
          : undefined,

        addressProof: addressProof
          ? {
              url: addressProof,
            }
          : undefined,

        applicableLicense: applicableLicense
          ? {
              url: applicableLicense,
            }
          : undefined,

        pan: pan
          ? {
              url: pan,
            }
          : undefined,

        gst: gst
          ? {
              url: gst,
            }
          : undefined,

        biomedicalWasteAuthorization: biomedicalWasteAuthorization
          ? {
              url: biomedicalWasteAuthorization,
            }
          : undefined,
      },

      photos,

      workingHours: parsedWorkingHours,

      verificationStatus: "pending",

      isActive: false,
    };

    console.log("DATA BEFORE MONGODB:", JSON.stringify(clinicData, null, 2));

    const clinic = await Clinic.create(clinicData);

    console.log("MONGODB SUCCESS:", clinic._id);

    return res.status(201).json({
      success: true,
      message: "Clinic profile submitted successfully",
      data: clinic,
    });
  } catch (error) {
    console.error("CLINIC DV ERROR:", error);
    console.error("NAME:", error.name);
    console.error("MESSAGE:", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(error.errors).map((err) => ({
          field: err.path,
          message: err.message,
        })),
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate data already exists",
        field: Object.keys(error.keyPattern || {}),
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
});

const UpdateClinicVerification = Admin_Async(async (req, res) => {
  try {
    const { id } = req.params;
    const { action, message } = req.body;

    const clinic = await Clinic.findById(id);

    if (!clinic) {
      return res.status(404).json({
        success: false,
        message: "Clinic not found",
      });
    }

    if (action === "approve") {
      clinic.verificationStatus = "approved";
      clinic.isActive = true;
    } else if (action === "reject") {
      clinic.verificationStatus = "rejected";
      clinic.isActive = false;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid action",
      });
    }

    await clinic.save();

    return res.status(200).json({
      success: true,
      message:
        action === "approve"
          ? "Clinic approved successfully"
          : "Clinic rejected successfully",
      data: clinic,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export { CliniDv, UpdateClinicVerification };
