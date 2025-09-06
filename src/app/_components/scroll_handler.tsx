"use client";

import { useEffect } from "react";

export default function ScrollHandler() {
  useEffect(() => {
    // Function to handle scrolling to the section
    const handleScroll = (retryCount = 0) => {
      if (window.location.hash) {
        // Remove the # from the hash to get the section ID
        const sectionId = window.location.hash.substring(1);

        // Try to find the section
        const section = document.getElementById(sectionId);
        if (section) {
          // Trigger a custom event that the header can listen for
          const event = new CustomEvent("activateSection", {
            detail: { sectionId },
          });
          window.dispatchEvent(event);

          // Scroll to the section with an offset for the header
          window.scrollTo({
            top: section.offsetTop - 100, // Match the offset in header.tsx
            behavior: "smooth",
          });
        } else if (retryCount < 3) {
          // Retry a few times if the section is not found
          // This helps when navigating from another page and DOM might not be fully ready
          setTimeout(() => handleScroll(retryCount + 1), 300);
        }
      }
    };

    // Create a wrapper for event listeners that don't pass parameters
    const hashChangeHandler = () => handleScroll(0);

    // Initial attempt with a delay to ensure DOM is fully loaded
    // Use a longer delay when first loading the page
    const timeoutId = setTimeout(() => handleScroll(0), 500);

    // Also listen for hash changes while on the page
    window.addEventListener("hashchange", hashChangeHandler);

    // Clean up
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("hashchange", hashChangeHandler);
    };
  }, []);

  return null; // This component doesn't render anything
}
