import Image from "next/image";
import { Post } from "../_model/post";

interface RealatedProjectProps {
  projectData: Post;
}

const RelatedProject = ({ projectData }: RealatedProjectProps) => {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl mb-4 relative inline-block">
            Related{" "}
            <span className="bg-gradient-to-r from-purple-600 to-lime-400 bg-clip-text text-transparent">
              Projects
            </span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-600 to-lime-400"></span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore other AI integration projects we have completed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.relatedProjects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 transition-all hover:-translate-y-4 hover:shadow-2xl group"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-lime-400">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-5">{project.description}</p>
                <a
                  href="#"
                  className="text-lime-400 font-medium hover:text-white transition-colors flex items-center"
                >
                  View Project{" "}
                  <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProject;
