import mongoose from "mongoose";

const ClinicSchema = new mongoose.Schema(
  {
    clinicName: {
      type: String,
      required: true,
      trim: true,
    },

    clinicType: {
      type: String,
      enum: [
        "Physiotherapy Clinic",
        "Rehabilitation Center",
        "Multi-speciality Clinic",
        "Other",
      ],
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    yearEstablished: {
      type: Number,
    },

    address: {
      addressLine: {
        type: String,
        required: true,
        trim: true,
      },

      area: {
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

      location: {
        latitude: Number,
        longitude: Number,
      },
    },

    owner: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      designation: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
    },

    registration: {
      registrationNumber: {
        type: String,
        trim: true,
      },

      registrationAuthority: {
        type: String,
        trim: true,
      },

      issueDate: {
        type: Date,
      },

      expiryDate: {
        type: Date,
      },
    },

    documents: {
      clinicRegistration: {
        url: String,
        publicId: String,
      },

      ownerId: {
        url: String,
        publicId: String,
      },

      addressProof: {
        url: String,
        publicId: String,
      },

      applicableLicense: {
        url: String,
        publicId: String,
      },

      biomedicalWasteAuthorization: {
        url: String,
        publicId: String,
      },

      pan: {
        url: String,
        publicId: String,
      },

      gst: {
        url: String,
        publicId: String,
      },

      businessRegistration: {
        url: String,
        publicId: String,
      },

      other: [
        {
          name: String,
          url: String,
          publicId: String,
        },
      ],
    },

    photos: [
      {
        url: String,
        publicId: String,
      },
    ],

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
  { timestamps: true },
);

const Clinic = mongoose.model("Clinic", ClinicSchema);
export default Clinic;
