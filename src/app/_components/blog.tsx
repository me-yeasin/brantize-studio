"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Author {
  name: string;
  image: string;
}

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  categories: string[];
  publishedAt: string;
  author: Author;
  featured: boolean;
  coverImage: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/blogs?limit=6");

        if (!res.ok) {
          throw new Error("Failed to fetch blog posts");
        }

        const data = await res.json();
        setBlogPosts(data.blogs);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section id="blog" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl mb-4">
            Latest{" "}
            <span className="bg-gradient-to-r from-purple-600 to-lime-400 bg-clip-text text-transparent">
              AI Insights
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Stay updated with the latest trends, innovations, and best practices
            in AI integration and automation.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-10 h-10 border-t-2 border-b-2 border-lime-400 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-lime-700 hover:bg-lime-600 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured Blog Post */}
            {blogPosts.length > 0 && blogPosts.some((post) => post.featured) ? (
              <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="h-64 lg:h-auto relative overflow-hidden">
                    <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-lime-400 text-gray-900">
                      Featured
                    </div>
                    {blogPosts.find((post) => post.featured)?.coverImage && (
                      <Image
                        src={
                          blogPosts.find((post) => post.featured)?.coverImage ||
                          ""
                        }
                        alt={
                          blogPosts.find((post) => post.featured)?.title ||
                          "Featured post"
                        }
                        className="w-full h-full object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center text-gray-400 text-sm mb-4">
                      <span className="flex items-center mr-4">
                        <i className="far fa-calendar mr-2 text-lime-400"></i>{" "}
                        {new Date(
                          blogPosts.find((post) => post.featured)
                            ?.publishedAt || ""
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center">
                        <i className="far fa-user mr-2 text-lime-400"></i>{" "}
                        {blogPosts.find((post) => post.featured)?.author.name}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {blogPosts.find((post) => post.featured)?.title}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {blogPosts.find((post) => post.featured)?.excerpt}
                    </p>
                    <a
                      href={`/blog/${
                        blogPosts.find((post) => post.featured)?.slug
                      }`}
                      className="text-lime-400 font-medium hover:text-white transition-colors flex items-center w-fit"
                    >
                      Read More{" "}
                      <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Regular Blog Posts */}
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <div
                  key={post._id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 transition-all hover:-translate-y-2 hover:shadow-xl flex flex-col"
                >
                  <div className="h-48 relative overflow-hidden">
                    {post.categories && post.categories.length > 0 && (
                      <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-lime-400 text-gray-900">
                        {post.categories[0]}
                      </div>
                    )}
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-gray-400 text-sm mb-4">
                      <span className="flex items-center mr-4">
                        <i className="far fa-calendar mr-2 text-lime-400"></i>{" "}
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </span>
                      <span className="flex items-center">
                        <i className="far fa-user mr-2 text-lime-400"></i>{" "}
                        {post.author.name}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                    <p className="text-gray-400 mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    <a
                      href={`/blog/${post.slug}`}
                      className="text-lime-400 font-medium hover:text-white transition-colors flex items-center w-fit"
                    >
                      Read More{" "}
                      <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                    </a>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
