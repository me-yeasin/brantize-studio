import dbConnect from "@/lib/mongoose";
import ContactInfo from "@/models/ContactInfo";
import { NextRequest, NextResponse } from "next/server";

// Get the Contact info
export async function GET() {
  try {
    await dbConnect();

    // Try to get existing contact info
    let contactInfo = await ContactInfo.findOne();

    // If no contact info exists, create default
    if (!contactInfo) {
      contactInfo = await ContactInfo.create({});
    }

    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact info" },
      { status: 500 }
    );
  }
}

// Update the Contact info
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();

    // Find and update the contact info, create if it doesn't exist
    const contactInfo = await ContactInfo.findOneAndUpdate(
      {},
      { $set: data },
      { new: true, upsert: true }
    );

    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error("Error updating contact info:", error);
    return NextResponse.json(
      { error: "Failed to update contact info" },
      { status: 500 }
    );
  }
}
