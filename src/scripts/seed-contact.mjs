import mongoose from "mongoose";
import dbConnect from "../lib/mongoose";
import ContactInfo from "../models/ContactInfo";

async function seedContactData() {
  try {
    await dbConnect();

    // Check if Contact info already exists
    const existingData = await ContactInfo.findOne();

    if (existingData) {
      console.log("Contact info already exists in the database");
      return;
    }

    // Create default Contact info
    const contactData = {
      description:
        "Our team of AI experts is ready to help you identify opportunities for AI integration in your business and develop custom solutions that deliver real value.",
      email: "hello@neuralforge.ai",
      phone: "+1 (555) 123-4567",
      address: "123 AI Boulevard, Tech City, TC 12345",
      hours: "Mon-Fri: 9am-6pm EST",
    };

    await ContactInfo.create(contactData);
    console.log("Contact info seeded successfully");
  } catch (error) {
    console.error("Error seeding contact data:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedContactData();
