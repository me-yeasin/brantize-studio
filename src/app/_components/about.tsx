"use client";

import { useEffect, useState } from "react";

interface Stat {
  label: string;
  value: string;
}

interface AboutData {
  paragraphs: string[];
  stats: Stat[];
  _id?: string;
}

const About = () => {
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState<AboutData>({
    paragraphs: [
      "We are a team of AI specialists, data scientists, and developers passionate about creating intelligent solutions that transform how businesses operate.",
      "Founded in 2020, we have helped over 50 companies integrate AI into their workflows, resulting in increased efficiency, reduced costs, and improved customer experiences.",
      "Our approach combines cutting-edge AI technology with deep industry knowledge to deliver solutions that are not only innovative but also practical and effective.",
    ],
    stats: [
      { label: "Happy Clients", value: "50+" },
      { label: "AI Agents Created", value: "100+" },
      { label: "Client Satisfaction", value: "98%" },
    ],
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/about");
        if (response.ok) {
          const data = await response.json();
          setAboutData(data);
        }
      } catch (error) {
        console.error("Failed to fetch about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="about-text">
            <h2 className="font-orbitron font-bold text-4xl mb-6">
              About <span className="brand-gradient-for-text">Brandtize</span>
            </h2>

            {loading ? (
              <div className="space-y-4">
                <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
              </div>
            ) : (
              aboutData.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-400 mb-4">
                  {paragraph}
                </p>
              ))
            )}

            <div className="flex flex-wrap gap-8 mt-10">
              {loading ? (
                <>
                  <div className="flex-1 min-w-[120px]">
                    <div className="h-10 bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-800 rounded animate-pulse mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <div className="h-10 bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-800 rounded animate-pulse mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <div className="h-10 bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-800 rounded animate-pulse mt-2"></div>
                  </div>
                </>
              ) : (
                aboutData.stats.map((stat, index) => (
                  <div key={index} className="flex-1 min-w-[120px]">
                    <div className="font-orbitron font-bold text-5xl text-lime-400">
                      {stat.value}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="about-visual h-[400px] bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 flex items-center justify-center">
            <div className="w-4/5 h-4/5 relative">
              <div className="absolute inset-0 brand-gradient-for-bg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
