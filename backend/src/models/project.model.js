import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    clientName: {
      type: String,
    },

    category: {
      type: String,
    },

    description: {
      type: String,
    },

    image: {
      type: String,
    },

    tags: [String],

    status: {
      type: String,
      enum: ["active", "completed", "portfolio"],
      default: "active",
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
    },

    progress: {
      type: String,
      enum: ["planning", "design", "development", "testing", "delivered"],
      default: "planning",
    },
  },
  { timestamps: true },
);

export const Project = mongoose.model("Project", projectSchema);
