import dbConnect from "@/lib/mongoose";
import About from "@/models/About";
import { NextRequest, NextResponse } from "next/server";

// Get the About data
export async function GET() {
  try {
    await dbConnect();

    // Try to get existing about data
    let about = await About.findOne();

    // If no about data exists, create default
    if (!about) {
      about = await About.create({});
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error fetching about data:", error);
    return NextResponse.json(
      { error: "Failed to fetch about data" },
      { status: 500 }
    );
  }
}

// Update the About data
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();

    // Find and update the about data, create if it doesn't exist
    const about = await About.findOneAndUpdate(
      {},
      { $set: data },
      { new: true, upsert: true }
    );

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error updating about data:", error);
    return NextResponse.json(
      { error: "Failed to update about data" },
      { status: 500 }
    );
  }
}
