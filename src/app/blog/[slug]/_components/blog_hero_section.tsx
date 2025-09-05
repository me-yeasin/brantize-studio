import Image from "next/image";
import { BlogPost } from "../_model/blog-post";

interface HeroSectionProps {
  post: BlogPost;
}

const BlogHeroSection = ({ post }: HeroSectionProps) => {
  return (
    <section className="pt-20 pb-10 bg-gray-900 relative overflow-hidden">
      {/* Background dots/grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c6ff00' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 0H40V40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="px-3 py-1.5 rounded-full text-sm font-medium brand-gradient-for-bg text-gray-900 mb-4 inline-block">
            {post.category}
          </span>
          <h1 className="font-orbitron font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            {post.title}
          </h1>

          <div className="flex items-center justify-center space-x-6 text-gray-400 mb-8">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                {post.authorImage ? (
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-lime-400 text-gray-900">
                    {post.author.substring(0, 1)}
                  </div>
                )}
              </div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <i className="far fa-calendar mr-2 text-lime-400"></i>
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <i className="far fa-clock mr-2 text-lime-400"></i>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHeroSection;
