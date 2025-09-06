"use client";

import Lightbox from "@/app/_components/light_box";
import ProjectChat from "@/components/chat/ProjectChat";
import AuthModal from "@/overlays/auth_modal";
import { useEffect, useRef, useState } from "react";
import { Post } from "../_model/post";
import CtaSection from "./cta_section";
import DetailSection from "./detail_section";
import FeatureSection from "./feature_section";
import GallerySection from "./gallery_section";
import HeroSection from "./hero_section";
import ProcessSection from "./process_section";
import RelatedProject from "./related_project";
import ResultSection from "./result_section";
import TestimonialSection from "./testimonial_section";

export default function ProjectDetailsClient({
  projectData,
}: {
  projectData: Post;
}) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);
  const countersRef = useRef<HTMLDivElement>(null);

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
    if (!projectData || !projectData.results) return;

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
  }, [projectData]);

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
      <ProjectChat projectData={projectData} />

      <AuthModal />
    </div>
  );
}
