import { Post } from "../_model/post";

interface ProcessSectionProps {
  projectData: Post;
}
const ProcessSection = ({ projectData }: ProcessSectionProps) => {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl mb-4 relative inline-block">
            Implementation{" "}
            <span className="bg-gradient-to-r from-purple-600 to-lime-400 bg-clip-text text-transparent">
              Process
            </span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-600 to-lime-400"></span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            How we brought the Smart Email Responder to life for TechCorp.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-lime-400 transform -translate-x-1/2 hidden md:block"></div>

          {projectData.process.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-lime-400 flex items-center justify-center text-2xl text-gray-900 shadow-lg shadow-purple-600/40 z-10">
                  <i className={step.icon}></i>
                </div>
              </div>
              <div className="md:w-1/2 md:px-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 transition-all hover:-translate-y-2 hover:shadow-xl">
                  <h3 className="text-xl font-bold mb-3 text-lime-400">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
