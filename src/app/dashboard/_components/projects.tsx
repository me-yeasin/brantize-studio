"use client";

import Image from "next/image";
import { useState } from "react";

// Define the Project interface based on our MongoDB model
interface Project {
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  coverImage: string;
  gallery: string[];
  client: string;
  technologies: string[];
  features: string[];
  process: {
    title: string;
    description: string;
    image?: string;
  }[];
  results: {
    title: string;
    value: string;
    icon?: string;
  }[];
  testimonial?: {
    content: string;
    author: string;
    position: string;
    image?: string;
  };
  featured: boolean;
  publishedAt?: Date;
  updatedAt?: Date;
}

interface ProjectListItem {
  id: number;
  name: string;
  client: string;
  category: string;
  status: string;
  statusColor: string;
  progress: number;
  dueDate: string;
  members: {
    id: number;
    initials: string;
    color: string;
  }[];
}

export default function Projects() {
  // State for project upload form
  const [activeView, setActiveView] = useState<"list" | "upload">("list");
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    slug: "",
    description: "",
    excerpt: "",
    coverImage: "",
    gallery: [],
    client: "",
    technologies: [],
    features: [],
    process: [],
    results: [],
    testimonial: {
      content: "",
      author: "",
      position: "",
      image: "",
    },
    featured: false,
  });
  const [technology, setTechnology] = useState("");
  const [galleryUrl, setGalleryUrl] = useState("");
  const [feature, setFeature] = useState("");
  const [processStep, setProcessStep] = useState<{
    title: string;
    description: string;
    image: string;
  }>({
    title: "",
    description: "",
    image: "",
  });
  const [result, setResult] = useState<{
    title: string;
    value: string;
    icon: string;
  }>({
    title: "",
    value: "",
    icon: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample project data for the list view
  const projects: ProjectListItem[] = [
    {
      id: 1,
      name: "Brand Identity Redesign",
      client: "TechCorp Inc.",
      category: "Branding",
      status: "In Progress",
      statusColor: "bg-yellow-400",
      progress: 65,
      dueDate: "Sep 15, 2025",
      members: [
        { id: 1, initials: "JD", color: "bg-purple-500" },
        { id: 2, initials: "AM", color: "bg-blue-500" },
        { id: 3, initials: "RK", color: "bg-green-500" },
      ],
    },
    {
      id: 2,
      name: "Website Revamp",
      client: "Global Solutions Ltd.",
      category: "Web Development",
      status: "Completed",
      statusColor: "bg-green-400",
      progress: 100,
      dueDate: "Aug 30, 2025",
      members: [
        { id: 1, initials: "JD", color: "bg-purple-500" },
        { id: 4, initials: "SL", color: "bg-pink-500" },
      ],
    },
    {
      id: 3,
      name: "Marketing Campaign",
      client: "Nexus Retail",
      category: "Marketing",
      status: "In Progress",
      statusColor: "bg-yellow-400",
      progress: 32,
      dueDate: "Oct 05, 2025",
      members: [
        { id: 2, initials: "AM", color: "bg-blue-500" },
        { id: 5, initials: "PJ", color: "bg-red-500" },
      ],
    },
    {
      id: 4,
      name: "Social Media Strategy",
      client: "EcoSmart Products",
      category: "Social Media",
      status: "Not Started",
      statusColor: "bg-red-400",
      progress: 0,
      dueDate: "Oct 12, 2025",
      members: [
        { id: 3, initials: "RK", color: "bg-green-500" },
        { id: 4, initials: "SL", color: "bg-pink-500" },
        { id: 5, initials: "PJ", color: "bg-red-500" },
      ],
    },
    {
      id: 5,
      name: "Product Photoshoot",
      client: "Luxury Timepieces",
      category: "Photography",
      status: "In Progress",
      statusColor: "bg-yellow-400",
      progress: 78,
      dueDate: "Sep 18, 2025",
      members: [
        { id: 1, initials: "JD", color: "bg-purple-500" },
        { id: 6, initials: "MN", color: "bg-yellow-500" },
      ],
    },
    {
      id: 6,
      name: "SEO Optimization",
      client: "Health Supplements Co.",
      category: "Digital Marketing",
      status: "Not Started",
      statusColor: "bg-red-400",
      progress: 0,
      dueDate: "Oct 25, 2025",
      members: [
        { id: 2, initials: "AM", color: "bg-blue-500" },
        { id: 5, initials: "PJ", color: "bg-red-500" },
      ],
    },
    {
      id: 7,
      name: "Logo Design",
      client: "Fresh Start Bakery",
      category: "Branding",
      status: "Completed",
      statusColor: "bg-green-400",
      progress: 100,
      dueDate: "Aug 20, 2025",
      members: [
        { id: 1, initials: "JD", color: "bg-purple-500" },
        { id: 3, initials: "RK", color: "bg-green-500" },
      ],
    },
  ];

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Handle technology tags
  const addTechnology = () => {
    if (technology && !formData.technologies?.includes(technology)) {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), technology],
      });
      setTechnology("");
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies?.filter((t) => t !== techToRemove),
    });
  };

  // Handle gallery images
  const addGalleryImage = () => {
    if (galleryUrl) {
      setFormData({
        ...formData,
        gallery: [...(formData.gallery || []), galleryUrl],
      });
      setGalleryUrl("");
    }
  };

  const removeGalleryImage = (imageUrl: string) => {
    setFormData({
      ...formData,
      gallery: formData.gallery?.filter((url) => url !== imageUrl),
    });
  };

  // Handle features
  const addFeature = () => {
    if (feature) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), feature],
      });
      setFeature("");
    }
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    setFormData({
      ...formData,
      features: newFeatures,
    });
  };

  // Handle process steps
  const addProcessStep = () => {
    if (processStep.title && processStep.description) {
      setFormData({
        ...formData,
        process: [...(formData.process || []), { ...processStep }],
      });
      setProcessStep({ title: "", description: "", image: "" });
    }
  };

  const removeProcessStep = (index: number) => {
    const newProcess = [...(formData.process || [])];
    newProcess.splice(index, 1);
    setFormData({
      ...formData,
      process: newProcess,
    });
  };

  // Handle results
  const addResult = () => {
    if (result.value && result.title) {
      setFormData({
        ...formData,
        results: [...(formData.results || []), { ...result }],
      });
      setResult({ title: "", value: "", icon: "" });
    }
  };

  const removeResult = (index: number) => {
    const newResults = [...(formData.results || [])];
    newResults.splice(index, 1);
    setFormData({
      ...formData,
      results: newResults,
    });
  };

  // Form submission
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

      // Prepare the project data for submission
      const projectData = {
        ...formData,
        slug,
        publishedAt: new Date(),
        updatedAt: new Date(),
      };

      // Send to our API endpoint
      const response = await fetch("/api/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Error creating project");
        return;
      }

      // Show success message
      setSuccessMessage("Project created successfully!");

      // Reset the form
      setFormData({
        title: "",
        slug: "",
        description: "",
        excerpt: "",
        coverImage: "",
        gallery: [],
        client: "",
        technologies: [],
        features: [],
        process: [],
        results: [],
        testimonial: {
          content: "",
          author: "",
          position: "",
        },
        featured: false,
      });
    } catch (error) {
      console.error("Error in project submission:", error);
      setErrorMessage(
        error instanceof Error
          ? `Error: ${error.message}`
          : "An unknown error occurred while creating the project"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-white mb-2">
          Projects
        </h1>
        <p className="text-gray-400">
          Manage and track all your client projects
        </p>
      </div>

      {/* View Toggle */}
      <div className="flex mb-8">
        <button
          onClick={() => setActiveView("list")}
          className={`px-5 py-2 ${
            activeView === "list"
              ? "bg-gray-700 text-white"
              : "bg-gray-800 text-gray-400"
          } rounded-l-lg transition-colors`}
        >
          Project List
        </button>
        <button
          onClick={() => setActiveView("upload")}
          className={`px-5 py-2 ${
            activeView === "upload"
              ? "bg-gray-700 text-white"
              : "bg-gray-800 text-gray-400"
          } rounded-r-lg transition-colors flex items-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Upload Project
        </button>
      </div>

      {activeView === "list" ? (
        <>
          {/* Project Controls */}
          <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full sm:w-64 px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400 pl-10"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400 absolute left-3 top-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>

              <select className="px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400 appearance-none w-full sm:w-40">
                <option value="">All Categories</option>
                <option value="branding">Branding</option>
                <option value="web">Web Development</option>
                <option value="marketing">Marketing</option>
                <option value="social">Social Media</option>
                <option value="photography">Photography</option>
              </select>

              <select className="px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400 appearance-none w-full sm:w-40">
                <option value="">All Statuses</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button
              onClick={() => setActiveView("upload")}
              className="px-5 py-2.5 rounded-lg font-medium brand-gradient-for-bg text-gray-900 hover:opacity-90 transition-all flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              New Project
            </button>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800/70 border border-gray-700 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-600/10 hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-white">
                      {project.name}
                    </h3>
                    <div className="flex items-center">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${project.statusColor} mr-2`}
                      ></div>
                      <span className="text-xs text-gray-300">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-1">
                      Client: {project.client}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Category: {project.category}
                    </p>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="brand-gradient-for-bg h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {project.members.map((member) => (
                        <div
                          key={member.id}
                          className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-xs font-medium text-white border-2 border-gray-800`}
                        >
                          {member.initials}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-400">
                      Due: {project.dueDate}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 flex">
                  <button className="flex-1 py-3 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                    Edit
                  </button>
                  <div className="w-px bg-gray-700"></div>
                  <button className="flex-1 py-3 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="p-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-white mb-2">
              Create New Project
            </h2>
            <p className="text-gray-400">Add a new project to your portfolio</p>
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
                <label className="block text-gray-300 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                  placeholder="Enter project title"
                  required
                />
              </div>

              {/* Client */}
              <div>
                <label className="block text-gray-300 mb-2">Client Name</label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                  placeholder="Enter client name"
                  required
                />
              </div>

              {/* Featured */}
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                    className="sr-only"
                  />
                  <div className="relative w-10 h-5 bg-gray-700 rounded-full transition-colors duration-200 ease-in-out">
                    <div
                      className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${
                        formData.featured ? "translate-x-5 bg-lime-400" : ""
                      }`}
                    ></div>
                  </div>
                  <span className="ml-3 text-gray-300">Featured Project</span>
                </label>
              </div>

              {/* Cover Image */}
              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                  placeholder="Enter cover image URL"
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
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400 min-h-[80px]"
                  placeholder="Enter a brief summary of the project"
                  required
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">
                  Full Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400 min-h-[150px]"
                  placeholder="Enter detailed project description"
                  required
                />
              </div>

              {/* Technologies */}
              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">
                  Technologies Used
                </label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={technology}
                    onChange={(e) => setTechnology(e.target.value)}
                    className="flex-grow p-3 bg-gray-800/50 border border-gray-700 rounded-l-lg text-white focus:outline-none focus:border-lime-400"
                    placeholder="Add a technology"
                  />
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="px-4 bg-gray-700 rounded-r-lg hover:bg-gray-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="ml-2 text-gray-400 hover:text-red-400"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Gallery Images */}
              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">
                  Gallery Images
                </label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={galleryUrl}
                    onChange={(e) => setGalleryUrl(e.target.value)}
                    className="flex-grow p-3 bg-gray-800/50 border border-gray-700 rounded-l-lg text-white focus:outline-none focus:border-lime-400"
                    placeholder="Add an image URL"
                  />
                  <button
                    type="button"
                    onClick={addGalleryImage}
                    className="px-4 bg-gray-700 rounded-r-lg hover:bg-gray-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {formData.gallery?.map((url, i) => (
                    <div key={i} className="relative group h-20 w-full">
                      <Image
                        src={url}
                        alt={`Gallery ${i + 1}`}
                        className="object-cover rounded-lg"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(url)}
                        className="absolute top-1 right-1 z-10 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">Features</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => setFeature(e.target.value)}
                    className="flex-grow p-3 bg-gray-800/50 border border-gray-700 rounded-l-lg text-white focus:outline-none focus:border-lime-400"
                    placeholder="Add a feature"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 bg-gray-700 rounded-r-lg hover:bg-gray-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2 mt-2">
                  {formData.features?.map((feat, i) => (
                    <div
                      key={i}
                      className="bg-gray-800/50 p-3 rounded-lg flex justify-between"
                    >
                      <div className="text-white">{feat}</div>
                      <button
                        type="button"
                        onClick={() => removeFeature(i)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Steps */}
              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">
                  Process Steps
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                  <input
                    type="text"
                    value={processStep.title}
                    onChange={(e) =>
                      setProcessStep({ ...processStep, title: e.target.value })
                    }
                    className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                    placeholder="Step title"
                  />
                  <input
                    type="text"
                    value={processStep.image}
                    onChange={(e) =>
                      setProcessStep({ ...processStep, image: e.target.value })
                    }
                    className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                    placeholder="Image URL (optional)"
                  />
                  <div className="flex">
                    <input
                      type="text"
                      value={processStep.description}
                      onChange={(e) =>
                        setProcessStep({
                          ...processStep,
                          description: e.target.value,
                        })
                      }
                      className="flex-grow p-3 bg-gray-800/50 border border-gray-700 rounded-l-lg text-white focus:outline-none focus:border-lime-400"
                      placeholder="Description"
                    />
                    <button
                      type="button"
                      onClick={addProcessStep}
                      className="px-4 bg-gray-700 rounded-r-lg hover:bg-gray-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="space-y-2 mt-2">
                  {formData.process?.map((step, i) => (
                    <div
                      key={i}
                      className="bg-gray-800/50 p-3 rounded-lg flex justify-between"
                    >
                      <div>
                        <div className="font-medium text-white">
                          {step.title}
                        </div>
                        <div className="text-sm text-gray-400">
                          {step.description}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProcessStep(i)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">Results</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                  <input
                    type="text"
                    value={result.title}
                    onChange={(e) =>
                      setResult({ ...result, title: e.target.value })
                    }
                    className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    value={result.value}
                    onChange={(e) =>
                      setResult({ ...result, value: e.target.value })
                    }
                    className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                    placeholder="Value"
                  />
                  <div className="flex">
                    <input
                      type="text"
                      value={result.icon || ""}
                      onChange={(e) =>
                        setResult({ ...result, icon: e.target.value })
                      }
                      className="flex-grow p-3 bg-gray-800/50 border border-gray-700 rounded-l-lg text-white focus:outline-none focus:border-lime-400"
                      placeholder="Icon (optional)"
                    />
                    <button
                      type="button"
                      onClick={addResult}
                      className="px-4 bg-gray-700 rounded-r-lg hover:bg-gray-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                  {formData.results?.map((res, i) => (
                    <div
                      key={i}
                      className="bg-gray-800/50 p-3 rounded-lg text-center relative group"
                    >
                      <div className="text-xl font-bold text-lime-400">
                        {res.value}
                      </div>
                      <div className="text-sm text-gray-300">{res.title}</div>
                      <button
                        type="button"
                        onClick={() => removeResult(i)}
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">
                  Testimonial (Optional)
                </label>
                <textarea
                  name="testimonial.content"
                  value={formData.testimonial?.content || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      testimonial: {
                        ...formData.testimonial!,
                        content: e.target.value,
                      },
                    })
                  }
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400 min-h-[100px]"
                  placeholder="Testimonial content"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <input
                    type="text"
                    name="testimonial.author"
                    value={formData.testimonial?.author || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        testimonial: {
                          ...formData.testimonial!,
                          author: e.target.value,
                        },
                      })
                    }
                    className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                    placeholder="Author name"
                  />
                  <input
                    type="text"
                    name="testimonial.position"
                    value={formData.testimonial?.position || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        testimonial: {
                          ...formData.testimonial!,
                          position: e.target.value,
                        },
                      })
                    }
                    className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                    placeholder="Position/Company"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => setActiveView("list")}
                className="px-5 py-2.5 mr-2 rounded-lg font-medium bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-lg font-medium brand-gradient-for-bg text-gray-900 hover:opacity-90 transition-all flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Create Project"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
