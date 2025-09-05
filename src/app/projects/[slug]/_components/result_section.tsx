import { Post } from "../_model/post";

interface ResultSectionProps {
  projectData: Post;
  counterRef: React.RefObject<null>;
  counters: number[];
}
const ResultSection = ({
  projectData,
  counterRef,
  counters,
}: ResultSectionProps) => {
  return (
    <section className="py-20 bg-gray-950" ref={counterRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl mb-4 relative inline-block">
            Project{" "}
            <span className="bg-gradient-to-r from-purple-600 to-lime-400 bg-clip-text text-transparent">
              Results
            </span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-600 to-lime-400"></span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Measurable impact of the Smart Email Responder implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projectData.results.map((result, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 text-center transition-all hover:-translate-y-4 hover:shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-lime-400"></div>
              <div className="font-orbitron font-bold text-5xl text-lime-400 mb-4 relative">
                {counters[index]}
                <span className="absolute top-2 right-0 text-2xl text-purple-600">
                  %
                </span>
              </div>
              <div className="text-gray-400 text-lg">{result.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultSection;
