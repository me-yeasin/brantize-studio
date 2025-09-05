import dbConnect from "@/lib/mongoose";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate the required fields
    if (!data.title || !data.description || !data.icon) {
      return NextResponse.json(
        { error: "Title, description, and icon are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const newService = new Service({
      title: data.title,
      description: data.description,
      icon: data.icon,
      order: data.order || 0,
      active: data.active !== undefined ? data.active : true,
    });

    await newService.save();

    return NextResponse.json(
      { message: "Service created successfully", service: newService },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
