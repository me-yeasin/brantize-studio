const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="about-text">
            <h2 className="font-orbitron font-bold text-4xl mb-6">
              About <span className="brand-gradient-for-text">NeuralForge</span>
            </h2>
            <p className="text-gray-400 mb-4">
              We are a team of AI specialists, data scientists, and developers
              passionate about creating intelligent solutions that transform how
              businesses operate.
            </p>
            <p className="text-gray-400 mb-4">
              Founded in 2020, we have helped over 50 companies integrate AI
              into their workflows, resulting in increased efficiency, reduced
              costs, and improved customer experiences.
            </p>
            <p className="text-gray-400 mb-8">
              Our approach combines cutting-edge AI technology with deep
              industry knowledge to deliver solutions that are not only
              innovative but also practical and effective.
            </p>

            <div className="flex flex-wrap gap-8 mt-10">
              <div className="flex-1 min-w-[120px]">
                <div className="font-orbitron font-bold text-5xl text-lime-400">
                  50+
                </div>
                <div className="text-gray-400">Happy Clients</div>
              </div>
              <div className="flex-1 min-w-[120px]">
                <div className="font-orbitron font-bold text-5xl text-lime-400">
                  100+
                </div>
                <div className="text-gray-400">AI Agents Created</div>
              </div>
              <div className="flex-1 min-w-[120px]">
                <div className="font-orbitron font-bold text-5xl text-lime-400">
                  98%
                </div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="about-visual h-[400px] bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 flex items-center justify-center">
            <div className="w-4/5 h-4/5 relative">
              <div className="absolute inset-0 brand-gradient-for-bg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
