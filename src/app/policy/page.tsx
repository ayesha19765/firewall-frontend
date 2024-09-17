"use client";

import React from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

// Node info
const nodeInfo = {
  deviceName: "Node 001",
  platform: "Linux",
  ip: "192.168.0.101",
  apiKey: "1234-5678-91011",
  userId: "User123",
  metadata: {
    os: "Ubuntu 20.04",
    cpuUsage: 45, // CPU usage in percentage
    memoryUsage: 60, // Memory usage in percentage
    diskUsage: 70 // Disk usage in percentage
  },
  lastPing: "2024-09-10 10:45:00",
  installedAt: "2024-01-01"
};

// Define policy table data
type Policy = {
  id: string;
  policyName: string;
  status: string;
  lastUpdated: string;
  details: string;
};

// Define columns for the DataTable
const columns: ColumnDef<Policy>[] = [
  {
    accessorKey: "id",
    header: "Policy ID"
  },
  {
    accessorKey: "policyName",
    header: "Policy Name"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-200": row.getValue("status") === "Inactive",
            "bg-green-200": row.getValue("status") === "Active"
          })}
        >
          {row.getValue("status")}
        </div>
      );
    }
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated"
  },
  {
    accessorKey: "details",
    header: "Details"
  }
];

// Hardcoded policy data for Node 001
const data: Policy[] = [
  {
    id: "POL001",
    policyName: "Firewall Policy",
    status: "Active",
    lastUpdated: "2024-01-15",
    details: "Details about Firewall Policy for Node 001"
  },
  {
    id: "POL002",
    policyName: "Network Access Policy",
    status: "Inactive",
    lastUpdated: "2024-02-20",
    details: "Details about Network Access Policy for Node 001"
  },
  {
    id: "POL003",
    policyName: "Data Encryption Policy",
    status: "Active",
    lastUpdated: "2024-03-05",
    details: "Details about Data Encryption Policy for Node 001"
  },
  {
    id: "POL004",
    policyName: "Application Control Policy",
    status: "Inactive",
    lastUpdated: "2024-04-10",
    details: "Details about Application Control Policy for Node 001"
  },
  {
    id: "POL005",
    policyName: "Intrusion Prevention Policy",
    status: "Active",
    lastUpdated: "2024-05-12",
    details: "Details about Intrusion Prevention Policy for Node 001"
  },
  {
    id: "POL006",
    policyName: "Web Filtering Policy",
    status: "Inactive",
    lastUpdated: "2024-06-25",
    details: "Details about Web Filtering Policy for Node 001"
  },
  {
    id: "POL007",
    policyName: "Email Security Policy",
    status: "Active",
    lastUpdated: "2024-07-30",
    details: "Details about Email Security Policy for Node 001"
  },
  {
    id: "POL008",
    policyName: "Antivirus Policy",
    status: "Inactive",
    lastUpdated: "2024-08-14",
    details: "Details about Antivirus Policy for Node 001"
  },
  {
    id: "POL009",
    policyName: "Bandwidth Control Policy",
    status: "Active",
    lastUpdated: "2024-09-01",
    details: "Details about Bandwidth Control Policy for Node 001"
  },
  {
    id: "POL010",
    policyName: "Access Control Policy",
    status: "Inactive",
    lastUpdated: "2024-09-10",
    details: "Details about Access Control Policy for Node 001"
  }
];

export default function PolicyPage() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Policy" />
      
      {/* Display Node Info */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Node Information</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <span className="font-semibold">Device Name:</span> {nodeInfo.deviceName}
          </div>
          <div>
            <span className="font-semibold">Platform:</span> {nodeInfo.platform}
          </div>
          <div>
            <span className="font-semibold">IP Address:</span> {nodeInfo.ip}
          </div>
          <div>
            <span className="font-semibold">API Key:</span> {nodeInfo.apiKey}
          </div>
          <div>
            <span className="font-semibold">OS:</span> {nodeInfo.metadata.os}
          </div>
          <div>
            <span className="font-semibold">CPU Usage:</span> {nodeInfo.metadata.cpuUsage}%
          </div>
          <div>
            <span className="font-semibold">Memory Usage:</span> {nodeInfo.metadata.memoryUsage}%
          </div>
          <div>
            <span className="font-semibold">Disk Usage:</span> {nodeInfo.metadata.diskUsage}%
          </div>
          <div>
            <span className="font-semibold">Last Ping:</span> {nodeInfo.lastPing}
          </div>
          <div>
            <span className="font-semibold">Installed At:</span> {nodeInfo.installedAt}
          </div>
        </div>
      </div>

      {/* Policy DataTable */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
