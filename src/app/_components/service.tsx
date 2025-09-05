const Services = () => {
  const services = [
    {
      icon: "fas fa-envelope-open-text",
      title: "Auto Email Responder",
      description:
        "Intelligent email automation that understands context and crafts personalized responses, reducing response time by 80%.",
    },
    {
      icon: "fas fa-file-alt",
      title: "Document Summarizer",
      description:
        "Advanced AI that processes and summarizes complex documents, extracting key insights and saving hours of manual work.",
    },
    {
      icon: "fas fa-chart-line",
      title: "Data Analysis Agent",
      description:
        "Transform raw data into actionable insights with our AI-powered analytics agents that identify trends and opportunities.",
    },
    {
      icon: "fas fa-comments",
      title: "Customer Support Bot",
      description:
        "24/7 intelligent customer support that handles inquiries, resolves issues, and escalates when necessary.",
    },
    {
      icon: "fas fa-calendar-check",
      title: "Scheduling Assistant",
      description:
        "Smart scheduling that coordinates with multiple calendars, finds optimal meeting times, and sends reminders.",
    },
    {
      icon: "fas fa-code",
      title: "Custom AI Development",
      description:
        "Tailored AI solutions designed specifically for your unique business challenges and workflow requirements.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl mb-4">
            Our <span className="brand-gradient-for-text">AI Solutions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We specialize in creating custom AI agents that solve real business
            problems and deliver measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 transition-all hover:-translate-y-2 hover:shadow-xl hover:border-gray-600 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 brand-gradient-for-bg"></div>
              <div className="text-4xl text-lime-400 mb-6">
                <i className={service.icon}></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              {/* <button className="px-4 py-2 rounded-full font-medium border border-gray-700 text-white hover:bg-gray-800/50 hover:border-lime-400 hover:text-lime-400 transition-all">
                Learn More
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
