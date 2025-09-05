import { Post } from "../_model/post";

interface DetailSectionProps {
  projectData: Post;
}
const DetailSection = ({ projectData }: DetailSectionProps) => {
  return (
    <section id="details" className="py-20 bg-gray-950 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl mb-4 relative inline-block">
            Project{" "}
            <span className="bg-gradient-to-r from-purple-600 to-lime-400 bg-clip-text text-transparent">
              Details
            </span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-600 to-lime-400"></span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Learn more about the challenges, solutions, and technologies used in
            this project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-5 text-lime-400 relative pl-5">
                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-4/5 bg-lime-400 rounded-full"></span>
                The Challenge
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {projectData.challenge}
              </p>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-5 text-lime-400 relative pl-5">
                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-4/5 bg-lime-400 rounded-full"></span>
                Our Solution
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                {projectData.solution}
              </p>
              {/* <p className="text-gray-400 text-lg leading-relaxed">
                The solution integrates seamlessly with TechCorps existing CRM
                and ticketing systems, ensuring a smooth workflow for human
                agents when escalation is needed. It includes features like
                sentiment analysis, priority detection, and automatic routing to
                the appropriate departments.
              </p> */}
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-5 text-lime-400 relative pl-5">
                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-4/5 bg-lime-400 rounded-full"></span>
                Implementation Process
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {projectData.implementation}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-xl sticky top-24">
              <div className="mb-6 pb-6 border-b border-gray-700">
                <h4 className="text-xl font-bold mb-4 text-lime-400 flex items-center">
                  <i className="fas fa-cogs mr-2"></i>
                  Technologies Used
                </h4>
                <ul className="space-y-2">
                  {projectData.technologies.map((tech, index) => (
                    <li key={index} className="text-gray-400 flex items-center">
                      <span className="text-lime-400 mr-2">•</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 pb-6 border-b border-gray-700">
                <h4 className="text-xl font-bold mb-4 text-lime-400 flex items-center">
                  <i className="fas fa-users mr-2"></i>
                  Team
                </h4>
                <ul className="space-y-2">
                  {projectData.team.map((member, index) => (
                    <li key={index} className="text-gray-400 flex items-center">
                      <span className="text-lime-400 mr-2">•</span>
                      {member}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4 text-lime-400 flex items-center">
                  <i className="fas fa-building mr-2"></i>
                  Client
                </h4>
                <p className="text-gray-400">{projectData.client}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailSection;
