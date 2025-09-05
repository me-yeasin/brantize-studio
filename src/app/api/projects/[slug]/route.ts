import dbConnect from "@/lib/mongoose";
import Project from "@/models/Project";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface ProjectDocument {
  _id: Types.ObjectId;
  slug: string;
  technologies: string[];
  publishedAt?: Date;
  title: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } | Promise<{ slug: string }> }
) {
  try {
    await dbConnect();

    // Handle both Promise and direct object cases
    const slug = params instanceof Promise ? (await params).slug : params.slug;

    if (!slug) {
      return NextResponse.json(
        { error: "Project slug is required" },
        { status: 400 }
      );
    }

    const project = (await Project.findOne({
      slug,
    }).lean()) as unknown as ProjectDocument;

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Get related projects (same technologies, excluding current project)
    const relatedProjects = (await Project.find({
      _id: { $ne: project._id },
      technologies: { $in: project.technologies || [] },
    })
      .sort({ publishedAt: -1 })
      .limit(3)
      .lean()) as unknown as ProjectDocument[];

    return NextResponse.json({
      project: {
        ...project,
        relatedProjects,
      },
    });
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
