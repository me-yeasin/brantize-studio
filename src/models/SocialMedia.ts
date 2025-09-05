import mongoose, { Document, Schema } from "mongoose";

export interface ISocialMedia extends Document {
  platform: string;
  url: string;
  isActive: boolean;
}

const SocialMediaSchema: Schema = new Schema(
  {
    platform: {
      type: String,
      required: true,
      enum: [
        "Twitter",
        "LinkedIn",
        "GitHub",
        "Medium",
        "Instagram",
        "Facebook",
        "YouTube",
      ],
    },
    url: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.SocialMedia ||
  mongoose.model<ISocialMedia>("SocialMedia", SocialMediaSchema);
