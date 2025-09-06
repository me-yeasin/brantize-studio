import Image from "next/image";
import { useEffect, useState } from "react";
import { Post } from "../_model/post";

interface HeroSectionProps {
  projectData: Post;
  scrollToSection: (section: string) => void;
}

const HeroSection = ({ projectData, scrollToSection }: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasVideo, setHasVideo] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoType, setVideoType] = useState<"youtube" | "vimeo" | "other">(
    "other"
  );

  // Extract video ID and information from URL
  const extractVideoInfo = (
    url: string | undefined
  ): {
    id: string;
    originalUrl: string;
    type: "youtube" | "vimeo" | "other";
  } => {
    if (!url) return { id: "", originalUrl: "", type: "other" };

    // Handle YouTube URLs
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = "";

      if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0] || "";
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
      } else if (url.includes("youtube.com/embed/")) {
        videoId = url.split("embed/")[1]?.split("?")[0] || "";
      }

      return {
        id: videoId,
        originalUrl: url,
        type: "youtube",
      };
    }

    // Handle Vimeo URLs
    if (url.includes("vimeo.com")) {
      const vimeoId = url.split("vimeo.com/")[1]?.split("?")[0] || "";

      return {
        id: vimeoId,
        originalUrl: url,
        type: "vimeo",
      };
    }

    // For other URLs or if parsing fails
    return {
      id: "",
      originalUrl: url,
      type: "other",
    };
  };

  // Get thumbnail URL based on video type and ID
  const getThumbnailUrl = (
    type: "youtube" | "vimeo" | "other",
    id: string
  ): string => {
    if (type === "youtube" && id) {
      // YouTube thumbnail - use maxresdefault for best quality
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    } else if (type === "vimeo" && id) {
      // For Vimeo, we can't directly get a thumbnail URL without an API call
      // Instead, use a placeholder or the project's cover image
      return projectData.coverImage;
    }

    return projectData.coverImage;
  };

  // Check if video URL exists and extract video ID
  useEffect(() => {
    if (projectData.videoUrl) {
      const { id, originalUrl, type } = extractVideoInfo(projectData.videoUrl);
      setVideoId(id);
      setVideoUrl(originalUrl);
      setVideoType(type);
      setHasVideo(!!id);
    } else {
      setHasVideo(false);
      setVideoId("");
      setVideoUrl("");
      setVideoType("other");
    }
  }, [projectData.videoUrl]);

  // Total number of items in carousel (1 for image only, 2 if video exists)
  const totalItems = hasVideo ? 2 : 1;

  // Handle navigation
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  // Get thumbnail URL for the video
  const thumbnailUrl = getThumbnailUrl(videoType, videoId);

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%237c4dff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeInUp">
            <h1 className="font-orbitron font-black text-4xl md:text-5xl mb-6 leading-tight">
              {projectData.title.split(" ").map((word, i) =>
                word === "TechCorp" ? (
                  <span
                    key={i}
                    className="bg-gradient-to-r from-purple-600 to-lime-400 bg-clip-text text-transparent"
                  >
                    {word}{" "}
                  </span>
                ) : (
                  word + " "
                )
              )}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6 animate-fadeInUp animation-delay-100">
              <div className="flex items-center bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700 hover:bg-purple-900/20 hover:border-purple-600 transition-all">
                <i className="fas fa-calendar text-lime-400 mr-2"></i>
                <span>Completed: {projectData.completedDate}</span>
              </div>
              <div className="flex items-center bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700 hover:bg-purple-900/20 hover:border-purple-600 transition-all">
                <i className="fas fa-clock text-lime-400 mr-2"></i>
                <span>Duration: {projectData.duration}</span>
              </div>
              <div className="flex items-center bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700 hover:bg-purple-900/20 hover:border-purple-600 transition-all">
                <i className="fas fa-industry text-lime-400 mr-2"></i>
                <span>{projectData.industry}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 animate-fadeInUp animation-delay-200">
              {projectData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-lime-400 bg-gray-800/50 border border-lime-400/30 hover:bg-lime-400/10 hover:border-lime-400 transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-400 mb-8 text-lg animate-fadeInUp animation-delay-300">
              {projectData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-400">
              <button
                onClick={() => scrollToSection("details")}
                className="px-6 py-3 rounded-full font-medium bg-gradient-to-r from-purple-600 to-lime-400 text-gray-900 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:-translate-y-1 transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">View Details</span>
                <span className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3 rounded-full font-medium border border-gray-700 text-white hover:bg-gray-800/50 hover:border-lime-400 hover:text-lime-400 transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">Get Similar Solution</span>
                <span className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </button>
            </div>
          </div>

          <div className="relative h-[500px] rounded-2xl overflow-hidden border border-gray-700 shadow-2xl animate-fadeIn animation-delay-500">
            {/* Carousel Container */}
            <div className="relative w-full h-full">
              {/* Video Thumbnail - Show this first if it exists */}
              {hasVideo && (
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    currentIndex === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <div className="relative w-full h-full bg-black">
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 w-full h-full flex items-center justify-center group"
                    >
                      {/* Video Thumbnail */}
                      <Image
                        src={thumbnailUrl}
                        alt={`${projectData.title} Video Thumbnail`}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
                      <div className="relative z-10 bg-red-600 w-16 h-12 rounded flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-8 h-8"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              )}

              {/* Image Slide - Show this first if no video, or as second slide if video exists */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  (hasVideo && currentIndex === 1) ||
                  (!hasVideo && currentIndex === 0)
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={projectData.coverImage}
                  alt={projectData.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-lime-400/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Navigation Controls - Only show if there's a video */}
              {hasVideo && (
                <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
                  {/* Indicators */}
                  {Array.from({ length: totalItems }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentIndex === index ? "bg-lime-400" : "bg-gray-500"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Arrow Navigation - Only show if there's a video */}
              {hasVideo && (
                <>
                  <button
                    onClick={goToPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors"
                    aria-label="Previous slide"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={goToNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors"
                    aria-label="Next slide"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
