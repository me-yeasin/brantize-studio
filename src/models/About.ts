import mongoose, { Document, Schema } from "mongoose";

export interface IAbout extends Document {
  paragraphs: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

const AboutSchema: Schema = new Schema(
  {
    paragraphs: {
      type: [String],
      required: true,
      default: [
        "We are a team of AI specialists, data scientists, and developers passionate about creating intelligent solutions that transform how businesses operate.",
        "Founded in 2020, we have helped over 50 companies integrate AI into their workflows, resulting in increased efficiency, reduced costs, and improved customer experiences.",
        "Our approach combines cutting-edge AI technology with deep industry knowledge to deliver solutions that are not only innovative but also practical and effective.",
      ],
    },
    stats: {
      type: [
        {
          label: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
      required: true,
      default: [
        { label: "Happy Clients", value: "50+" },
        { label: "AI Agents Created", value: "100+" },
        { label: "Client Satisfaction", value: "98%" },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.About ||
  mongoose.model<IAbout>("About", AboutSchema);
