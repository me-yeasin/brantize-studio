import dbConnect from "@/lib/mongoose";
import SocialMedia from "@/models/SocialMedia";
import { NextRequest, NextResponse } from "next/server";

// Get specific social media link
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await dbConnect();

    const socialMedia = await SocialMedia.findById(id);

    if (!socialMedia) {
      return NextResponse.json(
        { error: "Social media link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(socialMedia);
  } catch (error) {
    console.error(`Error fetching social media link ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch social media link" },
      { status: 500 }
    );
  }
}

// Update a social media link
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await dbConnect();
    const data = await request.json();

    const socialMedia = await SocialMedia.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!socialMedia) {
      return NextResponse.json(
        { error: "Social media link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(socialMedia);
  } catch (error) {
    console.error(`Error updating social media link ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to update social media link" },
      { status: 500 }
    );
  }
}

// Delete a social media link
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await dbConnect();

    const socialMedia = await SocialMedia.findByIdAndDelete(id);

    if (!socialMedia) {
      return NextResponse.json(
        { error: "Social media link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Social media link deleted successfully",
    });
  } catch (error) {
    console.error(`Error deleting social media link ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to delete social media link" },
      { status: 500 }
    );
  }
}
