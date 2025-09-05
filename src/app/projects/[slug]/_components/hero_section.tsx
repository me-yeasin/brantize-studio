import Image from "next/image";

import { Post } from "../_model/post";

interface HeroSectionProps {
  projectData: Post;
  scrollToSection: (section: string) => void;
}
const HeroSection = ({ projectData, scrollToSection }: HeroSectionProps) => {
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
            <Image
              src={projectData.coverImage}
              alt="Email Automation Project"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-lime-400/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
