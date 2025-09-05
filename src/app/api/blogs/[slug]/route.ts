import dbConnect from "@/lib/mongoose";
import BlogPost from "@/models/BlogPost";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;

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
