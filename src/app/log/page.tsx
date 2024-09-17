"use client";

import React from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

// Define the type for Log entries
type Log = {
  id: string;
  timestamp: string;
  severity: string;
  message: string;
};

// Define the type for Node information
type NodeInfo = {
  deviceName: string;
  platform: string;
  ip: string;
  apiKey: string;
  os: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  lastPing: string;
  installedAt: string;
};

// Example Node information
const nodeInfo: NodeInfo = {
  deviceName: "Node 001",
  platform: "Linux",
  ip: "192.168.1.101",
  apiKey: "ABC123XYZ",
  os: "Ubuntu 20.04",
  cpuUsage: 45,
  memoryUsage: 70,
  diskUsage: 55,
  lastPing: "2024-09-10 15:30:00",
  installedAt: "2023-09-10 12:00:00"
};

// Define columns for the DataTable
const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "id",
    header: "Log ID"
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp"
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-200": row.getValue("severity") === "Error",
            "bg-yellow-200": row.getValue("severity") === "Warning",
            "bg-green-200": row.getValue("severity") === "Info"
          })}
        >
          {row.getValue("severity")}
        </div>
      );
    }
  },
  {
    accessorKey: "message",
    header: "Message"
  }
];

// Hardcoded log data for the node
const logData: Log[] = [
  {
    id: "LOG001",
    timestamp: "2024-09-10 10:45:00",
    severity: "Info",
    message: "Node 001 is active."
  },
  {
    id: "LOG002",
    timestamp: "2024-09-10 11:00:00",
    severity: "Warning",
    message: "Node 001 is experiencing intermittent connectivity issues."
  },
  {
    id: "LOG003",
    timestamp: "2024-09-10 11:30:00",
    severity: "Error",
    message: "Node 001 failed to respond to health check."
  },
  // ... (other logs)
];

export default function LogsPage() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Logs" />

      {/* Node Information */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6">
        {/* Left section with node details */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Node Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Device Name:</strong> {nodeInfo.deviceName}</p>
            <p><strong>Platform:</strong> {nodeInfo.platform}</p>
            <p><strong>IP Address:</strong> {nodeInfo.ip}</p>
            <p><strong>API Key:</strong> {nodeInfo.apiKey}</p>
            <p><strong>OS:</strong> {nodeInfo.os}</p>
          </div>
        </div>

        {/* Right section with resource usage */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Resource Usage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>CPU Usage:</strong> {nodeInfo.cpuUsage}%</p>
            <p><strong>Memory Usage:</strong> {nodeInfo.memoryUsage}%</p>
            <p><strong>Disk Usage:</strong> {nodeInfo.diskUsage}%</p>
            <p><strong>Last Ping:</strong> {nodeInfo.lastPing}</p>
            <p><strong>Installed At:</strong> {nodeInfo.installedAt}</p>
          </div>
        </div>
      </div>

      {/* Logs DataTable */}
      <DataTable columns={columns} data={logData} />
    </div>
  );
}
