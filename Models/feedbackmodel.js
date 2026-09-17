import mongoose from "mongoose";

const FeedbacbSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },
    star: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    message: {
      type: String,
      required: true,
    },
    Clinicname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const FeedBack = mongoose.model("Feedback", FeedbacbSchema);
export default FeedBack;
