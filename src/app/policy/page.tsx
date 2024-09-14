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

type Policy = {
  id: string;
  policyName: string;
  status: string;
  lastUpdated: string;
  details: string;
};

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

const data: Policy[] = [
  {
    id: "POL001",
    policyName: "Firewall Policy",
    status: "Active",
    lastUpdated: "2024-01-15",
    details: "Details about Firewall Policy"
  },
  {
    id: "POL002",
    policyName: "Network Access Policy",
    status: "Inactive",
    lastUpdated: "2024-02-20",
    details: "Details about Network Access Policy"
  },
  // Add more policies as needed
];

export default function PolicyPage() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Policy" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
