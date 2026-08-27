import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    Type: {
      type: String,
      requery: true,
    },
    Date: {
      type: Number,
      required: true,
    },
    Time: {
      type: Number,
      required: true,
    },
    FullName: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },
    Number: {
      type: Number,
      required: true,
    },
    Problem: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Booking = mongoose.model("Booking", BookingSchema);
