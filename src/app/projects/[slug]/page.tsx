"use client";

import Lightbox from "@/app/_components/light_box";
import AuthModal from "@/overlays/auth_modal";
import { useEffect, useRef, useState } from "react";
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

export default function ProjectDetails({}: // params is commented out since it's not currently used
// params,
{
  params: Promise<{ slug: string }>;
}) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const countersRef = useRef(null);

  // Sample project data - in a real app, this would come from an API or database
  const projectData: Post = {
    title: "Smart Email Responder for TechCorp",
    slug: "smart-email-responder-techcorp",
    subtitle: "AI-Powered Customer Service Solution",
    description:
      "TechCorp, a leading technology solutions provider, was struggling with high email volume and slow response times. Our team developed an AI-powered email automation system that transformed their customer service operations, resulting in dramatic improvements in efficiency and customer satisfaction.",
    completedDate: "May 2023",
    duration: "3 months",
    industry: "Technology",
    tags: ["Email Automation", "NLP", "Customer Service", "AI Integration"],
    challenge:
      "TechCorp was receiving over 2,000 customer emails per day with a small support team. Response times averaged 24 hours, leading to customer dissatisfaction and increased churn. Manual email processing was inefficient, prone to errors, and couldn't scale with their growing customer base. They needed a solution that could handle high volume while maintaining quality and personalization.",
    solution:
      "We developed an intelligent email automation system using advanced Natural Language Processing (NLP) and machine learning algorithms. The system analyzes incoming emails, categorizes them by intent and priority, and generates personalized responses that match TechCorp's brand voice. The AI was trained on thousands of historical emails to understand context, sentiment, and appropriate responses.",
    implementation:
      "Our implementation followed a structured approach: discovery and analysis, system design, development, training and testing, and deployment. We worked closely with TechCorp's team throughout the process to ensure the solution met their specific needs and requirements. The system was deployed in phases to minimize disruption and allow for continuous improvement based on feedback.",
    technologies: [
      "Natural Language Processing",
      "Machine Learning",
      "Python & TensorFlow",
      "API Integration",
      "Cloud Deployment",
    ],
    team: [
      "2 AI Engineers",
      "1 Data Scientist",
      "1 Project Manager",
      "1 UX Designer",
    ],
    client:
      "TechCorp is a leading technology solutions provider with over 10,000 customers worldwide, specializing in enterprise software and IT services.",
    features: [
      {
        icon: "fas fa-brain",
        title: "Intelligent Analysis",
        description:
          "Advanced NLP algorithms understand email context, sentiment, and intent with 95% accuracy.",
      },
      {
        icon: "fas fa-comments",
        title: "Personalized Responses",
        description:
          "Generates context-aware responses that match your brand voice and customer expectations.",
      },
      {
        icon: "fas fa-tachometer-alt",
        title: "Real-time Processing",
        description:
          "Processes and responds to emails in seconds, dramatically reducing wait times.",
      },
      {
        icon: "fas fa-chart-line",
        title: "Analytics Dashboard",
        description:
          "Comprehensive analytics provide insights into response times, customer satisfaction, and more.",
      },
      {
        icon: "fas fa-plug",
        title: "Seamless Integration",
        description:
          "Integrates with existing CRM, ticketing, and communication systems effortlessly.",
      },
      {
        icon: "fas fa-shield-alt",
        title: "Enterprise Security",
        description:
          "Built with security first, ensuring data privacy and compliance with regulations.",
      },
    ],
    process: [
      {
        icon: "fas fa-search",
        title: "Discovery & Analysis",
        description:
          "We conducted in-depth interviews with stakeholders and analyzed thousands of historical emails to understand patterns and requirements.",
      },
      {
        icon: "fas fa-drafting-compass",
        title: "System Design",
        description:
          "Created a detailed architecture plan including data flow, integration points, and user experience design.",
      },
      {
        icon: "fas fa-code",
        title: "Development",
        description:
          "Built the core AI engine, user interface, and integration components using agile methodology.",
      },
      {
        icon: "fas fa-vial",
        title: "Testing & Training",
        description:
          "Rigorous testing including unit tests, integration tests, and user acceptance testing with TechCorp's team.",
      },
      {
        icon: "fas fa-rocket",
        title: "Deployment & Support",
        description:
          "Phased rollout to minimize disruption, with comprehensive training and ongoing support.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    results: [
      { value: 85, label: "Reduction in Response Time" },
      { value: 92, label: "Customer Satisfaction" },
      { value: 60, label: "Decrease in Support Costs" },
      { value: 40, label: "Increase in Team Productivity" },
    ],
    testimonial: {
      content:
        "NeuralForge's Smart Email Responder has transformed our customer service operations. We've seen dramatic improvements in response times and customer satisfaction, while reducing operational costs. The team was professional, knowledgeable, and delivered exactly what they promised. The implementation was smooth, and the ongoing support has been exceptional.",
      author: "Sarah Mitchell",
      position: "VP of Customer Experience, TechCorp",
      initials: "SM",
    },
    relatedProjects: [
      {
        title: "Financial Data Analyzer for InvestBank",
        description:
          "Created a custom AI agent that analyzes market trends and generates investment reports.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "Document Summarizer for LegalCorp",
        description:
          "Developed an AI system that processes and summarizes legal documents efficiently.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "Customer Support Bot for RetailCorp",
        description:
          "Implemented 24/7 intelligent customer support that handles inquiries and resolves issues.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
    ],
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate counters when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const interval = setInterval(() => {
            setCounters((prev) => {
              const newCounters = [...prev];
              let allComplete = true;

              for (let i = 0; i < newCounters.length; i++) {
                if (newCounters[i] < projectData.results[i].value) {
                  newCounters[i] += Math.ceil(
                    projectData.results[i].value / 50
                  );
                  allComplete = false;
                } else {
                  newCounters[i] = projectData.results[i].value;
                }
              }

              if (allComplete) {
                clearInterval(interval);
              }

              return newCounters;
            });
          }, 30);

          observer.disconnect();
        }
      },
      { threshold: 0.7 }
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
  }, [projectData.results]);

  // Open lightbox with image
  const openLightbox = (imageSrc: string) => {
    setCurrentImage(imageSrc);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        imageSrc={currentImage}
        onClose={closeLightbox}
      />

      {/* Project Hero Section */}
      <HeroSection
        projectData={projectData}
        scrollToSection={scrollToSection}
      />

      {/* Project Details Section */}
      <DetailSection projectData={projectData} />

      {/* Features Section */}
      <FeatureSection projectData={projectData} />

      {/* Process Section */}
      <ProcessSection projectData={projectData} />

      {/* Gallery Section */}
      <GallerySection projectData={projectData} openLightbox={openLightbox} />

      {/* Results Section */}
      <ResultSection
        counterRef={countersRef}
        counters={counters}
        projectData={projectData}
      />

      {/* Testimonials Section */}
      <TestimonialSection projectData={projectData} />

      {/* Related Projects Section */}
      <RelatedProject projectData={projectData} />

      {/* CTA Section */}
      <CtaSection />

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
    </div>
  );
}
