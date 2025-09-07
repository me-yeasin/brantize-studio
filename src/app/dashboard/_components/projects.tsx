"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Define the Project interface based on our MongoDB model
interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  coverImage: string;
  videoUrl?: string; // Optional video URL
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
  duration: string;
  industry: string;
  team: string[];
  challenge: string;
  solution: string;
  implementation: string;
  live?: string; // Optional live project URL
  featured: boolean;
  publishedAt?: string;
  updatedAt?: string;
}

// interface ProjectListItem {
//   id: number;
//   name: string;
//   client: string;
//   category: string;
//   status: string;
//   statusColor: string;
//   progress: number;
//   dueDate: string;
//   members: {
//     id: number;
//     initials: string;
//     color: string;
//   }[];
// }

// Add a DeleteConfirmationModal component
function DeleteConfirmationModal({
  show,
  onClose,
  onConfirm,
  isLoading = false,
  projectTitle = "",
}: {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  projectTitle?: string;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-white mb-2">Confirm Delete</h3>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete{" "}
          {projectTitle ? (
            <span className="font-medium">&quot;{projectTitle}&quot;</span>
          ) : (
            "this project"
          )}
          ? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-red-500/70 text-white hover:bg-red-500/90 transition-all flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                <span>Deleting...</span>
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  // const router = useRouter();

  // State for project form and management
  const [activeView, setActiveView] = useState<"list" | "upload" | "edit">(
    "list"
  );
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorFetching, setErrorFetching] = useState("");
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [, setIsLoadingProject] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    slug: "",
    description: "",
    excerpt: "",
    coverImage: "",
    videoUrl: "",
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
    duration: "",
    industry: "",
    team: [],
    challenge: "",
    solution: "",
    implementation: "",
    live: "",
    featured: false,
  });

  // Fetch projects from the database
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setErrorFetching("Failed to load projects. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);
  const [technology, setTechnology] = useState("");
  const [teamMember, setTeamMember] = useState("");
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

  // Functions for delete and edit
  const handleDeleteProject = async (projectId: string) => {
    try {
      setDeleteProjectId(projectId);
      setShowDeleteModal(true);
    } catch (error) {
      console.error("Error preparing to delete project:", error);
    }
  };

  const confirmDelete = async () => {
    if (!deleteProjectId) return;

    try {
      const projectToDelete = projects.find((p) => p._id === deleteProjectId);
      if (!projectToDelete) return;

      // Show loading state
      setIsSubmitting(true);

      const response = await fetch(`/api/projects/${projectToDelete.slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete project");
      }

      // Remove the deleted project from the state
      setProjects(projects.filter((p) => p._id !== deleteProjectId));
      setShowDeleteModal(false);
      setDeleteProjectId(null);

      // Show success message
      setSuccessMessage(
        `Project "${projectToDelete.title}" was deleted successfully`
      );

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting project:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to delete project"
      );

      // Clear error message after 5 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProject = async (slug: string) => {
    try {
      // Clear any existing success or error messages
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoadingProject(true);

      // Fetch the complete project data
      const response = await fetch(`/api/projects/${slug}`);

      if (!response.ok) {
        throw new Error("Failed to fetch project details");
      }

      const data = await response.json();
      const projectData = data.project;

      if (!projectData) {
        throw new Error("Project not found");
      }

      // Store the original project for reference
      setEditingProject(projectData);

      // Populate the form with the project data
      setFormData({
        _id: projectData._id,
        title: projectData.title,
        slug: projectData.slug,
        description: projectData.description,
        excerpt: projectData.excerpt,
        coverImage: projectData.coverImage,
        videoUrl: projectData.videoUrl || "",
        gallery: projectData.gallery || [],
        client: projectData.client,
        technologies: projectData.technologies || [],
        features: projectData.features || [],
        process: projectData.process || [],
        results: projectData.results || [],
        testimonial: projectData.testimonial || {
          content: "",
          author: "",
          position: "",
          image: "",
        },
        duration: projectData.duration || "",
        industry: projectData.industry || "",
        team: projectData.team || [],
        challenge: projectData.challenge || "",
        solution: projectData.solution || "",
        implementation: projectData.implementation || "",
        live: projectData.live || "",
        featured: projectData.featured || false,
      });

      // Switch to edit mode
      setActiveView("edit");

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching project for edit:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to load project for editing"
      );
    } finally {
      setIsLoadingProject(false);
    }
  };

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

  // Handle team members
  const addTeamMember = () => {
    if (teamMember && !formData.team?.includes(teamMember)) {
      setFormData({
        ...formData,
        team: [...(formData.team || []), teamMember],
      });
      setTeamMember("");
    }
  };

  const removeTeamMember = (memberToRemove: string) => {
    setFormData({
      ...formData,
      team: formData.team?.filter((m) => m !== memberToRemove),
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
      let slug = formData.slug;
      const isEditMode = activeView === "edit" && editingProject;

      if (!isEditMode || !slug) {
        // Generate a slug from the title for new projects or if slug is missing
        slug = formData.title
          ?.toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-");
      }

      // Prepare the project data for submission
      const projectData = {
        ...formData,
        slug,
        updatedAt: new Date().toISOString(),
      };

      // For new projects, add creation date
      if (!isEditMode) {
        projectData.publishedAt = new Date().toISOString();
      }

      console.log(
        `${isEditMode ? "Updating" : "Creating"} project data:`,
        projectData
      );

      let url = "/api/projects/create";
      let method = "POST";

      // If editing, use PUT to the specific project endpoint
      if (isEditMode && editingProject) {
        url = `/api/projects/${editingProject.slug}`;
        method = "PUT";
      }

      // Send to our API endpoint
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.error || `Error ${isEditMode ? "updating" : "creating"} project`
        );
        return;
      }

      // Show success message
      setSuccessMessage(
        `Project ${isEditMode ? "updated" : "created"} successfully!`
      );

      // If we've updated a project, update it in the local state as well
      if (isEditMode && data.project) {
        setProjects(
          projects.map((p) => (p._id === data.project._id ? data.project : p))
        );
      } else if (data.project) {
        // For new projects, add to the state
        setProjects([data.project, ...projects]);
      }

      // Reset the form
      setFormData({
        title: "",
        slug: "",
        description: "",
        excerpt: "",
        coverImage: "",
        videoUrl: "",
        live: "",
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
        duration: "",
        industry: "",
        team: [],
        challenge: "",
        solution: "",
        implementation: "",
        featured: false,
      });

      // If in edit mode, clear editing state and go back to list view after a short delay
      if (isEditMode) {
        setTimeout(() => {
          setEditingProject(null);
          setSuccessMessage("");
          setErrorMessage("");
          setActiveView("list"); // Return to list view
        }, 2000); // Give user time to see success message
      }
    } catch (error) {
      console.error("Error in project submission:", error);
      setErrorMessage(
        error instanceof Error
          ? `Error: ${error.message}`
          : `An unknown error occurred while ${
              activeView === "edit" ? "updating" : "creating"
            } the project`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Delete Confirmation Modal - moved to top level */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteProjectId(null);
        }}
        onConfirm={confirmDelete}
        isLoading={isSubmitting}
        projectTitle={projects.find((p) => p._id === deleteProjectId)?.title}
      />

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
            onClick={() => {
              if (editingProject && activeView === "edit") {
                // Show confirmation before discarding changes
                if (
                  confirm("Discard your changes and return to project list?")
                ) {
                  setEditingProject(null);
                  setActiveView("list");
                }
              } else {
                setActiveView("list");
              }
            }}
            className={`px-5 py-2 ${
              activeView === "list"
                ? "bg-gray-700 text-white"
                : "bg-gray-800 text-gray-400"
            } rounded-l-lg transition-colors`}
          >
            Project List
          </button>

          {activeView === "edit" ? (
            <button
              className={`px-5 py-2 bg-gray-700 text-white rounded-r-lg transition-colors flex items-center`}
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
                />
              </svg>
              Edit Project{" "}
              {editingProject?.title ? `"${editingProject.title}"` : ""}
            </button>
          ) : (
            <button
              onClick={() => {
                setEditingProject(null); // Clear any editing state
                setSuccessMessage(""); // Clear success message
                setErrorMessage(""); // Clear error message
                setActiveView("upload");
              }}
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
          )}
        </div>

        {activeView === "list" ? (
          <>
            {/* Success and Error Messages */}
            {successMessage && (
              <div className="mb-6 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-md flex items-center">
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
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-md flex items-center">
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
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                {errorMessage}
              </div>
            )}

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
                onClick={() => {
                  setSuccessMessage("");
                  setErrorMessage("");
                  setActiveView("upload");
                }}
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
              {isLoading ? (
                // Loading state
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="bg-gray-800/70 border border-gray-700 rounded-xl overflow-hidden animate-pulse"
                  >
                    <div className="p-6">
                      <div className="h-6 bg-gray-700 rounded mb-4"></div>
                      <div className="h-4 bg-gray-700 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-700 rounded mb-4 w-2/3"></div>
                      <div className="h-2 bg-gray-700 rounded mb-4"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-8 w-16 bg-gray-700 rounded"></div>
                        <div className="h-4 w-24 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    <div className="border-t border-gray-700 p-3 h-12"></div>
                  </div>
                ))
              ) : errorFetching ? (
                // Error state
                <div className="col-span-full bg-red-500/20 border border-red-500/50 text-red-400 p-4 rounded-lg">
                  <p className="font-medium">Error loading projects</p>
                  <p>{errorFetching}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-500/30 hover:bg-red-500/40 rounded-lg transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : projects.length === 0 ? (
                // Empty state
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                      />
                    </svg>
                    <h3 className="text-lg font-medium text-white mb-2">
                      No Projects Found
                    </h3>
                    <p className="text-gray-400 mb-4">
                      You haven&apos;t created any projects yet.
                    </p>
                    <button
                      onClick={() => {
                        setSuccessMessage("");
                        setErrorMessage("");
                        setActiveView("upload");
                      }}
                      className="px-5 py-2.5 rounded-lg font-medium brand-gradient-for-bg text-gray-900 hover:opacity-90 transition-all"
                    >
                      Create Your First Project
                    </button>
                  </div>
                </div>
              ) : (
                // Project cards
                projects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-gray-800/70 border border-gray-700 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-600/10 hover:-translate-y-1"
                  >
                    <div className="relative h-44 overflow-hidden bg-gray-900">
                      {project.coverImage ? (
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-12 h-12 text-gray-600"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                          </svg>
                        </div>
                      )}
                      {project.featured && (
                        <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-white">
                          {project.title}
                        </h3>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-400 text-sm mb-1">
                          Client: {project.client}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Industry: {project.industry || "Not specified"}
                        </p>
                      </div>

                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {project.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies &&
                          project.technologies
                            .slice(0, 3)
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                        {project.technologies &&
                          project.technologies.length > 3 && (
                            <span className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                      </div>

                      <div className="text-sm text-gray-400">
                        {project.publishedAt ? (
                          <p>
                            Published:{" "}
                            {new Date(project.publishedAt).toLocaleDateString()}
                          </p>
                        ) : (
                          <p>Draft</p>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-700 flex">
                      <button
                        onClick={() => handleEditProject(project.slug)}
                        className="flex-1 py-3 text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                        Edit
                      </button>
                      <div className="w-px bg-gray-700"></div>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="flex-1 py-3 text-red-400 hover:text-red-300 transition-colors text-sm font-medium flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-orbitron font-bold text-white mb-2">
                {activeView === "edit" ? "Edit Project" : "Create New Project"}
              </h2>
              <p className="text-gray-400">
                {activeView === "edit"
                  ? "Update your project information"
                  : "Add a new project to your portfolio"}
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

            {/* Placeholder for form upload section */}

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
                  <label className="block text-gray-300 mb-2">
                    Client Name
                  </label>
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

                {/* Duration */}
                <div>
                  <label className="block text-gray-300 mb-2">
                    Project Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                    placeholder="e.g. 3 months, 6 weeks"
                  />
                </div>

                {/* Live URL */}
                <div>
                  <label className="block text-gray-300 mb-2">
                    Live Project URL{" "}
                    <span className="text-gray-500 text-sm">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    name="live"
                    value={formData.live}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                    placeholder="e.g. https://project-demo.com"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-gray-300 mb-2">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                    placeholder="e.g. Technology, Healthcare"
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

                {/* Video URL */}
                <div className="col-span-2">
                  <label className="block text-gray-300 mb-2">
                    Video URL{" "}
                    <span className="text-gray-500 text-sm">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                    placeholder="Enter video URL (e.g., YouTube, Vimeo)"
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

                {/* Team Members */}
                <div className="col-span-2">
                  <label className="block text-gray-300 mb-2">
                    Team Members
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={teamMember}
                      onChange={(e) => setTeamMember(e.target.value)}
                      className="flex-grow p-3 bg-gray-800/50 border border-gray-700 rounded-l-lg text-white focus:outline-none focus:border-lime-400"
                      placeholder="Add a team member"
                    />
                    <button
                      type="button"
                      onClick={addTeamMember}
                      className="px-4 bg-gray-700 rounded-r-lg hover:bg-gray-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.team?.map((member, i) => (
                      <span
                        key={i}
                        className="bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {member}
                        <button
                          type="button"
                          onClick={() => removeTeamMember(member)}
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
                          priority
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

                {/* Challenge */}
                <div className="col-span-2">
                  <label className="block text-gray-300 mb-2">
                    Project Challenge
                  </label>
                  <textarea
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400 min-h-[120px]"
                    placeholder="Describe the challenges faced in this project"
                  />
                </div>

                {/* Solution */}
                <div className="col-span-2">
                  <label className="block text-gray-300 mb-2">
                    Our Solution
                  </label>
                  <textarea
                    name="solution"
                    value={formData.solution}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400 min-h-[120px]"
                    placeholder="Describe the solution provided for the project"
                  />
                </div>

                {/* Implementation */}
                <div className="col-span-2">
                  <label className="block text-gray-300 mb-2">
                    Implementation Process
                  </label>
                  <textarea
                    name="implementation"
                    value={formData.implementation}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400 min-h-[120px]"
                    placeholder="Describe how the solution was implemented"
                  />
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
                        setProcessStep({
                          ...processStep,
                          title: e.target.value,
                        })
                      }
                      className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                      placeholder="Step title"
                    />
                    <input
                      type="text"
                      value={processStep.image}
                      onChange={(e) =>
                        setProcessStep({
                          ...processStep,
                          image: e.target.value,
                        })
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
                  onClick={() => {
                    if (activeView === "edit" && editingProject) {
                      if (confirm("Discard your changes?")) {
                        setSuccessMessage("");
                        setErrorMessage("");
                        setEditingProject(null);
                        setActiveView("list");
                      }
                    } else {
                      setSuccessMessage("");
                      setErrorMessage("");
                      setActiveView("list");
                    }
                  }}
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
                      {activeView === "edit" ? "Updating..." : "Creating..."}
                    </>
                  ) : activeView === "edit" ? (
                    "Update Project"
                  ) : (
                    "Create Project"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
