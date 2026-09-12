import Admin_Async from "../Admin_Utils/Admin_Async.js";
import Clinic from "../Admin_Models/pattner_model_ClinicDV.js";
import uploadon_Cloudnary from "../Admin_Utils/cloudnary.js";

const CliniDv = Admin_Async(async (req, res) => {
  try {
    console.log(" CLINIC REQUEST");
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

    const files = req.files || {};

    const clinicRegistration = files.registration?.[0]
      ? await uploadon_Cloudnary(
          files.registration[0].path,
          "clinic-documents/registration",
        )
      : undefined;

    const ownerId = files.ownerId?.[0]
      ? await uploadon_Cloudnary(
          files.ownerId[0].path,
          "clinic-documents/ownerId",
        )
      : undefined;

    const addressProof = files.address?.[0]
      ? await uploadon_Cloudnary(
          files.address[0].path,
          "clinic-documents/address",
        )
      : undefined;

    const applicableLicense = files.license?.[0]
      ? await uploadon_Cloudnary(
          files.license[0].path,
          "clinic-documents/license",
        )
      : undefined;

    const pan = files.pan?.[0]
      ? await uploadon_Cloudnary(files.pan[0].path, "clinic-documents/pan")
      : undefined;

    const gst = files.gst?.[0]
      ? await uploadon_Cloudnary(files.gst[0].path, "clinic-documents/gst")
      : undefined;

    const biomedicalWasteAuthorization = files.supporting?.[0]
      ? await uploadon_Cloudnary(
          files.supporting[0].path,
          "clinic-documents/supporting",
        )
      : undefined;

    const photos = [];

    if (files.clinicPhotos?.length) {
      for (const file of files.clinicPhotos) {
        const photoUrl = await uploadon_Cloudnary(
          file.path,
          "clinic-documents/photos",
        );

        photos.push({
          url: photoUrl,
        });
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
          enabled: Boolean(data.open),
          open: data.open ? data.from : "",
          close: data.open ? data.to : "",
        }));
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid workingDays format",
        });
      }
    }

    console.log("DATA BEFORE MONGODB ");

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
          ? { url: clinicRegistration }
          : undefined,

        ownerId: ownerId ? { url: ownerId } : undefined,

        addressProof: addressProof ? { url: addressProof } : undefined,

        applicableLicense: applicableLicense
          ? { url: applicableLicense }
          : undefined,

        pan: pan ? { url: pan } : undefined,

        gst: gst ? { url: gst } : undefined,

        biomedicalWasteAuthorization: biomedicalWasteAuthorization
          ? { url: biomedicalWasteAuthorization }
          : undefined,
      },

      photos,

      workingHours: parsedWorkingHours,

      verificationStatus: "pending",

      isActive: false,
    };

    console.log("CLINIC DATA:", clinicData);

    const clinic = await Clinic.create(clinicData);

    console.log(" MONGODB SUCCESS ");
    console.log("CREATED CLINIC:", clinic);

    return res.status(201).json({
      success: true,
      message: "Clinic profile submitted successfully",
      data: clinic,
    });
  } catch (error) {
    console.log("NAME:", error.name);
    console.log("MESSAGE:", error.message);
    console.log("ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export { CliniDv };
