import mongoose, { Document, Schema } from "mongoose";

export interface IContactInfo extends Document {
  description: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
}

const ContactInfoSchema: Schema = new Schema(
  {
    description: {
      type: String,
      required: true,
      default:
        "Our team of AI experts is ready to help you identify opportunities for AI integration in your business and develop custom solutions that deliver real value.",
    },
    email: {
      type: String,
      required: true,
      default: "hello@neuralforge.ai",
    },
    phone: {
      type: String,
      required: true,
      default: "+1 (555) 123-4567",
    },
    address: {
      type: String,
      required: true,
      default: "123 AI Boulevard, Tech City, TC 12345",
    },
    hours: {
      type: String,
      required: true,
      default: "Mon-Fri: 9am-6pm EST",
    },
  },
  { timestamps: true }
);

export default mongoose.models.ContactInfo ||
  mongoose.model<IContactInfo>("ContactInfo", ContactInfoSchema);
