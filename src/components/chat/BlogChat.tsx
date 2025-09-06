"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronRight, FiFileText, FiSend, FiX } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Import the BlogPost type
import { BlogPost } from "@/app/blog/[slug]/_model/blog-post";

interface BlogChatProps {
  blogData: BlogPost;
}

interface Message {
  content: string;
  role: "user" | "assistant" | "system";
}

const BlogChat: React.FC<BlogChatProps> = ({ blogData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate a summary of the blog when the panel is opened
  const generateBlogSummary = useCallback(async () => {
    setIsLoading(true);

    try {
      // Create a summary message from the blog data
      const summary = {
        role: "assistant" as const,
        content: `# ${blogData.title}

${blogData.excerpt}

## Blog Overview
- **Author**: ${blogData.author || "Anonymous"}
- **Category**: ${blogData.category || "Uncategorized"}
- **Published**: ${blogData.date || "Not specified"}
- **Read Time**: ${blogData.readTime || "Unknown"}

${
  blogData.tags && blogData.tags.length > 0
    ? `## Tags\n${blogData.tags.map((tag) => `- ${tag}`).join("\n")}`
    : ""
}

I'm here to help you understand this article better. Feel free to ask questions about its content!`,
      };

      setMessages([summary]);
    } catch (error) {
      console.error("Error generating blog summary:", error);
      setMessages([
        {
          role: "assistant",
          content:
            "I couldn't generate a summary for this blog post. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [blogData]);

  // Handle user message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Extract blog content for context
      const blogContent =
        blogData.content && blogData.content.length > 0
          ? blogData.content.join("\n\n")
          : "";

      // Create a context object for the API
      const blogContext = `
        Title: ${blogData.title}
        Excerpt: ${blogData.excerpt}
        Category: ${blogData.category}
        Tags: ${blogData.tags?.join(", ") || "None"}
        Content: ${blogContent.substring(0, 5000)} ${
        blogContent.length > 5000 ? "...(truncated)" : ""
      }
      `;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are a blog assistant for Brandtize Studio. 
            You are currently discussing a specific blog article. Here's the article data: ${blogContext}. 
            Answer questions specifically about this article. Be concise yet informative. 
            Use markdown formatting to highlight key points.`,
            },
            ...messages,
            userMessage,
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, data.message as Message]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble answering your question right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to generate blog summary when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0 && blogData) {
      generateBlogSummary();
    }
  }, [isOpen, blogData, messages.length, generateBlogSummary]);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Additional effect to ensure scrolling to the bottom when panel opens
  useEffect(() => {
    if (isOpen) {
      // Multiple scroll attempts with increasing delays to ensure scrolling works
      // Sometimes the first attempt might happen before content is fully rendered
      const scrollAttempts = [100, 300, 600];

      scrollAttempts.forEach((delay) => {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, delay);
      });

      // Focus the input field when the panel opens
      // Add a small delay to ensure the DOM is ready
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const toggleChat = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    // When opening the chat, make sure we focus the input field
    if (newIsOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <>
      {/* Blog Info Button - Fixed to right side of screen */}
      <button
        onClick={toggleChat}
        className={`fixed top-1/2 right-0 -translate-y-1/2 bg-gradient-to-br from-purple-700 to-gray-900 text-white py-3 px-2 rounded-l-lg shadow-lg transition-all duration-300 z-40 group ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Blog Info"
      >
        <div className="flex flex-col items-center gap-2">
          <FiFileText size={22} className="text-lime-400" />
          <div className="w-6 h-14 flex flex-col justify-between">
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-500 text-xs font-bold">
              B
            </span>
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-lime-500 text-xs font-bold">
              I
            </span>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-lime-500"></div>
          <FiChevronRight
            size={18}
            className="text-white transition-transform group-hover:translate-x-1"
          />
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full opacity-0 group-hover:opacity-100 bg-gray-900 text-white px-3 py-2 rounded text-sm whitespace-nowrap transition-all delay-100">
          Blog Summary
        </div>
      </button>

      {/* Blog Chat Panel */}
      {isOpen && (
        <div className="fixed top-0 right-0 w-[500px] h-full bg-gray-900/95 backdrop-blur-md shadow-[-10px_0_25px_rgba(124,77,255,0.3)] border-l border-purple-500/30 flex flex-col z-50 animate-slideInRight overflow-hidden">
          {/* Panel header */}
          <div className="p-4 bg-gradient-to-r from-purple-900 to-gray-900 border-b border-purple-500/30 flex justify-between items-center">
            <h3 className="font-orbitron font-bold text-white flex items-center gap-2">
              <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse"></div>
              Blog Summary
            </h3>
            <button
              onClick={toggleChat}
              className="text-gray-300 hover:text-white"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Chat messages area - optimized for scrolling */}
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 flex flex-col relative">
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none absolute left-0 top-0 z-0"></div>

            {/* Spacer div to push content down if needed */}
            {messages.length === 1 && <div className="flex-grow"></div>}

            {/* Messages container */}
            <div className="space-y-4 relative z-10">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.role === "user"
                      ? "ml-auto bg-gradient-to-r from-purple-800/40 to-purple-600/20 border-r-2 border-lime-400"
                      : "mr-auto bg-gradient-to-r from-gray-800/80 to-gray-800/40 border-l-2 border-purple-500"
                  } max-w-[90%] rounded-lg p-4 shadow-lg backdrop-blur-sm`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-2 h-2 bg-purple-500 rounded-full -ml-6 -mt-4"></div>
                  )}
                  {msg.role === "user" && (
                    <div className="w-2 h-2 bg-lime-400 rounded-full ml-auto -mr-6 -mt-4"></div>
                  )}
                  <div className="text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: (props) => (
                          <p className="mb-2 last:mb-0" {...props} />
                        ),
                        ul: (props) => (
                          <ul
                            className="list-disc pl-4 mb-2 space-y-1"
                            {...props}
                          />
                        ),
                        ol: (props) => (
                          <ol
                            className="list-decimal pl-4 mb-2 space-y-1"
                            {...props}
                          />
                        ),
                        li: (props) => <li className="ml-2" {...props} />,
                        a: (props) => (
                          <a
                            className="text-purple-400 hover:text-lime-400 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                          />
                        ),
                        h1: (props) => (
                          <h1
                            className="text-lg font-bold mb-2 mt-3 text-lime-400"
                            {...props}
                          />
                        ),
                        h2: (props) => (
                          <h2
                            className="text-md font-bold mb-2 mt-3 text-lime-400"
                            {...props}
                          />
                        ),
                        h3: (props) => (
                          <h3
                            className="text-md font-semibold mb-1 mt-2 text-purple-400"
                            {...props}
                          />
                        ),
                        code: (props) => {
                          return (
                            <code
                              className="bg-gray-800 px-1 py-0.5 rounded text-purple-300"
                              {...props}
                            />
                          );
                        },
                        pre: (props) => (
                          <pre
                            className="bg-gray-800/50 p-2 rounded overflow-x-auto mb-2"
                            {...props}
                          />
                        ),
                        blockquote: (props) => (
                          <blockquote
                            className="border-l-2 border-purple-500 pl-4 italic my-2"
                            {...props}
                          />
                        ),
                        hr: (props) => (
                          <hr
                            className="border-purple-500/20 my-4"
                            {...props}
                          />
                        ),
                        table: (props) => (
                          <div className="overflow-x-auto my-2">
                            <table
                              className="border-collapse w-full"
                              {...props}
                            />
                          </div>
                        ),
                        thead: (props) => (
                          <thead className="bg-gray-800/50" {...props} />
                        ),
                        th: (props) => (
                          <th
                            className="border border-gray-700 px-2 py-1 text-left"
                            {...props}
                          />
                        ),
                        td: (props) => (
                          <td
                            className="border border-gray-700 px-2 py-1"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mr-auto bg-gradient-to-r from-gray-800/80 to-gray-800/40 border-l-2 border-purple-500/50 max-w-[80%] rounded-lg p-4 shadow-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-purple-500/30 relative w-full z-30"
            style={{
              background:
                "linear-gradient(to top, rgba(126, 34, 206, 0.2), rgba(17, 24, 39, 0.8))",
              backdropFilter: "blur(4px)",
            }}
          >
            {/* Input container with constrained width */}
            <div className="flex max-w-full relative">
              {/* Input with glowing border */}
              <div className="flex-1 min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about this blog..."
                  className="w-full bg-gray-800 text-white rounded-l-lg px-4 py-2 focus:outline-none border-2 border-purple-600 focus:border-lime-400 transition-colors text-sm z-40"
                  disabled={isLoading}
                  autoComplete="off"
                  style={{ position: "relative" }}
                />
              </div>

              {/* Send button - reduced padding */}
              <button
                type="submit"
                className="bg-gradient-to-br from-purple-700 to-gray-900 text-white rounded-r-lg px-3 py-2 hover:shadow-inner transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-purple-600 hover:border-lime-400 flex items-center justify-center z-40 relative"
                disabled={isLoading || !input.trim()}
              >
                <FiSend size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default BlogChat;
