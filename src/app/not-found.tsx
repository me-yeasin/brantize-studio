"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative mb-8">
          <h1 className="font-orbitron text-[150px] md:text-[200px] font-black bg-gradient-to-r from-purple-600 to-lime-400 bg-clip-text text-transparent leading-none">
            404
          </h1>
          <div className="absolute inset-0 opacity-30 blur-xl">
            <h1 className="font-orbitron text-[150px] md:text-[200px] font-black text-purple-600 leading-none">
              404
            </h1>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">Page Not Found</h2>

        <p className="text-xl text-gray-400 mb-10 max-w-lg mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="px-8 py-3 rounded-full font-medium bg-gradient-to-r from-purple-600 to-lime-400 text-gray-900 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:-translate-y-1 transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Back to Home</span>
            <span className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          </Link>

          <Link
            href="/?contact=true"
            className="px-8 py-3 rounded-full font-medium border border-gray-700 text-white hover:bg-gray-800/50 hover:border-lime-400 hover:text-lime-400 transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Contact Support</span>
            <span className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          </Link>
        </div>

        <div className="relative">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className={`h-20 rounded-lg bg-gradient-to-br from-purple-600/30 to-lime-400/30 animate-pulse`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: `${2 + (index % 3) * 0.5}s`,
                }}
              ></div>
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white/80">
              <i className="fas fa-code-branch mr-2"></i>
              <span className="text-lime-400">System</span> Malfunction
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
