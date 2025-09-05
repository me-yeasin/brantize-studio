import mongoose from "mongoose";
import dbConnect from "../lib/mongoose";
import SocialMedia from "../models/SocialMedia";

async function seedSocialMedia() {
  try {
    await dbConnect();

    // Check if social media links already exist
    const existingData = await SocialMedia.find();

    if (existingData.length > 0) {
      console.log("Social media links already exist in the database");
      return;
    }

    // Create default social media links
    const socialMediaLinks = [
      {
        platform: "Twitter",
        url: "https://twitter.com/brandtize",
        isActive: true,
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/company/brandtize",
        isActive: true,
      },
      {
        platform: "GitHub",
        url: "https://github.com/brandtize",
        isActive: true,
      },
      {
        platform: "Medium",
        url: "https://medium.com/@brandtize",
        isActive: true,
      },
    ];

    await SocialMedia.insertMany(socialMediaLinks);
    console.log("Social media links seeded successfully");
  } catch (error) {
    console.error("Error seeding social media data:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedSocialMedia();
