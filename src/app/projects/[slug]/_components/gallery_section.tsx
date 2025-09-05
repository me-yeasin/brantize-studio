import Image from "next/image";

import { Post } from "../_model/post";

interface GallerySectionProps {
  projectData: Post;
  openLightbox: (image: string) => void;
}
const GallerySection = ({ projectData, openLightbox }: GallerySectionProps) => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl mb-4 relative inline-block">
            Project{" "}
            <span className="bg-gradient-to-r from-purple-600 to-lime-400 bg-clip-text text-transparent">
              Gallery
            </span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-600 to-lime-400"></span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Visual showcase of the Smart Email Responder system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectData.gallery.map((image, index) => (
            <div
              key={index}
              className="relative h-64 rounded-2xl overflow-hidden border border-gray-700 cursor-pointer transition-all hover:-translate-y-3 hover:shadow-2xl group"
              onClick={() => openLightbox(image)}
            >
              <Image
                src={image}
                alt={`Gallery Image ${index + 1}`}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="fas fa-expand text-3xl text-lime-400 transform scale-80 group-hover:scale-100 transition-transform"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
