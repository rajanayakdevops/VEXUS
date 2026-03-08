import mongoose from "mongoose";
import dotenv from "dotenv";
import { Project } from "../models/project.model.js";

dotenv.config();

const projects = [
  {
    title: "Meridian Finance",
    slug: "meridian-finance",
    category: "Fintech",
    summary: "A comprehensive fintech dashboard redesign.",
    tags: ["React", "Node", "D3"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    isPublic: true,
  },

  {
    title: "Nova Healthcare",
    slug: "nova-healthcare",
    category: "Healthcare",
    summary: "Patient portal with real time health monitoring.",
    tags: ["Next.js", "Supabase", "WebRTC"],
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200",
    isPublic: true,
  },

  {
    title: "Apex Commerce",
    slug: "apex-commerce",
    category: "E-Commerce",
    summary: "Luxury ecommerce platform with AI recommendations.",
    tags: ["React", "Stripe", "Three.js"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    isPublic: true,
  },

  {
    title: "Orbit Analytics",
    slug: "orbit-analytics",
    category: "SaaS",
    summary: "Real time analytics dashboard processing millions of events.",
    tags: ["Next.js", "Redis", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    isPublic: true,
  },

  {
    title: "Synapse AI",
    slug: "synapse-ai",
    category: "AI",
    summary: "AI powered productivity suite with automation workflows.",
    tags: ["Python", "OpenAI", "Next.js"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    isPublic: true,
  },
];

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Project.deleteMany();

    console.log("Old projects removed");

    // purane projects delete
    // new projects insert

    // Agar tum delete nahi karna chahte, replace karo: await Project.insertMany(projects)

    await Project.insertMany(projects);

    console.log("Projects seeded successfully");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedProjects();

// node src/seed/seedProjects.js
