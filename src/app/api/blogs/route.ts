import dbConnect from "@/lib/mongoose";
import BlogPost from "@/models/BlogPost";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const featured = searchParams.get("featured");

    const skip = (page - 1) * limit;

    const query: { featured?: boolean } = {};

    if (featured === "true") {
      query.featured = true;
    }

    const blogs = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalBlogs = await BlogPost.countDocuments(query);

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalBlogs / limit),
        totalItems: totalBlogs,
      },
    });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
