"use client";

import BlogChat from "@/components/chat/BlogChat";
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

  // Dynamic SEO - update meta tags on client side when blog post data changes
  useEffect(() => {
    if (!post) return;

    // Update document title
    document.title = `${post.title} | Brantize Studio Blog`;

    // Helper function to create or update meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attributeName = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attributeName}="${name}"]`);

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attributeName, name);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    // Update standard meta tags
    updateMeta("description", post.excerpt || "");
    updateMeta("keywords", post.tags?.join(", ") || post.category || "");
    updateMeta("author", post.author || "");

    // Update OpenGraph tags
    updateMeta("og:title", post.title, true);
    updateMeta("og:description", post.excerpt || "", true);
    if (post.coverImage) {
      updateMeta("og:image", post.coverImage, true);
    }
    updateMeta("og:type", "article", true);
    updateMeta("og:site_name", "Brantize Studio", true);

    // Update article specific tags
    updateMeta(
      "article:published_time",
      new Date(post.date).toISOString(),
      true
    );
    updateMeta("article:section", post.category || "", true);
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach((tag, index) => {
        updateMeta(`article:tag:${index}`, tag, true);
      });
    }

    // Update Twitter Card tags
    updateMeta("twitter:title", post.title, true);
    updateMeta("twitter:description", post.excerpt || "", true);
    if (post.coverImage) {
      updateMeta("twitter:image", post.coverImage, true);
    }
    updateMeta("twitter:card", "summary_large_image", true);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute(
      "href",
      `https://brantize.com/blog/${resolvedParams.slug}`
    );

    // Add JSON-LD structured data for the blog post
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt || "",
      image: post.coverImage || "",
      author: {
        "@type": "Person",
        name: post.author || "Brantize Studio",
        url: "https://brantize.com/about",
      },
      publisher: {
        "@type": "Organization",
        name: "Brantize Studio",
        logo: {
          "@type": "ImageObject",
          url: "https://brantize.com/logo.png", // Update with your actual logo URL
        },
      },
      datePublished: new Date(post.date).toISOString(),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://brantize.com/blog/${resolvedParams.slug}`,
      },
      keywords: post.tags?.join(", ") || post.category || "",
      articleSection: post.category || "Blog",
    };

    // Add or update the JSON-LD script in the head
    let scriptElement = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(structuredData);
  }, [post, resolvedParams.slug]);

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

      {/* Blog Chat - AI assistant for blog content */}
      {post && <BlogChat blogData={post} />}

      <AuthModal />
    </div>
  );
}
