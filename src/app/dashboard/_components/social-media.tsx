"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaMediumM,
  FaPinterestP,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

interface SocialMedia {
  _id?: string;
  platform: string;
  url: string;
  isActive: boolean;
}

const SocialMediaDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [socialMediaLinks, setSocialMediaLinks] = useState<SocialMedia[]>([]);
  const [newLink, setNewLink] = useState<SocialMedia>({
    platform: "Twitter",
    url: "",
    isActive: true,
  });

  // Social media platforms and their icons
  const socialPlatforms = {
    Twitter: <FaTwitter />,
    LinkedIn: <FaLinkedinIn />,
    GitHub: <FaGithub />,
    Medium: <FaMediumM />,
    Instagram: <FaInstagram />,
    Facebook: <FaFacebookF />,
    YouTube: <FaYoutube />,
    Pinterest: <FaPinterestP />,
  };

  useEffect(() => {
    fetchSocialMediaLinks();
  }, []);

  const fetchSocialMediaLinks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/social-media");
      if (!response.ok) {
        throw new Error("Failed to fetch social media links");
      }
      const data = await response.json();
      setSocialMediaLinks(data);
    } catch (error) {
      console.error("Error loading social media data:", error);
      toast.error("Failed to load social media links");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newLink.url) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/social-media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLink),
      });

      if (!response.ok) {
        throw new Error("Failed to add social media link");
      }

      await fetchSocialMediaLinks();
      setNewLink({
        platform: "Twitter",
        url: "",
        isActive: true,
      });
      toast.success("Social media link added successfully");
    } catch (error) {
      console.error("Error adding social media link:", error);
      toast.error("Failed to add social media link");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLink = async (id: string, data: Partial<SocialMedia>) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/social-media/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update social media link");
      }

      await fetchSocialMediaLinks();
      toast.success("Social media link updated successfully");
    } catch (error) {
      console.error("Error updating social media link:", error);
      toast.error("Failed to update social media link");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (!confirm("Are you sure you want to delete this social media link?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/social-media/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete social media link");
      }

      await fetchSocialMediaLinks();
      toast.success("Social media link deleted successfully");
    } catch (error) {
      console.error("Error deleting social media link:", error);
      toast.error("Failed to delete social media link");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeToggle = async (id: string, isActive: boolean) => {
    await handleUpdateLink(id, { isActive });
  };

  if (loading && socialMediaLinks.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Social Media Links</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Social Media Links</h2>

      {/* Add new social media link form */}
      <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-3">Add New Social Link</h3>
        <form
          onSubmit={handleAddNewLink}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <label className="block text-gray-300 mb-2">Platform</label>
            <select
              value={newLink.platform}
              onChange={(e) =>
                setNewLink({ ...newLink, platform: e.target.value })
              }
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
            >
              {Object.keys(socialPlatforms).map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">URL</label>
            <input
              type="url"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              placeholder="https://example.com"
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded flex items-center"
            >
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span>
                  Adding...
                </>
              ) : (
                "Add Link"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Existing social media links */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-3">Manage Social Links</h3>
        {socialMediaLinks.length === 0 ? (
          <p className="text-gray-400">
            No social media links found. Add one above to get started.
          </p>
        ) : (
          socialMediaLinks.map((link) => (
            <div
              key={link._id}
              className={`p-4 border ${
                link.isActive ? "border-lime-700" : "border-gray-700"
              } rounded-lg bg-gray-800/50 flex flex-wrap md:flex-nowrap gap-4 items-center`}
            >
              <div className="flex items-center gap-2 w-full md:w-1/4">
                <span className="text-2xl">
                  {
                    socialPlatforms[
                      link.platform as keyof typeof socialPlatforms
                    ]
                  }
                </span>
                <span className="font-medium">{link.platform}</span>
              </div>

              <div className="flex-grow">
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => {
                    const updatedLinks = socialMediaLinks.map((item) =>
                      item._id === link._id
                        ? { ...item, url: e.target.value }
                        : item
                    );
                    setSocialMediaLinks(updatedLinks);
                  }}
                  onBlur={() =>
                    link._id && handleUpdateLink(link._id, { url: link.url })
                  }
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={link.isActive}
                      onChange={() =>
                        link._id && handleChangeToggle(link._id, !link.isActive)
                      }
                    />
                    <div
                      className={`w-10 h-5 rounded-full ${
                        link.isActive ? "bg-lime-500" : "bg-gray-600"
                      }`}
                    ></div>
                    <div
                      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transform transition-transform ${
                        link.isActive ? "translate-x-5" : ""
                      }`}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm">
                    {link.isActive ? "Active" : "Inactive"}
                  </span>
                </label>

                <button
                  onClick={() => link._id && handleDeleteLink(link._id)}
                  className="p-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SocialMediaDashboard;
