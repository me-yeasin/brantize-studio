"use client";

import Lightbox from "@/app/_components/light_box";
import ProjectChat from "@/components/chat/ProjectChat";
import AuthModal from "@/overlays/auth_modal";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import CtaSection from "./_components/cta_section";
import DetailSection from "./_components/detail_section";
import FeatureSection from "./_components/feature_section";
import GallerySection from "./_components/gallery_section";
import HeroSection from "./_components/hero_section";
import ProcessSection from "./_components/process_section";
import RelatedProject from "./_components/related_project";
import ResultSection from "./_components/result_section";
import TestimonialSection from "./_components/testimonial_section";
import { Post } from "./_model/post";

export default function ProjectDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);
  const countersRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<Post | null>(null);

  // Fetch project data
  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const res = await fetch(`/api/projects/${resolvedParams.slug}`);

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Project not found");
          } else {
            throw new Error("Failed to fetch project");
          }
        }

        const data = await res.json();

        // Transform data to match the Post interface
        const project = data.project;

        // Map the DB model to the Post interface required by components
        const mappedProject: Post = {
          coverImage: project.coverImage,
          title: project.title,
          slug: project.slug,
          subtitle: project.excerpt,
          description: project.description,
          videoUrl: project.videoUrl || "",
          completedDate: new Date(project.publishedAt).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
            }
          ),
          duration: project.duration || "3 months",
          industry: project.industry || "Technology",
          tags: project.technologies || [],
          challenge: project.challenge || project.description,
          solution: project.solution || project.description,
          implementation: project.implementation || project.description,
          technologies: project.technologies || [],
          team: project.team || ["Project Team"],
          client: project.client,
          live: project.live || "",
          features:
            project.features?.map((feature: string) => ({
              icon: "fas fa-check", // Default icon as it's not in DB schema
              title: feature,
              description: feature,
            })) || [],
          process:
            project.process?.map(
              (step: {
                title: string;
                description: string;
                image?: string;
              }) => ({
                icon: "fas fa-arrow-right", // Default icon
                title: step.title,
                description: step.description,
              })
            ) || [],
          gallery: project.gallery || [],
          results: project.results?.map(
            (result: { title: string; value: string; icon?: string }) => ({
              value: parseInt(result.value) || 0,
              label: result.title,
            })
          ) || [
            { value: 85, label: "Success Rate" },
            { value: 90, label: "Client Satisfaction" },
            { value: 75, label: "Efficiency Increase" },
            { value: 65, label: "Cost Reduction" },
          ],
          testimonial: project.testimonial
            ? {
                content: project.testimonial.content,
                author: project.testimonial.author,
                position: project.testimonial.position,
                initials: project.testimonial.author
                  ? project.testimonial.author
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                  : "AA",
              }
            : {
                content: "Great work!",
                author: "Client",
                position: "Position",
                initials: "CL",
              },
          relatedProjects: project.relatedProjects
            ? project.relatedProjects.map(
                (related: {
                  title: string;
                  excerpt: string;
                  coverImage: string;
                }) => ({
                  title: related.title,
                  description: related.excerpt,
                  image: related.coverImage,
                })
              )
            : [],
        };

        setProjectData(mappedProject);
        setError(null);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setProjectData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [resolvedParams.slug]);

  // Open lightbox with selected image
  const openLightbox = (image: string) => {
    setCurrentImage(image);
    setIsLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Handle scroll events for showing back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animate counters
  useEffect(() => {
    if (loading || !projectData || !projectData.results) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const interval = setInterval(() => {
            setCounters((prev) => {
              const newCounters = [...prev];
              let allDone = true;

              if (projectData && projectData.results) {
                for (let i = 0; i < projectData.results.length; i++) {
                  if (newCounters[i] < projectData.results[i].value) {
                    newCounters[i] += Math.ceil(
                      projectData.results[i].value / 50
                    );
                    allDone = false;
                  }
                  if (newCounters[i] >= projectData.results[i].value) {
                    newCounters[i] = projectData.results[i].value;
                  }
                }
              }

              if (allDone) {
                clearInterval(interval);
              }

              return newCounters;
            });
          }, 30);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.1 }
    );

    const currentCountersRef = countersRef.current;

    if (currentCountersRef) {
      observer.observe(currentCountersRef);
    }

    return () => {
      if (currentCountersRef) {
        observer.unobserve(currentCountersRef);
      }
    };
  }, [loading, projectData]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-lime-400 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-orbitron font-bold mb-4">
            Error Loading Project
          </h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <Link
            href="/#portfolio"
            className="px-6 py-3 rounded-full bg-gradient-to-br from-purple-600 to-lime-400 text-gray-900 font-medium hover:opacity-90 transition-opacity"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // Not found state
  if (!projectData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-orbitron font-bold mb-4">
            Project Not Found
          </h2>
          <p className="text-gray-300 mb-6">
            The project you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/#portfolio"
            className="px-6 py-3 rounded-full bg-gradient-to-br from-purple-600 to-lime-400 text-gray-900 font-medium hover:opacity-90 transition-opacity"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <HeroSection
        projectData={projectData}
        scrollToSection={(section) => {
          const element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />

      {/* Detail Section */}
      <DetailSection projectData={projectData} />

      {/* Feature Section */}
      <FeatureSection projectData={projectData} />

      {/* Process Section */}
      <ProcessSection projectData={projectData} />

      {/* Gallery Section */}
      <GallerySection projectData={projectData} openLightbox={openLightbox} />

      {/* Results Section */}
      <ResultSection
        projectData={projectData}
        counters={counters}
        counterRef={countersRef}
      />

      {/* Testimonial Section */}
      {projectData.testimonial && (
        <TestimonialSection projectData={projectData} />
      )}

      {/* Related Projects */}
      {projectData.relatedProjects &&
        projectData.relatedProjects.length > 0 && (
          <RelatedProject projectData={projectData} />
        )}

      {/* Call to Action */}
      <CtaSection />

      {/* Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        imageSrc={currentImage}
      />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-lime-400 flex items-center justify-center text-gray-900 shadow-lg transition-all z-30 ${
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

      {/* Project Chat Component */}
      {projectData && <ProjectChat projectData={projectData} />}

      <AuthModal />
    </div>
  );
}
