import { Inquiry } from "../models/inquiry.model.js";
import { Project } from "../models/project.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createInquiry = async (req, res) => {
  try {
    const { name, email, company, description, budget, timeline } = req.body;

    let imageUrl = "";

    if (req.file) {
      const upload = await uploadOnCloudinary(req.file.path);

      imageUrl = upload.secure_url;
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      company,
      description,
      budget,
      timeline,
      attachment: imageUrl,
    });

    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getInquiries = async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });

  res.json(inquiries);
};

export const approveInquiry = async (req, res) => {
  const { id } = req.params;

  const inquiry = await Inquiry.findById(id);

  if (!inquiry) {
    return res.status(404).json({ message: "Inquiry not found" });
  }

  const slug =
    inquiry.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

  const project = await Project.create({
    title: inquiry.name,
    slug,
    clientName: inquiry.name,
    description: inquiry.description,
    image: inquiry.attachment,
    category: "Client Project",
    tags: ["Client"],
    status: "active",
  });

  inquiry.status = "approved";

  await inquiry.save();

  res.json(project);
};
