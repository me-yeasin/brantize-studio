"use client";

export default function Analytics() {
  // Sample analytics data
  const performanceMetrics = [
    {
      title: "Total Impressions",
      value: "1.2M",
      change: "+18%",
      isPositive: true,
    },
    {
      title: "Engagement Rate",
      value: "4.6%",
      change: "+2.3%",
      isPositive: true,
    },
    {
      title: "Conversion Rate",
      value: "2.8%",
      change: "-0.5%",
      isPositive: false,
    },
    {
      title: "Avg. Response Time",
      value: "3.2h",
      change: "+0.4h",
      isPositive: false,
    },
  ];

  // Sample project performance data
  // This data would be used with a real chart library implementation

  // Sample campaign data
  const campaignData = [
    {
      name: "Summer Product Launch",
      platform: "Instagram",
      impressions: "345K",
      engagement: "5.7%",
      conversion: "2.3%",
      status: "Active",
    },
    {
      name: "Brand Awareness",
      platform: "Facebook",
      impressions: "512K",
      engagement: "3.2%",
      conversion: "1.8%",
      status: "Active",
    },
    {
      name: "Seasonal Promotion",
      platform: "Google Ads",
      impressions: "278K",
      engagement: "2.9%",
      conversion: "3.4%",
      status: "Active",
    },
    {
      name: "Product Education",
      platform: "YouTube",
      impressions: "156K",
      engagement: "8.1%",
      conversion: "2.7%",
      status: "Paused",
    },
    {
      name: "Customer Feedback",
      platform: "Email",
      impressions: "89K",
      engagement: "12.4%",
      conversion: "4.2%",
      status: "Ended",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-white mb-2">
          Analytics
        </h1>
        <p className="text-gray-400">
          Track your campaign performance and insights
        </p>
      </div>

      {/* Date Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between mb-8 space-y-4 sm:space-y-0">
        <div className="flex space-x-2 items-center">
          <button className="px-4 py-2 rounded-lg bg-gray-700 text-white text-sm">
            Last 7 days
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors text-sm">
            Last 30 days
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors text-sm">
            This year
          </button>
        </div>

        <div className="flex space-x-2">
          <button className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-300 text-sm flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            Custom Range
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-300 text-sm flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {performanceMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-gray-800/70 border border-gray-700 rounded-xl p-6"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400">{metric.title}</h3>
              <div
                className={`text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center ${
                  metric.isPositive
                    ? "text-green-400 bg-green-400/10"
                    : "text-red-400 bg-red-400/10"
                }`}
              >
                {metric.change}
              </div>
            </div>
            <p className="text-2xl font-medium text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-6">
            Project Performance
          </h3>

          {/* Chart placeholder - in a real application, you would use a chart library like Chart.js or Recharts */}
          <div className="bg-gray-800 rounded-lg p-4 h-80 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-2">
                This is where an interactive chart would be displayed
              </p>
              <p className="text-sm text-gray-500">
                Install a chart library like Chart.js or Recharts to implement
                real charts
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-6">
            Audience Insights
          </h3>

          {/* Audience Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-sm text-gray-400 mb-1">Demographics</h4>
              <p className="text-xl font-medium text-white">18-34 (65%)</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400 mb-1">Top Location</h4>
              <p className="text-xl font-medium text-white">New York, USA</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400 mb-1">Device Usage</h4>
              <p className="text-xl font-medium text-white">Mobile (74%)</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400 mb-1">Avg. Session</h4>
              <p className="text-xl font-medium text-white">4m 32s</p>
            </div>
          </div>

          {/* Chart placeholder */}
          <div className="bg-gray-800 rounded-lg p-4 h-40 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Audience Distribution Chart
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Performance Table */}
      <div className="bg-gray-800/70 border border-gray-700 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-medium text-white">
            Campaign Performance
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Impressions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Conversion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {campaignData.map((campaign, index) => (
                <tr key={index} className="hover:bg-gray-700/20">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {campaign.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {campaign.platform}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {campaign.impressions}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {campaign.engagement}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {campaign.conversion}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        campaign.status === "Active"
                          ? "bg-green-400/10 text-green-400"
                          : campaign.status === "Paused"
                          ? "bg-yellow-400/10 text-yellow-400"
                          : "bg-gray-400/10 text-gray-400"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
