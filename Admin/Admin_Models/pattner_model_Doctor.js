import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    profilePhoto: {
      url: String,
      publicId: String,
    },

    professionalType: {
      type: String,
      enum: ["Physiotherapist"],
      default: "Physiotherapist",
      required: true,
    },

    highestQualification: {
      type: String,
      enum: ["BPT", "MPT", "Other"],
      required: true,
    },

    otherQualification: {
      type: String,
      trim: true,
    },

    specialization: {
      type: String,
      trim: true,
    },

    universityOrCollege: {
      type: String,
      required: true,
      trim: true,
    },

    yearOfGraduation: {
      type: Number,
      required: true,
    },

    registration: {
      registrationNumber: {
        type: String,
        required: true,
        trim: true,
      },

      registrationCouncil: {
        type: String,
        required: true,
        trim: true,
      },

      registrationDate: {
        type: Date,
      },
    },

    documents: {
      degreeCertificate: {
        url: String,
        publicId: String,
      },

      registrationCertificate: {
        url: String,
        publicId: String,
      },

      governmentId: {
        url: String,
        publicId: String,
      },

      additionalQualifications: [
        {
          name: String,
          url: String,
          publicId: String,
        },
      ],

      experienceCertificate: [
        {
          name: String,
          url: String,
          publicId: String,
        },
      ],

      otherCertificates: [
        {
          name: String,
          url: String,
          publicId: String,
        },
      ],
    },

    declarationAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      trim: true,
    },

    verifiedAt: {
      type: Date,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
