import express from "express";
import {
  createInquiry,
  getInquiries,
  approveInquiry,
} from "../controllers/inquiry.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// client submits project
router.post("/create", upload.single("image"), createInquiry);

// admin see submissions
router.get("/", getInquiries);

// admin approve project
router.post("/approve/:id", approveInquiry);

export default router;
