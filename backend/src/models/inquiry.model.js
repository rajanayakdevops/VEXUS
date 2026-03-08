import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: String,

    email: String,

    company: String,

    description: String,

    budget: String,

    timeline: String,

    attachment: String,

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Inquiry = mongoose.model("Inquiry", inquirySchema);
