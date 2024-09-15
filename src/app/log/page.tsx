"use client";

import React from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { nodes } from "../../data/nodesData"; // Adjusted import path



type Log = {
  id: string;
  timestamp: string;
  severity: string;
  message: string;
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

// Function to convert nodes data to log format
const transformNodesToLogs = (nodes: any[]): Log[] => {
  return nodes.map((node) => ({
    id: `LOG${node.id.toString().padStart(3, '0')}`, // Create a log ID
    timestamp: node.lastPing, // Use the lastPing as timestamp
    severity: node.status === "active" ? "Info" : node.status === "inactive" ? "Warning" : "Error", // Map status to severity
    message: `Node ${node.deviceName} is ${node.status}.` // Create a log message
  }));
};

// Transform nodes data into log data
const logData = transformNodesToLogs(nodes);

export default function LogsPage() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Logs" />
      <DataTable columns={columns} data={logData} />
    </div>
  );
}
