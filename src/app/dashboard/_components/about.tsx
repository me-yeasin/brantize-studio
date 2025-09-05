"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Stat {
  label: string;
  value: string;
}

interface AboutData {
  paragraphs: string[];
  stats: Stat[];
  _id?: string;
}

const AboutDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState<AboutData>({
    paragraphs: ["", "", ""],
    stats: [
      { label: "", value: "" },
      { label: "", value: "" },
      { label: "", value: "" },
    ],
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/about");
        if (!response.ok) {
          throw new Error("Failed to fetch about data");
        }
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error("Error loading about data:", error);
        toast.error("Failed to load about data");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...aboutData.paragraphs];
    newParagraphs[index] = value;
    setAboutData({ ...aboutData, paragraphs: newParagraphs });
  };

  const handleStatChange = (
    index: number,
    field: keyof Stat,
    value: string
  ) => {
    const newStats = [...aboutData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setAboutData({ ...aboutData, stats: newStats });
  };

  const handleAddParagraph = () => {
    setAboutData({
      ...aboutData,
      paragraphs: [...aboutData.paragraphs, ""],
    });
  };

  const handleRemoveParagraph = (index: number) => {
    if (aboutData.paragraphs.length <= 1) return;
    const newParagraphs = [...aboutData.paragraphs];
    newParagraphs.splice(index, 1);
    setAboutData({ ...aboutData, paragraphs: newParagraphs });
  };

  const handleAddStat = () => {
    setAboutData({
      ...aboutData,
      stats: [...aboutData.stats, { label: "", value: "" }],
    });
  };

  const handleRemoveStat = (index: number) => {
    if (aboutData.stats.length <= 1) return;
    const newStats = [...aboutData.stats];
    newStats.splice(index, 1);
    setAboutData({ ...aboutData, stats: newStats });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("/api/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aboutData),
      });

      if (!response.ok) {
        throw new Error("Failed to update about data");
      }

      const updatedData = await response.json();
      setAboutData(updatedData);
      toast.success("About data updated successfully");
    } catch (error) {
      console.error("Error updating about data:", error);
      toast.error("Failed to update about data");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !aboutData.paragraphs[0]) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">About Us Management</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">About Us Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">About Content</h3>
          {aboutData.paragraphs.map((paragraph, index) => (
            <div key={index} className="mb-4 flex items-start">
              <textarea
                className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
                rows={4}
                value={paragraph}
                onChange={(e) => handleParagraphChange(index, e.target.value)}
                placeholder={`Paragraph ${index + 1}`}
              />
              <button
                type="button"
                className="ml-2 p-2 bg-red-600 text-white rounded"
                onClick={() => handleRemoveParagraph(index)}
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-gray-700 text-white rounded"
            onClick={handleAddParagraph}
          >
            Add Paragraph
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Statistics</h3>
          {aboutData.stats.map((stat, index) => (
            <div key={index} className="mb-4 flex items-center">
              <div className="flex-grow grid grid-cols-2 gap-2">
                <input
                  type="text"
                  className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
                  value={stat.value}
                  onChange={(e) =>
                    handleStatChange(index, "value", e.target.value)
                  }
                  placeholder="Value (e.g. 50+)"
                />
                <input
                  type="text"
                  className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
                  value={stat.label}
                  onChange={(e) =>
                    handleStatChange(index, "label", e.target.value)
                  }
                  placeholder="Label (e.g. Happy Clients)"
                />
              </div>
              <button
                type="button"
                className="ml-2 p-2 bg-red-600 text-white rounded"
                onClick={() => handleRemoveStat(index)}
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-gray-700 text-white rounded"
            onClick={handleAddStat}
          >
            Add Statistic
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded flex items-center"
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
};

export default AboutDashboard;
