"use client";

export default function Projects() {
  // Sample project data
  const projects = [
    {
      id: 1,
      name: "Brand Identity Redesign",
      client: "TechCorp Inc.",
      category: "Branding",
      status: "In Progress",
      statusColor: "bg-yellow-400",
      progress: 65,
      dueDate: "Sep 15, 2025",
      members: [
        { id: 1, initials: "JD", color: "bg-purple-500" },
        { id: 2, initials: "AM", color: "bg-blue-500" },
        { id: 3, initials: "RK", color: "bg-green-500" },
      ],
    },
    {
      id: 2,
      name: "Website Revamp",
      client: "Global Solutions Ltd.",
      category: "Web Development",
      status: "Completed",
      statusColor: "bg-green-400",
      progress: 100,
      dueDate: "Aug 30, 2025",
      members: [
        { id: 1, initials: "JD", color: "bg-purple-500" },
        { id: 4, initials: "SL", color: "bg-pink-500" },
      ],
    },
    {
      id: 3,
      name: "Marketing Campaign",
      client: "Nexus Retail",
      category: "Marketing",
      status: "In Progress",
      statusColor: "bg-yellow-400",
      progress: 32,
      dueDate: "Oct 05, 2025",
      members: [
        { id: 2, initials: "AM", color: "bg-blue-500" },
        { id: 5, initials: "PJ", color: "bg-red-500" },
      ],
    },
    {
      id: 4,
      name: "Social Media Strategy",
      client: "EcoSmart Products",
      category: "Social Media",
      status: "Not Started",
      statusColor: "bg-red-400",
      progress: 0,
      dueDate: "Oct 12, 2025",
      members: [
        { id: 3, initials: "RK", color: "bg-green-500" },
        { id: 4, initials: "SL", color: "bg-pink-500" },
        { id: 5, initials: "PJ", color: "bg-red-500" },
      ],
    },
    {
      id: 5,
      name: "Product Photoshoot",
      client: "Luxury Timepieces",
      category: "Photography",
      status: "In Progress",
      statusColor: "bg-yellow-400",
      progress: 78,
      dueDate: "Sep 18, 2025",
      members: [
        { id: 1, initials: "JD", color: "bg-purple-500" },
        { id: 6, initials: "MN", color: "bg-yellow-500" },
      ],
    },
    {
      id: 6,
      name: "SEO Optimization",
      client: "Health Supplements Co.",
      category: "Digital Marketing",
      status: "Not Started",
      statusColor: "bg-red-400",
      progress: 0,
      dueDate: "Oct 25, 2025",
      members: [
        { id: 2, initials: "AM", color: "bg-blue-500" },
        { id: 5, initials: "PJ", color: "bg-red-500" },
      ],
    },
    {
      id: 7,
      name: "Logo Design",
      client: "Fresh Start Bakery",
      category: "Branding",
      status: "Completed",
      statusColor: "bg-green-400",
      progress: 100,
      dueDate: "Aug 20, 2025",
      members: [
        { id: 1, initials: "JD", color: "bg-purple-500" },
        { id: 3, initials: "RK", color: "bg-green-500" },
      ],
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-white mb-2">
          Projects
        </h1>
        <p className="text-gray-400">
          Manage and track all your client projects
        </p>
      </div>

      {/* Project Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full sm:w-64 px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400 pl-10"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-400 absolute left-3 top-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>

          <select className="px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400 appearance-none w-full sm:w-40">
            <option value="">All Categories</option>
            <option value="branding">Branding</option>
            <option value="web">Web Development</option>
            <option value="marketing">Marketing</option>
            <option value="social">Social Media</option>
            <option value="photography">Photography</option>
          </select>

          <select className="px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400 appearance-none w-full sm:w-40">
            <option value="">All Statuses</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button className="px-5 py-2.5 rounded-lg font-medium brand-gradient-for-bg text-gray-900 hover:opacity-90 transition-all flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          New Project
        </button>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800/70 border border-gray-700 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-600/10 hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-white">
                  {project.name}
                </h3>
                <div className="flex items-center">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${project.statusColor} mr-2`}
                  ></div>
                  <span className="text-xs text-gray-300">
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-1">
                  Client: {project.client}
                </p>
                <p className="text-gray-400 text-sm">
                  Category: {project.category}
                </p>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="brand-gradient-for-bg h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {project.members.map((member) => (
                    <div
                      key={member.id}
                      className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-xs font-medium text-white border-2 border-gray-800`}
                    >
                      {member.initials}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-400">
                  Due: {project.dueDate}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 flex">
              <button className="flex-1 py-3 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Edit
              </button>
              <div className="w-px bg-gray-700"></div>
              <button className="flex-1 py-3 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
