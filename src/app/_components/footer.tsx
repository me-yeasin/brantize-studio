"use client";

const Footer = () => {
  const footerLinks = {
    services: [
      "Auto Email Responder",
      "Document Summarizer",
      "Data Analysis Agent",
      "Customer Support Bot",
      "Custom AI Development",
    ],
    company: ["About Us", "Our Team", "Careers", "Blog", "Contact"],
    resources: [
      "Case Studies",
      "Whitepapers",
      "Documentation",
      "API Reference",
      "Support",
    ],
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="py-16 bg-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-orbitron font-bold text-xl mb-4">
              NeuralForge
            </h3>
            <p className="text-gray-400 mb-6">
              Creating intelligent AI solutions that transform businesses and
              drive growth.
            </p>
            <div className="flex space-x-4">
              {["twitter", "linkedin-in", "github", "medium"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-gray-900 hover:-translate-y-1 transition-all"
                >
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-4 capitalize">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-lime-400 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        if (category === "company" && link === "Blog") {
                          scrollToSection("blog");
                        }
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; 2023 NeuralForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
