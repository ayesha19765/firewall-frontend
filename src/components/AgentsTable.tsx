"use client"; // Ensure this file is a client component

import React from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, CogIcon } from "@heroicons/react/24/solid"; // Ensure heroicons is installed

export interface Node {
  id: number;
  deviceName: string;
  ip: string;
  platform: string;
  status: string;
  lastPing: string;
  anomaliesDetected: string;
}

const nodes: Node[] = [
  {
    id: 1,
    deviceName: "Device 1",
    ip: "192.168.1.1",
    platform: "Linux",
    status: "active",
    lastPing: "2024-09-13 12:34:56",
    anomaliesDetected: "Yes",
  },
  {
    id: 2,
    deviceName: "Device 2",
    ip: "192.168.1.2",
    platform: "Windows",
    status: "inactive",
    lastPing: "2024-09-12 10:20:30",
    anomaliesDetected: "No",
  },
  // Add more nodes as needed
];

export default function NodesTable() {
  const router = useRouter(); // Initialize the router

  const handleViewPolicy = (id: number) => {
    router.push(`/orders`); // Navigate to the View Policies page
  };

  const handleAddPolicy = (id: number) => {
    router.push(`/settings`); // Navigate to the Add Policy page
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Node ID</th>
            <th className="px-4 py-2 border">Device Name</th>
            <th className="px-4 py-2 border">IP Address</th>
            <th className="px-4 py-2 border">Platform</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Last Ping</th>
            <th className="px-4 py-2 border">Anomalies Detected</th>
            <th className="px-4 py-2 border">Actions</th> {/* Added Actions header */}
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => (
            <tr key={node.id}>
              <td className="px-4 py-2 border">{node.id}</td>
              <td className="px-4 py-2 border">{node.deviceName}</td>
              <td className="px-4 py-2 border">{node.ip}</td>
              <td className="px-4 py-2 border">{node.platform}</td>
              <td className="px-4 py-2 border">
                <span
                  className={`${
                    node.status === "active"
                      ? "text-green-600"
                      : node.status === "inactive"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {node.status}
                </span>
              </td>
              <td className="px-4 py-2 border">{node.lastPing}</td>
              <td className="px-4 py-2 border">{node.anomaliesDetected}</td>
              <td className="px-4 py-2 border">
                <button onClick={() => handleViewPolicy(node.id)} title="View Policies">
                  <EyeIcon className="h-5 w-5 text-blue-500" />
                </button>
                <button onClick={() => handleAddPolicy(node.id)} title="Add Policy">
                  <CogIcon className="h-5 w-5 text-gray-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
