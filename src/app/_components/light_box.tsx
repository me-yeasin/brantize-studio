"use client";

import Image from "next/image";
import { useEffect } from "react";

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}

const Lightbox = ({ isOpen, imageSrc, onClose }: LightboxProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-5xl max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl hover:text-lime-400 transition-colors z-10"
        >
          &times;
        </button>
        <Image
          src={imageSrc}
          alt="Project gallery"
          width={500}
          height={500}
          priority
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default Lightbox;
