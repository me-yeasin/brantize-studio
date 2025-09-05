import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "../_model/blog-post";

interface RelatedPostsProps {
  post: BlogPost;
}

const RelatedPosts = ({ post }: RelatedPostsProps) => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-orbitron font-bold text-3xl mb-4">
            Related <span className="brand-gradient-for-text">Articles</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore more insights on AI technology and business transformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {post.relatedPosts?.map((relatedPost, index) => (
            <Link
              href={`/blog/${relatedPost.id}`}
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 transition-all hover:-translate-y-2 hover:shadow-xl flex flex-col no-underline"
            >
              <div className="h-48 relative overflow-hidden">
                <Image
                  src={relatedPost.coverImage}
                  alt={relatedPost.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-sm font-medium brand-gradient-for-bg text-gray-900">
                  {relatedPost.category}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <span className="flex items-center mr-4">
                    <i className="far fa-calendar mr-2 text-lime-400"></i>{" "}
                    {relatedPost.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {relatedPost.title}
                </h3>
                <p className="text-gray-400 mb-4 flex-grow">
                  {relatedPost.excerpt}
                </p>
                <span className="text-lime-400 font-medium transition-colors flex items-center w-fit">
                  Read More{" "}
                  <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
