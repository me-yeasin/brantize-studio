import dbConnect from "@/lib/mongoose";
import SocialMedia from "@/models/SocialMedia";
import { NextRequest, NextResponse } from "next/server";

// Get all social media links
export async function GET() {
  try {
    await dbConnect();

    const socialMedia = await SocialMedia.find({ isActive: true }).sort(
      "platform"
    );

    // If no social media links exist, return empty array
    if (socialMedia.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(socialMedia);
  } catch (error) {
    console.error("Error fetching social media links:", error);
    return NextResponse.json(
      { error: "Failed to fetch social media links" },
      { status: 500 }
    );
  }
}

// Add a new social media link
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();

    const socialMedia = await SocialMedia.create(data);
    return NextResponse.json(socialMedia, { status: 201 });
  } catch (error) {
    console.error("Error creating social media link:", error);
    return NextResponse.json(
      { error: "Failed to create social media link" },
      { status: 500 }
    );
  }
}
