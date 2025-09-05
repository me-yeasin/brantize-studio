"use client";

export default function Overview() {
  // Sample data for the overview section
  const stats = [
    {
      title: "Total Projects",
      value: "24",
      change: "+12%",
      isPositive: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
          />
        </svg>
      ),
    },
    {
      title: "Active Campaigns",
      value: "8",
      change: "+25%",
      isPositive: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
          />
        </svg>
      ),
    },
    {
      title: "User Engagement",
      value: "87%",
      change: "-3%",
      isPositive: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      ),
    },
    {
      title: "Revenue",
      value: "$24,500",
      change: "+18%",
      isPositive: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
  ];

  const recentProjects = [
    {
      id: 1,
      name: "Brand Identity Redesign",
      client: "TechCorp Inc.",
      status: "In Progress",
      statusColor: "bg-yellow-400",
      progress: 65,
      dueDate: "Sep 15, 2025",
    },
    {
      id: 2,
      name: "Website Revamp",
      client: "Global Solutions Ltd.",
      status: "Completed",
      statusColor: "bg-green-400",
      progress: 100,
      dueDate: "Aug 30, 2025",
    },
    {
      id: 3,
      name: "Marketing Campaign",
      client: "Nexus Retail",
      status: "In Progress",
      statusColor: "bg-yellow-400",
      progress: 32,
      dueDate: "Oct 05, 2025",
    },
    {
      id: 4,
      name: "Social Media Strategy",
      client: "EcoSmart Products",
      status: "Not Started",
      statusColor: "bg-red-400",
      progress: 0,
      dueDate: "Oct 12, 2025",
    },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800/70 border border-gray-700 rounded-xl p-6 transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-600/10"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-full brand-gradient-for-bg">
                <span className="text-gray-900">{stat.icon}</span>
              </div>
              <div
                className={`text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center ${
                  stat.isPositive
                    ? "text-green-400 bg-green-400/10"
                    : "text-red-400 bg-red-400/10"
                }`}
              >
                {stat.change}
              </div>
            </div>
            <h3 className="text-xl font-medium text-white">{stat.value}</h3>
            <p className="text-gray-400">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Projects Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-orbitron font-bold text-white">
            Recent Projects
          </h2>
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-colors">
            View All
          </button>
        </div>

        <div className="bg-gray-800/70 border border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {recentProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-700/20">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {project.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        {project.client}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${project.statusColor} mr-2`}
                        ></div>
                        <div className="text-sm text-gray-300">
                          {project.status}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className="brand-gradient-for-bg h-2.5 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1 text-right">
                        {project.progress}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        {project.dueDate}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-orbitron font-bold text-white">
            Recent Activity
          </h2>
        </div>

        <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-6">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-700"></div>

            {/* Timeline items */}
            <div className="space-y-8">
              <div className="relative pl-12">
                <div className="absolute left-0 top-1 brand-gradient-for-bg w-8 h-8 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-gray-900"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-medium">
                  Website Revamp Completed
                </h3>
                <p className="text-gray-400 mt-1">
                  Final deliverables submitted to Global Solutions Ltd.
                </p>
                <p className="text-sm text-gray-500 mt-2">2 hours ago</p>
              </div>

              <div className="relative pl-12">
                <div className="absolute left-0 top-1 bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-white"
                  >
                    <path d="M10 2a.75.75 0 0 1 .75.75v5.59l1.95-2.1a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0L6.2 7.26a.75.75 0 1 1 1.1-1.02l1.95 2.1V2.75A.75.75 0 0 1 10 2Z" />
                    <path d="M5.273 4.5a1.25 1.25 0 0 0-1.205.918l-1.523 5.52c-.006.02-.01.041-.015.062H6a1 1 0 0 1 .894.553l.448.894a1 1 0 0 0 .894.553h3.438a1 1 0 0 0 .86-.49l.606-1.02A1 1 0 0 1 14 11h3.47a1.318 1.318 0 0 0-.015-.062l-1.523-5.52a1.25 1.25 0 0 0-1.205-.918h-.977a.75.75 0 0 1 0-1.5h.977a2.75 2.75 0 0 1 2.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3.73c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 0 1 5.273 3h.977a.75.75 0 0 1 0 1.5h-.977Z" />
                  </svg>
                </div>
                <h3 className="text-white font-medium">
                  New Project Files Uploaded
                </h3>
                <p className="text-gray-400 mt-1">
                  You uploaded 15 new files for the Marketing Campaign project
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Yesterday at 2:30 PM
                </p>
              </div>

              <div className="relative pl-12">
                <div className="absolute left-0 top-1 bg-yellow-500 w-8 h-8 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-medium">
                  Client Feedback Received
                </h3>
                <p className="text-gray-400 mt-1">
                  TechCorp Inc. sent comments on the latest brand identity
                  drafts
                </p>
                <p className="text-sm text-gray-500 mt-2">Sep 2, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
