"use client";

import { useState } from "react";

export default function Settings() {
  // User profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "Creative Director",
    bio: "Experienced creative director with a passion for brand identity and digital marketing strategies.",
    avatar: "",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    theme: "dark",
  });

  // Function to handle input changes
  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // Function to handle notification toggle
  const handleNotificationChange = (type: string) => {
    setProfile({
      ...profile,
      notifications: {
        ...profile.notifications,
        [type]:
          !profile.notifications[type as keyof typeof profile.notifications],
      },
    });
  };

  // Function to handle theme change
  const handleThemeChange = (theme: string) => {
    setProfile({
      ...profile,
      theme,
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-400">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 brand-gradient-for-bg rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-gray-900">JD</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-1">
                {profile.name}
              </h3>
              <p className="text-gray-400">{profile.role}</p>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <ul>
                <li>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-700/50 text-lime-400 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    <span>Profile</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700/30 hover:text-white transition-all mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      />
                    </svg>
                    <span>Notifications</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700/30 hover:text-white transition-all mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                    <span>Security</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700/30 hover:text-white transition-all mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                      />
                    </svg>
                    <span>Preferences</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700/30 hover:text-white transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    <span>Account</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-2">
          {/* Profile Settings */}
          <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-medium text-white mb-6">
              Profile Information
            </h2>

            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-gray-400 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={profile.role}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
                <div>
                  <label htmlFor="avatar" className="block text-gray-400 mb-2">
                    Profile Picture
                  </label>
                  <div className="flex items-center">
                    <div className="w-12 h-12 brand-gradient-for-bg rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold text-gray-900">JD</span>
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-700 rounded-lg text-white text-sm hover:bg-gray-600 transition-colors"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="bio" className="block text-gray-400 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={profile.bio}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                ></textarea>
              </div>

              <button
                type="button"
                className="px-5 py-2.5 rounded-lg font-medium brand-gradient-for-bg text-gray-900 hover:opacity-90 transition-all"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Notification Settings */}
          <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-medium text-white mb-6">
              Notification Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                <div>
                  <h3 className="text-white font-medium mb-1">
                    Email Notifications
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Receive project updates via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={profile.notifications.email}
                    onChange={() => handleNotificationChange("email")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${
                      profile.notifications.email
                        ? "bg-lime-400"
                        : "bg-gray-700"
                    } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}
                  ></div>
                </label>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                <div>
                  <h3 className="text-white font-medium mb-1">
                    Push Notifications
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Receive notifications in your browser
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={profile.notifications.push}
                    onChange={() => handleNotificationChange("push")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${
                      profile.notifications.push ? "bg-lime-400" : "bg-gray-700"
                    } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}
                  ></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium mb-1">
                    SMS Notifications
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Receive urgent notifications via SMS
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={profile.notifications.sms}
                    onChange={() => handleNotificationChange("sms")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${
                      profile.notifications.sms ? "bg-lime-400" : "bg-gray-700"
                    } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}
                  ></div>
                </label>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-medium text-white mb-6">Appearance</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`border ${
                  profile.theme === "dark"
                    ? "border-lime-400"
                    : "border-gray-700"
                } rounded-lg p-4 cursor-pointer hover:border-lime-400 transition-colors`}
                onClick={() => handleThemeChange("dark")}
              >
                <div className="bg-gray-900 h-24 mb-2 rounded-md"></div>
                <div className="flex items-center">
                  <span className="text-white">Dark</span>
                  {profile.theme === "dark" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 ml-auto text-lime-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <div
                className={`border ${
                  profile.theme === "light"
                    ? "border-lime-400"
                    : "border-gray-700"
                } rounded-lg p-4 cursor-pointer hover:border-lime-400 transition-colors`}
                onClick={() => handleThemeChange("light")}
              >
                <div className="bg-gray-200 h-24 mb-2 rounded-md"></div>
                <div className="flex items-center">
                  <span className="text-white">Light</span>
                  {profile.theme === "light" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 ml-auto text-lime-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <div
                className={`border ${
                  profile.theme === "system"
                    ? "border-lime-400"
                    : "border-gray-700"
                } rounded-lg p-4 cursor-pointer hover:border-lime-400 transition-colors`}
                onClick={() => handleThemeChange("system")}
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-200 h-24 mb-2 rounded-md"></div>
                <div className="flex items-center">
                  <span className="text-white">System</span>
                  {profile.theme === "system" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 ml-auto text-lime-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
