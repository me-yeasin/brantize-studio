import dbConnect from "@/lib/mongoose";
import BlogPost from "@/models/BlogPost";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const data = await request.json();

    // Validate required fields
    const missingFields = [];
    if (!data.title) missingFields.push("title");
    if (!data.excerpt) missingFields.push("excerpt");
    if (!data.content) missingFields.push("content");
    if (!data.coverImage) missingFields.push("coverImage");
    if (!data.author) missingFields.push("author");
    else if (!data.author.name) missingFields.push("author.name");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingFields.join(", ")}`,
          details: { missingFields },
        },
        { status: 400 }
      );
    }

    // Create the blog post document
    const blogPost = new BlogPost({
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      author: {
        name: data.author.name,
        image: data.author.image || "/images/authors/default.jpg",
      },
      categories: data.categories || [],
      tags: data.tags || [],
      featured: data.featured || false,
      publishedAt: data.publishedAt || new Date(),
      updatedAt: data.updatedAt || new Date(),
    });

    // Save to database
    await blogPost.save();

    return NextResponse.json(
      {
        success: true,
        blog: blogPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog post:", error);

    // Check if it's a duplicate key error (duplicate slug)
    if (
      error instanceof Error &&
      "code" in (error as Error & { code?: number }) &&
      (error as Error & { code: number }).code === 11000
    ) {
      return NextResponse.json(
        {
          error: "A blog post with this slug already exists",
          details: { type: "DuplicateSlugError" },
        },
        { status: 409 }
      );
    }

    // Check for validation errors from Mongoose
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        {
          error: "Validation error in blog post data",
          details: { validationError: error.message },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details:
          error instanceof Error ? { message: error.message } : undefined,
      },
      { status: 500 }
    );
  }
}
