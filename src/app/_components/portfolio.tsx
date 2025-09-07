"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Project {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  coverImage: string;
  technologies: string[];
  featured: boolean;
}

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects?featured=true&limit=3");

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setPortfolioItems(data.projects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl mb-4">
            Our <span className="brand-gradient-for-text">Success Stories</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Witness the transformation: Our AI integration portfolio showcases
            how we have turned challenges into competitive advantages for
            businesses across Romania.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700"
              >
                <div className="h-48 bg-gray-700 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-700 rounded animate-pulse mb-3"></div>
                  <div className="h-16 bg-gray-700/60 rounded animate-pulse mb-4"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-6 w-20 bg-gray-700/40 rounded-full animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-3 text-center py-10">
              <p className="text-red-400">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                Try Again
              </button>
            </div>
          ) : portfolioItems.length === 0 ? (
            <div className="col-span-3 text-center py-10 text-gray-400">
              No projects found
            </div>
          ) : (
            portfolioItems.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 transition-all hover:-translate-y-2 hover:shadow-xl relative"
              >
                {/* Mobile Tap Indicator - Only visible on small screens */}
                <div className="absolute top-2 right-2 sm:hidden z-10 animate-pulse">
                  <div className="bg-lime-500/90 text-gray-900 rounded-full px-3 py-1 text-sm font-medium flex items-center shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Tap to View
                  </div>
                </div>

                <div className="h-48 relative overflow-hidden">
                  {item.coverImage ? (
                    <div className="w-full h-full relative">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                  ) : (
                    <div className="h-full brand-gradient-for-bg"></div>
                  )}
                  <div className="absolute inset-0 bg-black/50 items-center justify-center opacity-0 hover:opacity-100 transition-opacity hidden sm:flex">
                    <a
                      href={`/projects/${item.slug}`}
                      className="px-4 py-2 rounded-full font-medium brand-gradient-for-bg text-gray-900"
                    >
                      View Details
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-800/50 text-lime-400 border border-lime-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.technologies.length > 3 && (
                      <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-800/50 text-gray-400">
                        +{item.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Mobile view button - Only visible on small screens */}
                  <div className="mt-4 sm:hidden">
                    <a
                      href={`/projects/${item.slug}`}
                      className="w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium brand-gradient-for-bg text-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
