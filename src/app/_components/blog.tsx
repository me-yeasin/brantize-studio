const Blog = () => {
  const blogPosts = [
    {
      title:
        "The Future of Business Automation: How AI is Transforming Industries",
      excerpt:
        "Explore how artificial intelligence is revolutionizing business processes across industries, from healthcare to finance. Discover the latest trends, real-world applications, and what the future holds for AI-driven automation.",
      category: "Featured",
      date: "May 15, 2023",
      author: "Alex Johnson",
      featured: true,
    },
    {
      title: "5 Ways AI Email Responders Are Revolutionizing Customer Service",
      excerpt:
        "Discover how AI-powered email responders are transforming customer service departments, improving response times, and enhancing customer satisfaction across industries.",
      category: "Technology",
      date: "May 10, 2023",
      author: "Sarah Chen",
      featured: false,
    },
    {
      title: "Step-by-Step Guide to Integrating AI into Your Existing Workflow",
      excerpt:
        "A comprehensive guide on how to seamlessly integrate AI solutions into your current business processes without disrupting operations. Learn best practices and common pitfalls to avoid.",
      category: "Implementation",
      date: "May 5, 2023",
      author: "Michael Torres",
      featured: false,
    },
    {
      title:
        "Case Study: How a Financial Firm Saved 20 Hours Weekly with AI Data Analysis",
      excerpt:
        "Dive deep into how a mid-sized financial firm implemented our AI data analysis solution and transformed their reporting process, saving countless hours and improving accuracy.",
      category: "Case Study",
      date: "April 28, 2023",
      author: "Emma Wilson",
      featured: false,
    },
    {
      title:
        "The Evolution of Natural Language Processing in Business Applications",
      excerpt:
        "Explore the remarkable advancements in NLP technology and how it's enabling more sophisticated business applications, from document summarization to intelligent chatbots.",
      category: "Innovation",
      date: "April 22, 2023",
      author: "David Park",
      featured: false,
    },
    {
      title: "Building an AI-First Culture: Leadership Strategies for Success",
      excerpt:
        "Learn how to foster an AI-first culture within your organization. We share leadership strategies, change management techniques, and success metrics for AI adoption.",
      category: "Strategy",
      date: "April 15, 2023",
      author: "Lisa Anderson",
      featured: false,
    },
  ];

  return (
    <section id="blog" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl mb-4">
            Latest{" "}
            <span className="bg-gradient-to-r from-purple-600 to-lime-400 bg-clip-text text-transparent">
              AI Insights
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Stay updated with the latest trends, innovations, and best practices
            in AI integration and automation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Blog Post */}
          <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 transition-all hover:-translate-y-2 hover:shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-lime-400 text-gray-900">
                  Featured
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <span className="flex items-center mr-4">
                    <i className="far fa-calendar mr-2 text-lime-400"></i>{" "}
                    {blogPosts[0].date}
                  </span>
                  <span className="flex items-center">
                    <i className="far fa-user mr-2 text-lime-400"></i>{" "}
                    {blogPosts[0].author}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {blogPosts[0].title}
                </h3>
                <p className="text-gray-400 mb-6">{blogPosts[0].excerpt}</p>
                <button className="text-lime-400 font-medium hover:text-white transition-colors flex items-center w-fit">
                  Read More{" "}
                  <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Regular Blog Posts */}
          {blogPosts.slice(1).map((post, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 transition-all hover:-translate-y-2 hover:shadow-xl flex flex-col"
            >
              <div className="h-48 relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-lime-400 text-gray-900">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <span className="flex items-center mr-4">
                    <i className="far fa-calendar mr-2 text-lime-400"></i>{" "}
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <i className="far fa-user mr-2 text-lime-400"></i>{" "}
                    {post.author}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{post.excerpt}</p>
                <button className="text-lime-400 font-medium hover:text-white transition-colors flex items-center w-fit">
                  Read More{" "}
                  <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
