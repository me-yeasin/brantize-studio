import { Post } from "../_model/post";

interface TestimonialSectionProps {
  projectData: Post;
}
const TestimonialSection = ({ projectData }: TestimonialSectionProps) => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl mb-4 relative inline-block">
            Client{" "}
            <span className="bg-gradient-to-r from-purple-600 to-lime-400 bg-clip-text text-transparent">
              Testimonial
            </span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-600 to-lime-400"></span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            What TechCorp has to say about our collaboration.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-10 md:p-16 border border-gray-700 shadow-2xl relative">
            <div className="absolute top-8 left-8 text-8xl text-purple-600 opacity-10 font-serif"></div>
            <p className="text-gray-400 text-xl md:text-2xl italic leading-relaxed relative z-10 mb-10">
              {projectData.testimonial.content}
            </p>

            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-lime-400 flex items-center justify-center text-3xl font-bold text-gray-900 shadow-lg shadow-purple-600/40 mr-6">
                {projectData.testimonial.initials}
              </div>
              <div>
                <h4 className="text-xl font-bold">
                  {projectData.testimonial.author}
                </h4>
                <p className="text-gray-400">
                  {projectData.testimonial.position}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
