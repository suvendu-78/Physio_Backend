// import crypto from "crypto";
// import multer from "multer";
// import path from "path";
// // const crypto = require('crypto')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/temp");
//   },
//   filename: function (req, file, cb) {
//     crypto.randomBytes(16, function (err, raw) {
//       if (err) return cb(err);
//       const uniqueName =
//         file.fieldname +
//         "-" +
//         raw.toString("hex") +
//         path.extname(file.originalname);
//       cb(null, uniqueName);
//     });
//   },
// });

// const upload = multer({ storage: storage });

// export const clinicUpload = upload.fields([
//   { name: "clinicPhotos", maxCount: 5 },
//   { name: "registration", maxCount: 1 },
//   { name: "ownerId", maxCount: 1 },
//   { name: "pan", maxCount: 1 },
//   { name: "gst", maxCount: 1 },
//   { name: "address", maxCount: 1 },
//   { name: "license", maxCount: 1 },
//   { name: "supporting", maxCount: 1 },
// ]);

// export const doctorUpload = upload.fields([
//   { name: "medicalLicense", maxCount: 1 },
//   { name: "identityProof", maxCount: 1 },
//   { name: "degreeCertificate", maxCount: 1 },
//   { name: "experienceCertificate", maxCount: 1 },
//   { name: "profilePhoto", maxCount: 1 },
//   { name: "clinicImages", maxCount: 1 },
// ]);

// export default upload;
import crypto from "crypto";
import multer from "multer";
import path from "path";
import fs from "fs";

const tempDirectory = path.resolve("public", "temp");

if (!fs.existsSync(tempDirectory)) {
  fs.mkdirSync(tempDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDirectory);
  },

  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) {
        return cb(err);
      }

      const uniqueName =
        file.fieldname +
        "-" +
        raw.toString("hex") +
        path.extname(file.originalname);

      cb(null, uniqueName);
    });
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const clinicUpload = upload.fields([
  { name: "clinicPhotos", maxCount: 5 },
  { name: "registration", maxCount: 1 },
  { name: "ownerId", maxCount: 1 },
  { name: "pan", maxCount: 1 },
  { name: "gst", maxCount: 1 },
  { name: "address", maxCount: 1 },
  { name: "license", maxCount: 1 },
  { name: "supporting", maxCount: 1 },
]);

export const doctorUpload = upload.fields([
  { name: "medicalLicense", maxCount: 1 },
  { name: "identityProof", maxCount: 1 },
  { name: "degreeCertificate", maxCount: 1 },
  { name: "experienceCertificate", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
  { name: "clinicImages", maxCount: 1 },
]);

export default upload;
