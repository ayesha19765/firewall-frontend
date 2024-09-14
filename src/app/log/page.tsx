/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import React from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

type Log = {
  id: string;
  timestamp: string;
  severity: string;
  message: string;
};

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

const data: Log[] = [
  {
    id: "LOG001",
    timestamp: "2024-01-15 12:34:56",
    severity: "Info",
    message: "System started successfully."
  },
  {
    id: "LOG002",
    timestamp: "2024-02-20 09:20:30",
    severity: "Warning",
    message: "High memory usage detected."
  },
  {
    id: "LOG003",
    timestamp: "2024-03-10 14:15:22",
    severity: "Error",
    message: "Failed to connect to the database."
  },
  // Add more logs as needed
];

export default function LogsPage() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Logs" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
