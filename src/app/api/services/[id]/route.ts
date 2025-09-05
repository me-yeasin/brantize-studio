import dbConnect from "@/lib/mongoose";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// Get a specific service by ID
export async function GET(request: Request, { params }: Params) {
  const { id } = await params; // Await the params to get the id
  try {
    await dbConnect();
    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}

// Update a service
export async function PUT(request: Request, { params }: Params) {
  const { id } = await params; // Await the params to get the id
  try {
    const data = await request.json();
    await dbConnect();

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        title: data.title,
        description: data.description,
        icon: data.icon,
        order: data.order,
        active: data.active,
      },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

// Delete a service
export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params; // Await the params to get the id
  try {
    await dbConnect();
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
