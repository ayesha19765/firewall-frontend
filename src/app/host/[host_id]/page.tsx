"use client";

import React from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import ActiveApplications from "@/components/ActiveApplications";
import Card, { CardContent, CardProps } from "@/components/Card";
import { PolicyColumns, policies } from "@/data/policyData";

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
		diskUsage: 70, // Disk usage in percentage
	},
	lastPing: "2024-09-10 10:45:00",
	installedAt: "2024-01-01",
};
// Define policy table data
interface App {
	id: string;
	appName: string; // General application name
	lastUpdated: string;
	details: string;
	path: string;
	domains: string[];
	protocols: string[];
}
type Params = {
	params: any;
};

// Define columns for the DataTable
const AppColumns: ColumnDef<Policy>[] = [
	{
		accessorKey: "id",
		header: "Process Id",
	},
	{
		accessorKey: "appName",
		header: "Application Name",
	},
	{
		accessorKey: "path",
		header: "Path",
	},
	{
		accessorKey: "domains",
		header: "Domains",
	},
	{
		accessorKey: "protocols",
		header: "Protocols",
	},
	{
		accessorKey: "lastUpdated",
		header: "Last Updated",
	},
];
// Hardcoded policy data for Node 001
const AppData: App[] = [
	{
		id: "POL001",
		appName: "Chrome",
		lastUpdated: "2024-01-15",
		details: "Details about Chrome browser's network policy.",
		path: "/chrome",
		domains: ["chrome.example.com", "www.chrome.com"],
		protocols: ["HTTP", "HTTPS"],
	},
	{
		id: "POL002",
		appName: "Brave",
		lastUpdated: "2024-02-20",
		details: "Details about Brave browser's network policy.",
		path: "/brave",
		domains: ["brave.example.com", "www.brave.com"],
		protocols: ["HTTPS"],
	},
	{
		id: "POL003",
		appName: "Firefox",
		lastUpdated: "2024-03-05",
		details: "Details about Firefox browser's network policy.",
		path: "/firefox",
		domains: ["firefox.example.com", "www.firefox.com"],
		protocols: ["HTTP", "HTTPS", "FTP"],
	},
	{
		id: "POL004",
		appName: "Safari",
		lastUpdated: "2024-04-10",
		details: "Details about Safari browser's network policy.",
		path: "/safari",
		domains: ["safari.example.com"],
		protocols: ["HTTPS"],
	},
	{
		id: "POL005",
		appName: "Edge",
		lastUpdated: "2024-05-12",
		details: "Details about Edge browser's network policy.",
		path: "/edge",
		domains: ["edge.example.com", "www.edge.com"],
		protocols: ["HTTP", "HTTPS", "TCP"],
	},
	{
		id: "POL006",
		appName: "Opera",
		lastUpdated: "2024-06-25",
		details: "Details about Opera browser's network policy.",
		path: "/opera",
		domains: ["opera.example.com"],
		protocols: ["HTTPS"],
	},
	{
		id: "POL007",
		appName: "Vivaldi",
		lastUpdated: "2024-07-30",
		details: "Details about Vivaldi browser's network policy.",
		path: "/vivaldi",
		domains: ["vivaldi.example.com", "www.vivaldi.com"],
		protocols: ["SMTP", "HTTPS"],
	},
	{
		id: "POL008",
		appName: "Tor",
		lastUpdated: "2024-08-14",
		details: "Details about Tor browser's network policy.",
		path: "/tor",
		domains: ["tor.example.com"],
		protocols: ["HTTP", "HTTPS"],
	},
	{
		id: "POL009",
		appName: "DuckDuckGo",
		lastUpdated: "2024-09-01",
		details: "Details about DuckDuckGo's network policy.",
		path: "/duckduckgo",
		domains: ["duckduckgo.com", "www.duckduckgo.com"],
		protocols: ["HTTP", "FTP", "HTTPS"],
	},
	{
		id: "POL010",
		appName: "Microsoft Edge",
		lastUpdated: "2024-09-10",
		details: "Details about Microsoft Edge browser's network policy.",
		path: "/microsoft-edge",
		domains: ["microsoftedge.example.com"],
		protocols: ["HTTPS"],
	},
];

export default function PolicyPage({ params }: Params) {
	const { host_id } = params; // Access the host_id
	return (
		<div className='flex flex-col gap-5 w-full text-sm'>
			<div>Host - {host_id}</div>

			{/* Display Node Info */}
			<div className='bg-gray-100 p-2 border-2 shadow-md'>
				<div className='grid grid-cols-2 gap-x-8 gap-y-4 px-6 py-2 text-xs'>
					<div>
						<span className='font-semibold'>Device Name:</span>{" "}
						{nodeInfo.deviceName}
					</div>
					<div>
						<span className='font-semibold'>Platform:</span> {nodeInfo.platform}
					</div>
					<div>
						<span className='font-semibold'>IP Address:</span> {nodeInfo.ip}
					</div>
					<div>
						<span className='font-semibold'>API Key:</span> {nodeInfo.apiKey}
					</div>
					<div>
						<span className='font-semibold'>OS:</span> {nodeInfo.metadata.os}
					</div>
					<div>
						<span className='font-semibold'>CPU Usage:</span>{" "}
						{nodeInfo.metadata.cpuUsage}%
					</div>
					<div>
						<span className='font-semibold'>Memory Usage:</span>{" "}
						{nodeInfo.metadata.memoryUsage}%
					</div>
					<div>
						<span className='font-semibold'>Disk Usage:</span>{" "}
						{nodeInfo.metadata.diskUsage}%
					</div>
					<div>
						<span className='font-semibold'>Last Ping:</span>{" "}
						{nodeInfo.lastPing}
					</div>
					<div>
						<span className='font-semibold'>Installed At:</span>{" "}
						{nodeInfo.installedAt}
					</div>
				</div>
			</div>

			{/* Policy DataTable */}

			<CardContent>
				<div>Running Applications</div>
				<DataTable
					columns={AppColumns}
					data={AppData}
				/>
			</CardContent>
			<CardContent>
				<div>Applied Policies</div>
				<DataTable
					columns={PolicyColumns}
					data={policies}
				/>
			</CardContent>
		</div>
	);
}
