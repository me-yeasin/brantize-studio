"use client";

import { useState } from "react";
import Analytics from "./_components/analytics";
import Blogs from "./_components/blogs";
import Overview from "./_components/overview";
import Projects from "./_components/projects";
import Settings from "./_components/settings";
import Sidebar from "./_components/sidebar";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Function to render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "blogs":
        return <Blogs />;
      case "projects":
        return <Projects />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 z-30 py-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center font-orbitron font-black text-2xl">
            <span className="brand-gradient-for-text">Brandtize</span>
          </div>
          <button
            onClick={() => {
              const mobileMenu = document.getElementById("mobileSidebar");
              if (mobileMenu) {
                mobileMenu.classList.toggle("translate-x-0");
                mobileMenu.classList.toggle("-translate-x-full");
              }
            }}
            className="text-white p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar (hidden by default) */}
      <div
        id="mobileSidebar"
        className="md:hidden fixed inset-y-0 left-0 transform -translate-x-full transition duration-300 ease-in-out z-40 w-64 bg-gray-800 border-r border-gray-700 shadow-xl"
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => {
              const mobileMenu = document.getElementById("mobileSidebar");
              if (mobileMenu) {
                mobileMenu.classList.toggle("-translate-x-full");
              }
            }}
            className="text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
        {renderTabContent()}
      </div>
    </div>
  );
}
