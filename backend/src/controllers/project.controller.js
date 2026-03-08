import { Project } from "../models/project.model.js";

export const getProjects = async (req, res) => {
  const projects = await Project.find({
    status: "portfolio",
  }).sort({ createdAt: -1 });

  res.json(projects);
};

// ACTIVE PROJECTS
export const getActiveProjects = async (req, res) => {
  const projects = await Project.find({ status: "active" });

  res.json(projects);
};

// COMPLETE PROJECT
export const completeProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.status = "completed";
    project.completedAt = new Date();

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUBLISH TO PORTFOLIO
export const publishProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findByIdAndUpdate(
    id,

    { status: "portfolio" },

    { returnDocument: "after" },
  );

  res.json(project);
};

export const updateProjectProgress = async (req, res) => {
  const { id } = req.params;

  const { progress } = req.body;

  const project = await Project.findByIdAndUpdate(
    id,

    { progress },

    { returnDocument: "after" },
  );

  res.json(project);
};

export const getProjectBySlug = async (req, res) => {
  const { slug } = req.params;

  const project = await Project.findOne({ slug });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(project);
};

export const getCompletedProjects = async (req, res) => {
  const projects = await Project.find({
    status: "completed",
  }).sort({ createdAt: -1 });

  res.json(projects);
};
