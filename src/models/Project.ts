import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  coverImage: string;
  gallery: string[];
  client: string;
  technologies: string[];
  features: string[];
  process: {
    title: string;
    description: string;
    image?: string;
  }[];
  results: {
    title: string;
    value: string;
    icon?: string;
  }[];
  testimonial?: {
    content: string;
    author: string;
    position: string;
    image?: string;
  };
  duration: string;
  industry: string;
  team: string[];
  challenge: string;
  solution: string;
  implementation: string;
  live?: string; // Optional live project URL
  publishedAt: Date;
  updatedAt: Date;
  featured: boolean;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    excerpt: { type: String, required: true },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    client: { type: String, required: true },
    technologies: [{ type: String }],
    features: [{ type: String }],
    process: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String },
      },
    ],
    results: [
      {
        title: { type: String, required: true },
        value: { type: String, required: true },
        icon: { type: String },
      },
    ],
    testimonial: {
      content: { type: String },
      author: { type: String },
      position: { type: String },
      image: { type: String },
    },
    duration: { type: String, default: "3 months" },
    industry: { type: String, default: "Technology" },
    team: [{ type: String }],
    challenge: { type: String },
    solution: { type: String },
    implementation: { type: String },
    live: { type: String }, // Optional live project URL
    publishedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Check if the model is already defined to prevent OverwriteModelError in development with hot reloading
export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
