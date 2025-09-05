import mongoose, { Document, Schema } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Check if the model is already defined to prevent OverwriteModelError in development with hot reloading
export default mongoose.models.Service ||
  mongoose.model<IService>("Service", ServiceSchema);
