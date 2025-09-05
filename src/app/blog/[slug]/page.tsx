"use client";

import AuthModal from "@/overlays/auth_modal";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import BlogContentSection from "./_components/blog_content_section";
import BlogHeroSection from "./_components/blog_hero_section";
import RelatedPosts from "./_components/related_posts";
import { BlogPost } from "./_model/blog-post";

export default function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);
  const [isScrolled, setIsScrolled] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog post data
  useEffect(() => {
    async function fetchBlogPost() {
      try {
        setLoading(true);
        const res = await fetch(`/api/blogs/${resolvedParams.slug}`);

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Blog post not found");
          } else {
            throw new Error("Failed to fetch blog post");
          }
        }

        const data = await res.json();

        // Transform data to match the BlogPost interface
        const blogPost: BlogPost = {
          id: data.blog._id,
          title: data.blog.title,
          excerpt: data.blog.excerpt,
          category: data.blog.categories?.[0] || "Uncategorized",
          date: new Date(data.blog.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          author: data.blog.author.name,
          authorImage: data.blog.author.image,
          featured: data.blog.featured,
          readTime: calculateReadTime(data.blog.content),
          coverImage: data.blog.coverImage,
          content: [data.blog.content], // Convert content to array as expected by the component
          tags: data.blog.tags || [],
          relatedPosts: data.blog.relatedPosts?.map(
            (related: {
              _id: string;
              title: string;
              excerpt: string;
              categories?: string[];
              publishedAt: string;
              coverImage: string;
            }) => ({
              id: related._id,
              title: related.title,
              excerpt: related.excerpt,
              category: related.categories?.[0] || "Uncategorized",
              date: new Date(related.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              coverImage: related.coverImage,
            })
          ),
        };

        setPost(blogPost);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [resolvedParams.slug]);

  // Calculate estimated read time (1 min per 200 words)
  function calculateReadTime(content: string) {
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    return `${readTime} min read`;
  }

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Rendering states
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-lime-400 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-orbitron font-bold mb-4">
            Error Loading Blog Post
          </h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <Link
            href="/blog"
            className="px-6 py-3 rounded-full bg-gradient-to-br from-purple-600 to-lime-400 text-gray-900 font-medium hover:opacity-90 transition-opacity"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-orbitron font-bold mb-4">
            Blog Post Not Found
          </h2>
          <p className="text-gray-300 mb-6">
            The blog post you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/blog"
            className="px-6 py-3 rounded-full bg-gradient-to-br from-purple-600 to-lime-400 text-gray-900 font-medium hover:opacity-90 transition-opacity"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Blog Hero Section */}
      <BlogHeroSection post={post} />

      {/* Blog Content Section */}
      <BlogContentSection post={post} />

      {/* Related Posts Section */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <RelatedPosts post={post} />
      )}

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-lime-400 flex items-center justify-center text-gray-900 text-xl shadow-lg shadow-purple-600/40 transition-all ${
          isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
      <AuthModal />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-lime-400 flex items-center justify-center text-gray-900 text-xl shadow-lg shadow-purple-600/40 transition-all ${
          isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      <AuthModal />
    </div>
  );
}
