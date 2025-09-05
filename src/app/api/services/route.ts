import dbConnect from "@/lib/mongoose";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find({ active: true }).sort({ order: 1 });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
