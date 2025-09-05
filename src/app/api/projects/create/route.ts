import dbConnect from "@/lib/mongoose";
import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Parse the request body
    const body = await request.json();

    // Validate required fields
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!body.slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    if (!body.description) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }
    if (!body.excerpt) {
      return NextResponse.json(
        { error: "Excerpt is required" },
        { status: 400 }
      );
    }
    if (!body.coverImage) {
      return NextResponse.json(
        { error: "Cover image is required" },
        { status: 400 }
      );
    }
    if (!body.client) {
      return NextResponse.json(
        { error: "Client is required" },
        { status: 400 }
      );
    }

    // Check if a project with the same slug already exists
    const existingProject = await Project.findOne({ slug: body.slug });
    if (existingProject) {
      return NextResponse.json(
        { error: "A project with this slug already exists" },
        { status: 409 }
      );
    }

    // Create the project
    const project = await Project.create(body);

    // Return the created project
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
