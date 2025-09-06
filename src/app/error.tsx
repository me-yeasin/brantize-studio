"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative mb-8">
          <h1 className="font-orbitron text-[130px] md:text-[170px] font-black bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent leading-none">
            Error
          </h1>
          <div className="absolute inset-0 opacity-30 blur-xl">
            <h1 className="font-orbitron text-[130px] md:text-[170px] font-black text-red-500 leading-none">
              Error
            </h1>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Something Went Wrong
        </h2>

        <p className="text-xl text-gray-400 mb-10 max-w-lg mx-auto">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => reset()}
            className="px-8 py-3 rounded-full font-medium bg-gradient-to-r from-purple-600 to-lime-400 text-gray-900 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:-translate-y-1 transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Try Again</span>
            <span className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          </button>

          <Link
            href="/"
            className="px-8 py-3 rounded-full font-medium border border-gray-700 text-white hover:bg-gray-800/50 hover:border-lime-400 hover:text-lime-400 transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Back to Home</span>
            <span className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          </Link>
        </div>

        <div className="relative py-6 px-8 rounded-xl bg-gray-900/80 border border-gray-700">
          <p className="text-gray-400 font-mono text-sm">
            If the problem persists, please contact our support team.
          </p>
        </div>
      </div>
    </main>
  );
}
