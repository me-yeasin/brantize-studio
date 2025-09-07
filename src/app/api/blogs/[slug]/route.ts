import dbConnect from "@/lib/mongoose";
import BlogPost from "@/models/BlogPost";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await dbConnect();

    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter is required" },
        { status: 400 }
      );
    }

    // Find the blog post by slug
    const blog = await BlogPost.findOne({ slug }).lean();

    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Handle blog as a record type and safely get categories
    const blogAsRecord = blog as Record<string, unknown>;
    const categories = Array.isArray(blogAsRecord.categories)
      ? blogAsRecord.categories
      : [];

    // Fetch 3 related blog posts (excluding current one)
    // Either related by matching at least one category or just get the most recent posts
    const relatedPosts =
      categories.length > 0
        ? await BlogPost.find({
            slug: { $ne: slug },
            categories: { $in: categories as string[] },
          })
            .sort({ publishedAt: -1 })
            .limit(3)
            .lean()
        : await BlogPost.find({
            slug: { $ne: slug },
          })
            .sort({ publishedAt: -1 })
            .limit(3)
            .lean();

    return NextResponse.json({
      blog: {
        ...(blog as Record<string, unknown>),
        relatedPosts,
      },
    });
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await dbConnect();
    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter is required" },
        { status: 400 }
      );
    }

    // Find and delete the blog post
    const deletedBlog = await BlogPost.findOneAndDelete({ slug });

    if (!deletedBlog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await dbConnect();
    // Handle both Promise and direct object cases
    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter is required" },
        { status: 400 }
      );
    }

    // Get the updated data from request body
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

    // Find the blog post by slug
    const blog = await BlogPost.findOne({ slug });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Update the blog post
    blog.title = data.title;
    blog.excerpt = data.excerpt;
    blog.content = data.content;
    blog.coverImage = data.coverImage;
    blog.author = {
      name: data.author.name,
      image: data.author.image || "/images/authors/default.jpg",
    };
    blog.categories = data.categories || [];
    blog.tags = data.tags || [];
    blog.featured = data.featured || false;
    blog.readTime = data.readTime || "";
    blog.updatedAt = new Date();

    // Save the updated blog post
    await blog.save();

    return NextResponse.json({
      success: true,
      blog,
      message: "Blog post updated successfully",
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
