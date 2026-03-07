import express from "express";

import {
  getProjects,
  getActiveProjects,
  completeProject,
  publishProject,
  updateProjectProgress,
  getProjectBySlug,
  getCompletedProjects,
} from "../controllers/project.controller.js";

import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = express.Router();

router.get("/", getProjects);

router.get("/active", verifyAdmin, getActiveProjects);

router.get("/completed", verifyAdmin, getCompletedProjects);

router.post("/complete/:id", verifyAdmin, completeProject);

router.post("/publish/:id", verifyAdmin, publishProject);

router.post("/progress/:id", verifyAdmin, updateProjectProgress);

router.get("/track/:slug",getProjectBySlug)

export default router;
