import mongoose, { Document, Schema } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    image: string;
  };
  categories: string[];
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  featured: boolean;
}

const BlogPostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    coverImage: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      image: { type: String, required: true },
    },
    categories: [{ type: String }],
    tags: [{ type: String }],
    publishedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Check if the model is already defined to prevent OverwriteModelError in development with hot reloading
export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
