// components/DashboardCards.tsx

import React from "react";
import { getAgentStatistics } from "@/lib/utils/agentStats"; // Ensure this path is correct
import { Agent } from "@/types"; // Ensure this path is correct

// Sample agents data
const agents: Agent[] = [
  {
    id: 1,
    name: "RHEL7",
    ip: "187.54.247.68",
    group: "default hel",
    os: "Red Hat Enterprise Linux",
    cluster: "manager-master",
    version: "v4.3.0",
    registrationDate: "Sep 09, 2021 @ 14:15",
    lastKeepAlive: "Jan 24, 2022 @ 9:32",
    status: "active",
  },
  {
    id: 2,
    name: "Amazon",
    ip: "145.80.240.15",
    group: "default amazon",
    os: "Amazon Linux 2",
    cluster: "manager-master",
    version: "v4.3.0",
    registrationDate: "Oct 24, 2021 @ 10:40",
    lastKeepAlive: "Jan 24, 2022 @ 9:32",
    status: "active",
  },
  {
    id: 3,
    name: "Ubuntu22",
    ip: "192.168.1.34",
    group: "default ubuntu",
    os: "Ubuntu 22.04 LTS",
    cluster: "worker-node",
    version: "v5.2.1",
    registrationDate: "Mar 15, 2022 @ 12:22",
    lastKeepAlive: "Aug 10, 2023 @ 15:45",
    status: "inactive",
  },
  {
    id: 4,
    name: "Debian",
    ip: "10.0.0.45",
    group: "default debian",
    os: "Debian 11",
    cluster: "worker-node",
    version: "v6.0.0",
    registrationDate: "Jun 01, 2023 @ 08:30",
    lastKeepAlive: "Sep 14, 2023 @ 10:10",
    status: "active",
  },
  {
    id: 5,
    name: "Fedora",
    ip: "172.16.15.23",
    group: "default fedora",
    os: "Fedora 36",
    cluster: "manager-node",
    version: "v7.1.0",
    registrationDate: "Jan 20, 2024 @ 11:00",
    lastKeepAlive: "Sep 14, 2024 @ 11:00",
    status: "active",
  },
  {
    id: 6,
    name: "CentOS8",
    ip: "192.168.0.50",
    group: "default centos",
    os: "CentOS 8",
    cluster: "manager-node",
    version: "v8.4.0",
    registrationDate: "Feb 10, 2022 @ 16:50",
    lastKeepAlive: "Sep 13, 2024 @ 12:25",
    status: "disconnected",
  },
  {
    id: 7,
    name: "SUSE",
    ip: "203.0.113.77",
    group: "default suse",
    os: "SUSE Linux Enterprise Server",
    cluster: "worker-node",
    version: "v12 SP5",
    registrationDate: "Nov 02, 2022 @ 09:15",
    lastKeepAlive: "Jul 22, 2023 @ 14:30",
    status: "never connected",
  },
];

const DashboardCards = () => {
  const stats = getAgentStatistics(agents);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Active Agents Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-700">Active Agents</h3>
        <p className="text-2xl font-bold text-green-600">{stats.activeCount}</p>
        <p className="text-gray-600 mt-2">
          Last registered agent:{" "}
          {stats.mostRecentRegistrationAgent
            ? stats.mostRecentRegistrationAgent.name
            : "N/A"}
        </p>
      </div>
      
      {/* Disconnected Agents Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-700">Disconnected</h3>
        <p className="text-2xl font-bold text-red-600">{stats.disconnectedCount}</p>
      </div>
      
      {/* Never Connected Agents Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-700">Never Connected</h3>
        <p className="text-2xl font-bold text-yellow-600">{stats.neverConnectedCount}</p>
      </div>
      
      {/* Most Active Agent Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-700">Most Active Agent</h3>
        <p className="text-2xl font-bold text-blue-600">
          {stats.mostActiveAgent ? stats.mostActiveAgent.name : "N/A"}
        </p>
      </div>
      
      {/* Agents Coverage Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-700">Agents Coverage</h3>
        <p className="text-2xl font-bold text-purple-600">{stats.coveragePercentage}</p>
      </div>
    </div>
  );
};

export default DashboardCards;
