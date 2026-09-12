import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
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
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    profilePhoto: {
      url: String,
      publicId: String,
    },

    professionalType: {
      type: String,
      enum: ["Doctor", "Physiotherapist"],
      default: "Doctor",
      required: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    highestQualification: {
      type: String,
      required: true,
      trim: true,
    },

    otherQualification: {
      type: String,
      trim: true,
    },

    universityOrCollege: {
      type: String,
      trim: true,
    },

    yearOfGraduation: {
      type: Number,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    registration: {
      registrationNumber: {
        type: String,
        required: true,
        trim: true,
      },

      registrationCouncil: {
        type: String,
        trim: true,
      },

      registrationDate: {
        type: Date,
      },
    },

    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },

    availableDays: [
      {
        type: String,
        enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],

    about: {
      type: String,
      trim: true,
    },

    clinic: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      type: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      pincode: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        trim: true,
      },

      workingHours: {
        type: String,
        trim: true,
      },
    },

    documents: {
      medicalLicense: {
        url: String,
        publicId: String,
        fileName: String,
      },

      identityProof: {
        url: String,
        publicId: String,
        fileName: String,
      },

      degreeCertificate: {
        url: String,
        publicId: String,
        fileName: String,
      },

      experienceCertificate: {
        url: String,
        publicId: String,
        fileName: String,
      },

      profilePhoto: {
        url: String,
        publicId: String,
        fileName: String,
      },

      clinicImages: [
        {
          url: String,
          publicId: String,
          fileName: String,
        },
      ],

      additionalQualifications: [
        {
          name: String,
          url: String,
          publicId: String,
          fileName: String,
        },
      ],

      otherCertificates: [
        {
          name: String,
          url: String,
          publicId: String,
          fileName: String,
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
