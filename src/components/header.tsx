"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathName = usePathname();
  const isDashboard = pathName.startsWith("/dashboard");

  useEffect(() => {
    const handleScroll = () => {
      // Handle scrolled state for header background
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Only check sections if we're on the home page
      if (pathName === "/") {
        // Get all section elements
        const sections = [
          "home",
          "services",
          "portfolio",
          "blog",
          "about",
          "contact",
        ];

        // Find which section is currently most visible in the viewport
        let currentSection = "home";
        let maxVisibility = 0;

        sections.forEach((sectionId) => {
          const section = document.getElementById(sectionId);
          if (section) {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate how much of the section is visible in the viewport
            const visibleHeight =
              Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            const visibilityRatio =
              visibleHeight > 0 ? visibleHeight / section.offsetHeight : 0;

            if (visibilityRatio > maxVisibility) {
              maxVisibility = visibilityRatio;
              currentSection = sectionId;
            }
          }
        });

        setActiveSection(currentSection);
      }
    };

    // Listen for the custom event from ScrollHandler
    const handleActivateSection = (event: Event) => {
      // Cast event to CustomEvent with our expected detail shape
      const customEvent = event as CustomEvent<{ sectionId: string }>;
      if (customEvent.detail && customEvent.detail.sectionId) {
        setActiveSection(customEvent.detail.sectionId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("activateSection", handleActivateSection);

    // Run the scroll handler once on mount to set initial active section
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("activateSection", handleActivateSection);
    };
  }, [pathName]);

  const scrollToSection = (sectionId: string) => {
    // Update the active section immediately for better UX
    setActiveSection(sectionId);

    // Check if we're on the home page
    if (pathName === "/") {
      // We're already on the home page, just scroll to the section
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 100,
          behavior: "smooth",
        });
      }
    } else {
      // We're not on the home page, navigate to home page with the section hash
      // Using the hash in the URL will trigger the ScrollHandler component
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/90 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent"
      } ${isDashboard ? "hidden" : ""}`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a
          href="#"
          className="flex items-center font-orbitron font-black text-2xl text-white"
        >
          <i className="fas fa-brain text-lime-400 mr-2.5 text-3xl"></i>
          <span className="brand-gradient-for-text">Brandtize</span>
        </a>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {["home", "services", "portfolio", "blog", "about", "contact"].map(
              (item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className={`font-medium transition-colors relative 
                      ${
                        activeSection === item
                          ? "text-white after:w-full"
                          : "text-gray-400 hover:text-white after:w-0 hover:after:w-full"
                      } 
                      after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 
                      after:brand-gradient-for-bg after:transition-all after:duration-300`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>

        <button
          onClick={() => scrollToSection("contact")}
          className="px-6 py-2 rounded-full font-medium brand-gradient-for-bg text-gray-900 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:-translate-y-0.5 transition-all"
        >
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
