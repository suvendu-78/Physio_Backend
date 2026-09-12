// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.Cloudnary_Name,
//   api_key: process.env.API_Key,
//   api_secret: process.env.API_Secret,
// });

// console.log("Cloud Name:", process.env.Cloudnary_Name);
// console.log("API Key exists:", !!process.env.API_Key);
// console.log("API Secret exists:", !!process.env.API_Secret);
// const uploadon_Cloudnary = async (
//   localfilepath,
//   folder = "doctor-documents",
// ) => {
//   try {
//     if (!localfilepath) {
//       return null;
//     }

//     if (!fs.existsSync(localfilepath)) {
//       console.log("Local file not found:", localfilepath);
//       return null;
//     }

//     const file_response = await cloudinary.uploader.upload(localfilepath, {
//       resource_type: "auto",
//       folder,
//     });

//     console.log("File uploaded on Cloudinary:", file_response.secure_url);

//     if (fs.existsSync(localfilepath)) {
//       fs.unlinkSync(localfilepath);
//     }

//     return file_response.secure_url;
//   } catch (error) {
//     console.log("Cloudinary upload error:", error);

//     if (localfilepath && fs.existsSync(localfilepath)) {
//       fs.unlinkSync(localfilepath);
//     }

//     return null;
//   }
// };

// export default uploadon_Cloudnary;

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.Cloudnary_Name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
});

console.log("Cloud Name:", process.env.Cloudnary_Name);
console.log("API Key exists:", !!process.env.API_Key);
console.log("API Secret exists:", !!process.env.API_Secret);

const uploadon_Cloudnary = async (
  localfilepath,
  folder = "doctor-documents",
) => {
  try {
    if (!localfilepath) {
      throw new Error("Local file path is missing");
    }

    console.log("UPLOAD STARTED:", localfilepath);
    console.log("FILE EXISTS:", fs.existsSync(localfilepath));

    if (!fs.existsSync(localfilepath)) {
      throw new Error(`Local file not found: ${localfilepath}`);
    }

    const file_response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
      folder,
    });

    console.log("CLOUDINARY SUCCESS:", file_response.secure_url);

    if (fs.existsSync(localfilepath)) {
      fs.unlinkSync(localfilepath);
      console.log("TEMP FILE DELETED:", localfilepath);
    }

    return file_response.secure_url;
  } catch (error) {
    console.log("========== CLOUDINARY ERROR ==========");
    console.log(error);
    console.log("======================================");

    if (localfilepath && fs.existsSync(localfilepath)) {
      fs.unlinkSync(localfilepath);
      console.log("TEMP FILE DELETED AFTER ERROR");
    }

    throw error;
  }
};

export default uploadon_Cloudnary;
