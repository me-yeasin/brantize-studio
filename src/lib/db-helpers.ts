import dbConnect from "@/lib/mongoose";
import BlogPost from "@/models/BlogPost";
import Project from "@/models/Project";

export async function getBlogStats() {
  await dbConnect();

  const totalBlogs = await BlogPost.countDocuments({});
  const featuredBlogs = await BlogPost.countDocuments({ featured: true });
  const recentBlogs = await BlogPost.countDocuments({
    publishedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  });

  return {
    total: totalBlogs,
    featured: featuredBlogs,
    recent: recentBlogs,
  };
}

export async function getProjectStats() {
  await dbConnect();

  const totalProjects = await Project.countDocuments({});
  const featuredProjects = await Project.countDocuments({ featured: true });
  const recentProjects = await Project.countDocuments({
    publishedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  });

  return {
    total: totalProjects,
    featured: featuredProjects,
    recent: recentProjects,
  };
}

export async function getRecentBlogs(limit = 5) {
  await dbConnect();

  return await BlogPost.find({}).sort({ publishedAt: -1 }).limit(limit).lean();
}

export async function getRecentProjects(limit = 5) {
  await dbConnect();

  return await Project.find({}).sort({ publishedAt: -1 }).limit(limit).lean();
}
