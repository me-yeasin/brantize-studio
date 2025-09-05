"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathName = usePathname();
  const isDashboard = pathName.startsWith("/dashboard");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
                    className="text-gray-400 font-medium hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:brand-gradient-for-bg after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="flex space-x-4">
          <button
            onClick={() =>
              (document.getElementById("authModal")!.style.display = "flex")
            }
            className="px-4 py-2 rounded-full font-medium border border-gray-700 text-white hover:bg-gray-800/50 hover:border-lime-400 hover:text-lime-400 transition-all"
          >
            Log In
          </button>
          <button
            onClick={() =>
              (document.getElementById("authModal")!.style.display = "flex")
            }
            className="px-4 py-2 rounded-full font-medium brand-gradient-for-bg text-gray-900 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:-translate-y-0.5 transition-all"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
