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
        "Rehabilitation Clinic",
        "Multispecialty Clinic",
        "Sports Rehabilitation Clinic",
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

    documents: {
      clinicRegistration: {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },

      ownerId: {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },

      addressProof: {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },

      applicableLicense: {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },

      biomedicalWasteAuthorization: {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },

      pan: {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },

      gst: {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },

      businessRegistration: {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },

      other: [
        {
          name: {
            type: String,
            trim: true,
          },
          url: {
            type: String,
          },
          publicId: {
            type: String,
          },
        },
      ],
    },

    photos: [
      {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },
    ],

    workingHours: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          required: true,
        },

        enabled: {
          type: Boolean,
          default: false,
        },

        open: {
          type: String,
        },

        close: {
          type: String,
        },
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
  {
    timestamps: true,
  },
);

const Clinic = mongoose.model("Clinic", ClinicSchema);

export default Clinic;
