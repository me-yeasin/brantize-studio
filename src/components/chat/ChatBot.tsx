"use client";

import { useEffect, useRef, useState } from "react";
import { FiMessageSquare, FiMinimize2, FiSend, FiX } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  content: string;
  role: "user" | "assistant" | "system";
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial welcome message
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content:
          "👋 Hi there! I'm Brandtize Assistant. How can I help you with our services, pricing, or any other questions about Brandtize Studio?",
      },
    ]);
  }, []);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
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
            "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat bubble button */}
      <div
        className={`fixed bottom-6 right-6 z-50 group ${
          isOpen ? "max-sm:hidden" : ""
        }`}
      >
        {/* Outer glow effects */}
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-lime-400 to-purple-600 rounded-full blur-xl opacity-40 animate-pulse"></div>
        <div
          className="absolute -inset-3 bg-gradient-to-r from-purple-600 via-lime-400 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* Premium gradient border with animation */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-lime-400 via-purple-600 to-lime-400 animate-spin-slow opacity-90"></div>

        {/* Inner gold/premium border */}
        <div className="absolute inset-[3px] rounded-full border-2 border-[#f0c987]/30"></div>

        {/* Main button */}
        <button
          onClick={toggleChat}
          className="relative w-16 h-16 max-sm:w-14 max-sm:h-14 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-800 via-purple-900 to-gray-900 flex items-center justify-center text-white shadow-[0_0_20px_rgba(124,77,255,0.9)] hover:shadow-[0_0_30px_rgba(124,77,255,1)] transition-all duration-300"
          aria-label="Open chat"
        >
          {/* Premium internal texture/pattern */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTAgMGgxMHYxMEgwek0yNCAwaDEwdjEwSDI0ek00OCAwaDEwdjEwSDQ4ek0xMiAxMmgxMHYxMEgxMnpNMzYgMTJoMTB2MTBIMzZ6TTAgMjRoMTB2MTBIMHpNMjQgMjRoMTB2MTBIMjR6TTQ4IDI0aDEwdjEwSDQ4ek0xMiAzNmgxMHYxMEgxMnpNMzYgMzZoMTB2MTBIMzZ6TTAgNDhoMTB2MTBIMHB4ek0yNCA0OGgxMHYxMEgyNHpNNDggNDhoMTB2MTBINDh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent"></div>
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:animate-shimmer"></div>
          </div>

          {/* Icon */}
          <span className="relative z-10 flex items-center justify-center">
            {isOpen ? (
              <FiX size={26} className="text-white drop-shadow-lg" />
            ) : (
              <div className="relative">
                <FiMessageSquare
                  size={24}
                  className="text-white drop-shadow-lg group-hover:text-[#f0c987] transition-colors"
                />
                {/* Green dot removed */}
              </div>
            )}
          </span>
        </button>

        {/* Premium text label that appears on hover */}
        <div className="absolute -top-12 right-0 transform transition-all opacity-0 group-hover:opacity-100 bg-gradient-to-r from-gray-900 to-purple-900 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-[0_0_15px_rgba(124,77,255,0.5)] border border-[#f0c987]/30 whitespace-nowrap backdrop-blur-sm">
          <div className="absolute top-full right-5 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-purple-900"></div>
          <span className="bg-gradient-to-r from-white to-[#f0c987] bg-clip-text text-transparent font-semibold">
            {isOpen ? "Close Chat" : "Ask AI Assistant"}
          </span>
        </div>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed max-sm:top-16 max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:w-full max-sm:h-[calc(100dvh-64px)] max-sm:rounded-none sm:bottom-24 sm:right-6 sm:w-96 sm:h-[600px] bg-gray-900/95 backdrop-blur-md sm:rounded-xl shadow-[0_0_25px_rgba(124,77,255,0.5)] border border-purple-500/30 flex flex-col z-30 overflow-hidden animate-fadeIn">
          {/* Decorative gradient corner */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-600/30 via-lime-400/20 to-transparent rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-purple-600/30 via-lime-400/20 to-transparent rounded-full blur-xl"></div>

          {/* Chat header */}
          <div className="p-4 bg-gradient-to-r from-purple-900 to-gray-900 border-b border-purple-500/30 flex justify-between items-center sticky top-0 overflow-hidden z-20">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent blur-md"></div>
            </div>
            <h3 className="font-orbitron font-bold text-white flex items-center gap-2 relative z-10">
              <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse"></div>
              Brandtize Assistant
            </h3>
            <button
              onClick={toggleChat}
              className="text-gray-300 hover:text-white relative z-10 max-sm:p-1 max-sm:bg-purple-900/50 max-sm:rounded-md max-sm:border max-sm:border-purple-500/30"
            >
              <FiX className="max-sm:block sm:hidden" size={18} />
              <FiMinimize2 className="max-sm:hidden sm:block" size={18} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4 relative">
            {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none"></div> */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.role === "user"
                    ? "ml-auto bg-gradient-to-r from-purple-800/40 to-purple-600/20 border-r-2 border-lime-400"
                    : "mr-auto bg-gradient-to-r from-gray-800/80 to-gray-800/40 border-l-2 border-purple-500"
                } max-w-[80%] rounded-lg p-4 shadow-lg backdrop-blur-sm relative`}
              >
                {msg.role === "assistant" && (
                  <div className="absolute -left-1 -top-1 w-2 h-2 bg-purple-500 rounded-full"></div>
                )}
                {msg.role === "user" && (
                  <div className="absolute -right-1 -top-1 w-2 h-2 bg-lime-400 rounded-full"></div>
                )}
                <div className="text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: (props) => <p className="mb-2 last:mb-0" {...props} />,
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
                      blockquote: (props) => (
                        <blockquote
                          className="border-l-2 border-purple-500 pl-2 italic text-gray-300 my-2"
                          {...props}
                        />
                      ),
                      code: (props) => {
                        const { children, className } = props;
                        // Check if this is an inline code block or a block code
                        const isInline = !className;
                        return isInline ? (
                          <code className="bg-gray-800 px-1 py-0.5 rounded text-xs font-mono text-lime-400">
                            {children}
                          </code>
                        ) : (
                          <div className="my-2 overflow-x-auto bg-gray-900/50 p-2 rounded-md border-l-2 border-purple-500">
                            <pre className="text-xs font-mono text-lime-400">
                              <code className={className}>{children}</code>
                            </pre>
                          </div>
                        );
                      },
                      pre: (props) => (
                        <pre className="bg-transparent p-0 m-0" {...props} />
                      ),
                      hr: (props) => (
                        <hr className="my-3 border-gray-700" {...props} />
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

          {/* Chat input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-purple-500/30 bg-gray-900/80 backdrop-blur-sm sticky bottom-0 z-20 mt-10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-50"></div>
            <div className="relative flex">
              <div className="flex-1 relative group">
                <div className="absolute bottom-0 -inset-0.5 bg-gradient-to-r from-purple-600 to-lime-400 rounded-l-lg opacity-70 group-focus-within:opacity-100 transition-opacity"></div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our services..."
                  className="relative w-full bg-gray-800 text-white rounded-l-lg px-4 py-3 focus:outline-none border-0"
                  disabled={isLoading}
                />
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-lime-400 rounded-r-lg opacity-70 group-focus-within:opacity-100 transition-opacity"></div>
                <button
                  type="submit"
                  className="relative bg-gradient-to-br from-purple-700 to-gray-900 text-white rounded-r-lg px-5 py-3 hover:shadow-inner transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                  disabled={isLoading || !input.trim()}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                  <FiSend className="relative z-10" />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
