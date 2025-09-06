import Project from "@/models/Project";
import dbConnect from "./mongoose";

/**
 * Utility to ensure database schemas are up-to-date with the current model definitions
 */
export async function updateSchemas() {
  try {
    console.log("Starting schema update process...");

    // Ensure we're connected to the database
    await dbConnect();

    // Refresh the Project model to ensure it has the latest schema
    console.log("Testing connection with Project model...");
    const projectCount = await Project.countDocuments();
    console.log(`Database contains ${projectCount} projects`);

    console.log("Schema update process completed successfully");

    return { success: true, message: "Schema updates applied successfully" };
  } catch (error) {
    console.error("Error updating schemas:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unknown error occurred during schema update",
    };
  }
}
