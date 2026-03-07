import mongoose from "mongoose";
import dotenv from "dotenv";
import { Admin } from "../models/admin.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Admin.create({
  email: "admin@vexus.com",
  password: "admin123",
});

console.log("Admin created");

process.exit();
