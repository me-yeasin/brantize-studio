"use client";

import { useEffect } from "react";

const Hero = () => {
  useEffect(() => {
    const neuralNetwork = document.getElementById("neuralNetwork");
    if (!neuralNetwork) return;

    const nodes = [];

    // Create nodes
    for (let i = 0; i < 15; i++) {
      const node = document.createElement("div");
      node.className =
        "absolute w-3.5 h-3.5 bg-lime-400 rounded-full shadow-[0_0_10px_#c6ff00]";

      // Random position within container
      const x = Math.random() * 100;
      const y = Math.random() * 100;

      node.style.left = `${x}%`;
      node.style.top = `${y}%`;

      // Random animation delay
      node.style.animationDelay = `${Math.random() * 3}s`;
      node.classList.add("animate-pulse");

      neuralNetwork.appendChild(node);
      nodes.push({ element: node, x, y });
    }

    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        // Only connect some nodes
        if (Math.random() > 0.7) {
          const connection = document.createElement("div");
          connection.className =
            "absolute h-0.5 bg-gradient-to-r from-transparent via-lime-400/80 to-transparent";

          const node1 = nodes[i];
          const node2 = nodes[j];

          // Calculate distance and angle
          const dx = node2.x - node1.x;
          const dy = node2.y - node1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

          // Only connect if distance is reasonable
          if (distance < 40) {
            connection.style.width = `${distance}%`;
            connection.style.left = `${node1.x}%`;
            connection.style.top = `${node1.y}%`;
            connection.style.transform = `rotate(${angle}deg)`;
            connection.style.transformOrigin = "left center";

            neuralNetwork.appendChild(connection);
          }
        }
      }
    }

    return () => {
      while (neuralNetwork.firstChild) {
        neuralNetwork.removeChild(neuralNetwork.firstChild);
      }
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
    <section
      id="home"
      className="min-h-screen flex items-center relative pt-32 pb-12 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="hero-text">
            <h1 className="font-orbitron font-black text-5xl md:text-6xl mb-5 leading-tight">
              Transform Your Business with{" "}
              <span className="brand-gradient-for-text">AI Integration</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              We create intelligent AI solutions that automate tasks, analyze
              data, and enhance user experiences. Our custom AI agents work
              seamlessly with your existing systems to drive growth and
              efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("portfolio")}
                className="px-6 py-3.5 rounded-full font-medium bg-gradient-to-r from-purple-600 to-lime-400 text-gray-900 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:-translate-y-0.5 transition-all text-lg"
              >
                View Our Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3.5 rounded-full font-medium border border-gray-700 text-white hover:bg-gray-800/50 hover:border-lime-400 hover:text-lime-400 transition-all text-lg"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="hero-visual h-[500px] max-lg:absolute max-lg:top-40 max-lg:inset-x-0 max-lg:-z-10 flex items-center justify-center">
            <div
              className="neural-network w-full h-full relative"
              id="neuralNetwork"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
