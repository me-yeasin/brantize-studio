import mongoose from "mongoose";
import dbConnect from "../lib/mongoose";
import About from "../models/About";

async function seedAboutData() {
  try {
    await dbConnect();

    // Check if About data already exists
    const existingData = await About.findOne();

    if (existingData) {
      console.log("About data already exists in the database");
      return;
    }

    // Create default About data
    const aboutData = {
      paragraphs: [
        "We are a team of AI specialists, data scientists, and developers passionate about creating intelligent solutions that transform how businesses operate.",
        "Founded in 2020, we have helped over 50 companies integrate AI into their workflows, resulting in increased efficiency, reduced costs, and improved customer experiences.",
        "Our approach combines cutting-edge AI technology with deep industry knowledge to deliver solutions that are not only innovative but also practical and effective.",
      ],
      stats: [
        { label: "Happy Clients", value: "50+" },
        { label: "AI Agents Created", value: "100+" },
        { label: "Client Satisfaction", value: "98%" },
      ],
    };

    await About.create(aboutData);
    console.log("About data seeded successfully");
  } catch (error) {
    console.error("Error seeding about data:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedAboutData();
