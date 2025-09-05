"use client";

import { useState } from "react";

const AuthModal = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Login functionality would be implemented here");
    document.getElementById("authModal")!.style.display = "none";
  };

  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Signup functionality would be implemented here");
    document.getElementById("authModal")!.style.display = "none";
  };

  const closeModal = () => {
    document.getElementById("authModal")!.style.display = "none";
  };

  return (
    <div
      id="authModal"
      className="fixed inset-0 bg-black/80 z-50 hidden items-center justify-center"
    >
      <div className="bg-gray-800/90 backdrop-blur-md rounded-xl p-8 w-full max-w-md border border-gray-700 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          &times;
        </button>

        <h2 className="font-orbitron font-bold text-2xl mb-6 text-center">
          Welcome to NeuralForge
        </h2>

        <div className="flex mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-3 font-medium ${
              activeTab === "login" ? "text-lime-400" : "text-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-3 font-medium ${
              activeTab === "signup" ? "text-lime-400" : "text-gray-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label htmlFor="loginEmail" className="block text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="loginEmail"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="loginPassword"
                className="block text-gray-400 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="loginPassword"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
              />
            </div>
            <div className="text-right mb-6">
              <a href="#" className="text-lime-400 text-sm">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full font-medium bg-gradient-to-r from-purple-600 to-lime-400 text-gray-900 hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit}>
            <div className="mb-4">
              <label htmlFor="signupName" className="block text-gray-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="signupName"
                name="name"
                value={signupData.name}
                onChange={handleSignupChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="signupEmail" className="block text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="signupEmail"
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="signupPassword"
                className="block text-gray-400 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="signupPassword"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="signupCompany"
                className="block text-gray-400 mb-2"
              >
                Company (Optional)
              </label>
              <input
                type="text"
                id="signupCompany"
                name="company"
                value={signupData.company}
                onChange={handleSignupChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full font-medium brand-gradient-for-bg text-gray-900 hover:opacity-90 transition-opacity"
            >
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
