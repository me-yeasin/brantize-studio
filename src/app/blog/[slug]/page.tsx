"use client";

import AuthModal from "@/overlays/auth_modal";
import { useEffect, useState } from "react";
import BlogContentSection from "./_components/blog_content_section";
import BlogHeroSection from "./_components/blog_hero_section";
import RelatedPosts from "./_components/related_posts";
import { BlogPost } from "./_model/blog-post";

export default function BlogDetail({}: // params is commented out since it's not currently used
// params,
{
  params: Promise<{ slug: string }>;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  // We would normally use params.slug to fetch the specific blog post
  // console.log("Blog slug:", params.slug);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Sample blog post data - in a real app, this would come from an API or database
  const blogPost: BlogPost = {
    id: "future-of-business-automation",
    title:
      "The Future of Business Automation: How AI is Transforming Industries",
    excerpt:
      "Explore how artificial intelligence is revolutionizing business processes across industries, from healthcare to finance. Discover the latest trends, real-world applications, and what the future holds for AI-driven automation.",
    category: "Featured",
    date: "May 15, 2023",
    author: "Alex Johnson",
    featured: true,
    readTime: "8 min read",
    coverImage:
      "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    content: [
      "Artificial Intelligence (AI) is no longer a futuristic concept—it's here, and it's rapidly transforming how businesses operate across all industries. From automating routine tasks to enabling more sophisticated decision-making processes, AI technologies are creating new possibilities for efficiency, innovation, and competitive advantage.",

      "In healthcare, AI is powering predictive analytics that can identify patients at risk for certain conditions before symptoms appear. Medical imaging analysis powered by deep learning can detect anomalies with accuracy that rivals or exceeds human specialists. Administrative processes like appointment scheduling and billing are being streamlined through intelligent automation, freeing up healthcare professionals to focus more on patient care.",

      "The financial sector has embraced AI for fraud detection, algorithmic trading, personalized banking experiences, and credit risk assessment. Banks can now process thousands of transactions per second, identifying suspicious patterns instantly and preventing fraudulent activities before they complete. Investment firms use AI to analyze market trends and make split-second trading decisions based on complex algorithms that process vast amounts of data faster than any human could.",

      "In manufacturing, AI-powered predictive maintenance is reducing downtime by identifying potential equipment failures before they occur. Computer vision systems inspect products at speeds and accuracy levels impossible for human workers. Robotics guided by machine learning algorithms are becoming more adaptable and capable of handling complex assembly tasks that once required human dexterity and decision-making.",

      "Retail businesses are using AI to personalize customer experiences, optimize inventory management, and predict consumer trends. Recommendation engines analyze purchasing patterns and browsing behavior to suggest products tailored to individual preferences. Dynamic pricing models adjust in real-time based on demand, competition, and other market factors.",

      "The transportation and logistics industry is being transformed by AI through route optimization, autonomous vehicles, and demand forecasting. Companies can now plan deliveries with unprecedented efficiency, reducing fuel consumption and improving timeliness. The development of self-driving technology continues to advance, with the potential to revolutionize everything from personal transportation to long-haul trucking.",

      "Perhaps most importantly, AI is changing how businesses make strategic decisions. Advanced analytics can now process structured and unstructured data from countless sources, identifying patterns and insights that would be impossible to discover manually. Executives can make more informed choices based on comprehensive data analysis rather than gut feeling or limited information.",

      "However, the rise of AI in business also presents challenges. Questions about data privacy, algorithmic bias, workforce displacement, and ethical use of AI are becoming increasingly important. Organizations must develop frameworks for responsible AI implementation that addresses these concerns while still capturing the technology's benefits.",

      "As AI continues to evolve, its impact on business will only deepen. Companies that successfully integrate AI into their operations and strategy will likely find themselves with significant advantages over competitors who are slower to adapt. The future of business automation isn't just about efficiency—it's about reimagining what's possible when human creativity and expertise are augmented by intelligent machines.",

      "For business leaders, the message is clear: understanding and embracing AI isn't optional—it's essential for future success. Organizations that develop a clear AI strategy, invest in the right technologies and talent, and thoughtfully address the challenges will be best positioned to thrive in this new era of business automation.",
    ],
    tags: [
      "AI",
      "Business Automation",
      "Digital Transformation",
      "Technology Trends",
      "Machine Learning",
    ],
    relatedPosts: [
      {
        id: "ai-email-responders",
        title:
          "5 Ways AI Email Responders Are Revolutionizing Customer Service",
        excerpt:
          "Discover how AI-powered email responders are transforming customer service departments, improving response times, and enhancing customer satisfaction across industries.",
        category: "Technology",
        date: "May 10, 2023",
        coverImage:
          "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "integrating-ai-workflow",
        title:
          "Step-by-Step Guide to Integrating AI into Your Existing Workflow",
        excerpt:
          "A comprehensive guide on how to seamlessly integrate AI solutions into your current business processes without disrupting operations. Learn best practices and common pitfalls to avoid.",
        category: "Implementation",
        date: "May 5, 2023",
        coverImage:
          "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "financial-firm-case-study",
        title:
          "Case Study: How a Financial Firm Saved 20 Hours Weekly with AI Data Analysis",
        excerpt:
          "Dive deep into how a mid-sized financial firm implemented our AI data analysis solution and transformed their reporting process, saving countless hours and improving accuracy.",
        category: "Case Study",
        date: "April 28, 2023",
        coverImage:
          "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Blog Hero Section */}
      <BlogHeroSection post={blogPost} />

      {/* Blog Content Section */}
      <BlogContentSection post={blogPost} />

      {/* Related Posts Section */}
      <RelatedPosts post={blogPost} />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-lime-400 flex items-center justify-center text-gray-900 text-xl shadow-lg shadow-purple-600/40 transition-all ${
          isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
      <AuthModal />
    </div>
  );
}
