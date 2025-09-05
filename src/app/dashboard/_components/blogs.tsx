"use client";

import { useState } from "react";

// Define the BlogPost interface based on our MongoDB model
interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  categories: string[];
  author: {
    name: string;
    image: string;
  };
  featured: boolean;
  readTime?: string;
  coverImage: string;
  content: string;
  tags: string[];
}

export default function Blogs() {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    categories: [],
    author: {
      name: "",
      image: "/images/authors/default.jpg",
    },
    featured: false,
    readTime: "",
    coverImage: "",
    content: "",
    tags: [],
    slug: "",
  });
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  const [contentParagraphs, setContentParagraphs] = useState<string[]>([]);
  const [contentParagraph, setContentParagraph] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "authorName") {
      setFormData({
        ...formData,
        author: {
          ...formData.author!,
          name: value,
        },
      });
    } else if (name === "authorImage") {
      setFormData({
        ...formData,
        author: {
          ...formData.author!,
          image: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const addTag = () => {
    if (tag && !formData.tags?.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tag],
      });
      setTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tagToRemove),
    });
  };

  const addCategory = () => {
    if (category && !formData.categories?.includes(category)) {
      setFormData({
        ...formData,
        categories: [...(formData.categories || []), category],
      });
      setCategory("");
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setFormData({
      ...formData,
      categories: formData.categories?.filter((c) => c !== categoryToRemove),
    });
  };

  const addContentParagraph = () => {
    if (contentParagraph) {
      setContentParagraphs([...contentParagraphs, contentParagraph]);
      setContentParagraph("");
    }
  };

  const removeContentParagraph = (index: number) => {
    const newParagraphs = [...contentParagraphs];
    newParagraphs.splice(index, 1);
    setContentParagraphs(newParagraphs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      // Generate a slug from the title
      const slug = formData.title
        ?.toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");

      // Join content paragraphs into a single string with line breaks
      const content = contentParagraphs.join("\n\n");

      // Prepare the blog post data for submission
      const blogPostData = {
        title: formData.title,
        slug: slug,
        excerpt: formData.excerpt,
        content: content,
        coverImage: formData.coverImage,
        author: {
          name: formData.author?.name,
          image: formData.author?.image,
        },
        categories: formData.categories,
        tags: formData.tags,
        featured: formData.featured,
        publishedAt: new Date(),
        updatedAt: new Date(),
      };

      // Send to our API endpoint
      const response = await fetch("/api/blogs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogPostData),
      });

      const data = await response.json();
      console.log("API Response:", { status: response.status, data });

      if (!response.ok) {
        // Instead of throwing an error, set the error message state
        setErrorMessage(data.error || "Error creating blog post");
        return; // Exit the function early without setting success state
      }

      // Show success message
      setSuccessMessage("Blog post created successfully!");

      // Reset the form
      setFormData({
        title: "",
        excerpt: "",
        categories: [],
        author: {
          name: "",
          image: "/images/authors/default.jpg",
        },
        featured: false,
        readTime: "",
        coverImage: "",
        content: "",
        tags: [],
        slug: "",
      });
      setContentParagraphs([]);
    } catch (error) {
      console.error("Error in blog post submission:", error);
      setErrorMessage(
        error instanceof Error
          ? `Error: ${error.message}`
          : "An unknown error occurred while creating the blog post"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-white mb-2">
          Create Blog Post
        </h1>
        <p className="text-gray-400">
          Create and publish new content for your blog.
        </p>
      </div>

      {successMessage && (
        <div className="mb-6 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-md">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-md flex flex-col">
          <span className="font-medium">Error:</span>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-2">
            <label className="block text-gray-300 mb-2">Blog Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Excerpt */}
          <div className="col-span-2">
            <label className="block text-gray-300 mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400 min-h-[100px]"
              placeholder="Enter a brief summary of the blog post"
              required
            />
          </div>

          {/* Categories */}
          <div className="col-span-2">
            <label className="block text-gray-300 mb-2">Categories</label>
            <div className="flex mb-2">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-grow p-3 bg-gray-800/50 border border-gray-700 rounded-l-lg text-white focus:outline-none focus:border-lime-400"
                placeholder="Add a category"
              />
              <button
                type="button"
                onClick={addCategory}
                className="px-4 bg-gray-700 rounded-r-lg hover:bg-gray-600 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.categories?.map((cat, i) => (
                <span
                  key={i}
                  className="bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {cat}
                  <button
                    type="button"
                    onClick={() => removeCategory(cat)}
                    className="ml-2 text-gray-400 hover:text-red-400"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Author Name */}
          <div>
            <label className="block text-gray-300 mb-2">Author Name</label>
            <input
              type="text"
              name="authorName"
              value={formData.author?.name}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
              placeholder="Author name"
              required
            />
          </div>

          {/* Author Image */}
          <div>
            <label className="block text-gray-300 mb-2">Author Image URL</label>
            <input
              type="text"
              name="authorImage"
              value={formData.author?.image}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
              placeholder="https://example.com/author.jpg"
            />
          </div>

          {/* Featured */}
          <div>
            <div className="flex items-center space-x-3 h-full mt-8">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                className="w-5 h-5 rounded border-gray-700 bg-gray-800/50 text-lime-400 focus:ring-lime-400"
              />
              <label htmlFor="featured" className="text-gray-300">
                Mark as Featured Post
              </label>
            </div>
          </div>

          {/* Read Time */}
          <div>
            <label className="block text-gray-300 mb-2">Read Time</label>
            <input
              type="text"
              name="readTime"
              value={formData.readTime}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
              placeholder="e.g., 5 min read"
            />
          </div>

          {/* Cover Image */}
          <div className="col-span-2">
            <label className="block text-gray-300 mb-2">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Tags */}
          <div className="col-span-2">
            <label className="block text-gray-300 mb-2">Tags</label>
            <div className="flex mb-2">
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="flex-grow p-3 bg-gray-800/50 border border-gray-700 rounded-l-lg text-white focus:outline-none focus:border-lime-400"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 bg-gray-700 rounded-r-lg hover:bg-gray-600 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags?.map((t, i) => (
                <span
                  key={i}
                  className="bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    className="ml-2 text-gray-400 hover:text-red-400"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="col-span-2">
            <label className="block text-gray-300 mb-2">
              Content Paragraphs
            </label>
            <div className="flex mb-2">
              <textarea
                value={contentParagraph}
                onChange={(e) => setContentParagraph(e.target.value)}
                className="flex-grow p-3 bg-gray-800/50 border border-gray-700 rounded-l-lg text-white focus:outline-none focus:border-lime-400 min-h-[100px]"
                placeholder="Write a paragraph for your blog post"
              />
              <button
                type="button"
                onClick={addContentParagraph}
                className="px-4 bg-gray-700 rounded-r-lg hover:bg-gray-600 transition-colors self-stretch flex items-center"
              >
                Add
              </button>
            </div>

            {/* Content Preview */}
            <div className="mt-4 space-y-4">
              <h3 className="text-gray-300 font-semibold">Content Preview:</h3>
              {contentParagraphs.length > 0 ? (
                contentParagraphs.map((paragraph, index) => (
                  <div
                    key={index}
                    className="relative bg-gray-800/30 p-4 rounded-lg border border-gray-700"
                  >
                    <p className="text-gray-300">{paragraph}</p>
                    <button
                      type="button"
                      onClick={() => removeContentParagraph(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-400"
                    >
                      &times;
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No content added yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-full font-medium brand-gradient-for-bg text-gray-900 hover:opacity-90 transition-opacity ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Creating Blog Post..." : "Create Blog Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
