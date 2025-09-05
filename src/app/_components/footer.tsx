"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaMediumM,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

interface SocialMediaLink {
  _id: string;
  platform: string;
  url: string;
  isActive: boolean;
}

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch("/api/social-media");
        if (response.ok) {
          const data = await response.json();
          setSocialLinks(data);
        }
      } catch (error) {
        console.error("Failed to fetch social media links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  // Social media icon mapping
  const socialIcons = {
    Twitter: <FaTwitter size={18} />,
    LinkedIn: <FaLinkedinIn size={18} />,
    GitHub: <FaGithub size={18} />,
    Medium: <FaMediumM size={18} />,
    Instagram: <FaInstagram size={18} />,
    Facebook: <FaFacebookF size={18} />,
    YouTube: <FaYoutube size={18} />,
  };

  const footerLinks = {
    services: [
      "Auto Email Responder",
      "Document Summarizer",
      "Data Analysis Agent",
      "Customer Support Bot",
      "Custom AI Development",
    ],
    company: ["About Us", "Blog", "Contact"],
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
              Brandtize Studio
            </h3>
            <p className="text-gray-400 mb-6">
              Creating intelligent AI solutions that transform businesses and
              drive growth.
            </p>
            <div className="flex space-x-4">
              {loading
                ? // Loading state - show placeholders
                  [...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-full bg-gray-800 animate-pulse"
                    ></div>
                  ))
                : socialLinks.length > 0
                ? // Show social media links from database
                  socialLinks.map((social) => (
                    <Link
                      key={social._id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-gray-900 hover:-translate-y-1 transition-all"
                      aria-label={`Visit our ${social.platform} page`}
                    >
                      {socialIcons[social.platform as keyof typeof socialIcons]}
                    </Link>
                  ))
                : // Fallback if no links in database
                  [
                    { icon: <FaTwitter size={18} />, name: "Twitter" },
                    { icon: <FaLinkedinIn size={18} />, name: "LinkedIn" },
                    { icon: <FaGithub size={18} />, name: "GitHub" },
                    { icon: <FaMediumM size={18} />, name: "Medium" },
                  ].map((social) => (
                    <Link
                      key={social.name}
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-gray-900 hover:-translate-y-1 transition-all"
                      aria-label={`Visit our ${social.name} page`}
                    >
                      {social.icon}
                    </Link>
                  ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-4 capitalize">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-lime-400 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        if (category === "company" && link === "Blog") {
                          scrollToSection("blog");
                        }
                        if (category === "company" && link === "About Us") {
                          scrollToSection("about");
                        }
                        if (category === "company" && link === "Contact") {
                          scrollToSection("contact");
                        }
                      }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; 2023 Brandtize Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
