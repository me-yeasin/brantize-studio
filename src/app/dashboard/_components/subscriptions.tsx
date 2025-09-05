"use client";

import { useEffect, useState } from "react";

interface Subscription {
  _id: string;
  email: string;
  createdAt: string;
}

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/subscriptions");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch subscriptions");
      }

      setSubscriptions(data);
      setError("");
    } catch (err) {
      setError("Failed to load subscriptions. Please try again.");
      console.error("Error loading subscriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter subscriptions by search term
  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Newsletter Subscribers</h2>
        <div className="flex">
          <input
            type="text"
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-l-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <button
            onClick={() => fetchSubscriptions()}
            className="px-4 py-2 rounded-r-lg bg-gray-600 hover:bg-gray-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-lime-400 border-t-transparent"></div>
        </div>
      ) : (
        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
            <div className="grid grid-cols-12 p-4 bg-gray-700/50 font-medium">
              <div className="col-span-1">#</div>
              <div className="col-span-7">Email</div>
              <div className="col-span-4">Date</div>
            </div>

            {filteredSubscriptions.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                {searchTerm
                  ? "No matching subscribers found."
                  : "No subscribers yet."}
              </div>
            ) : (
              <div className="max-h-[600px] overflow-y-auto">
                {filteredSubscriptions.map((sub, index) => (
                  <div
                    key={sub._id}
                    className="grid grid-cols-12 p-4 border-t border-gray-700 hover:bg-gray-800/30 transition-colors"
                  >
                    <div className="col-span-1 text-gray-400">{index + 1}</div>
                    <div className="col-span-7">{sub.email}</div>
                    <div className="col-span-4 text-gray-400">
                      {new Date(sub.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 text-gray-400">
            Total Subscribers: {subscriptions.length}
          </div>
        </div>
      )}
    </div>
  );
}
