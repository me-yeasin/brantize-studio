const Portfolio = () => {
  const portfolioItems = [
    {
      title: "Smart Email Responder for TechCorp",
      description:
        "Implemented an AI-powered email automation system that reduced response time by 85% and improved customer satisfaction.",
      tags: ["Email Automation", "NLP", "Customer Service"],
    },
    {
      title: "Financial Data Analyzer for InvestBank",
      description:
        "Created a custom AI agent that analyzes market trends and generates investment reports, saving analysts 20 hours per week.",
      tags: ["Data Analysis", "Finance", "Reporting"],
    },
    {
      title: "Document Summarizer for LegalCorp",
      description:
        "Developed an AI system that processes and summarizes legal documents, reducing review time by 70% while maintaining accuracy.",
      tags: ["Document Processing", "Legal", "NLP"],
    },
  ];

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl mb-4">
            Our <span className="brand-gradient-for-text">Success Stories</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our portfolio of AI integration projects that have
            transformed businesses across various industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="h-48 brand-gradient-for-bg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button className="px-4 py-2 rounded-full font-medium brand-gradient-for-bg text-gray-900">
                    View Details
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-800/50 text-lime-400 border border-lime-400/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
