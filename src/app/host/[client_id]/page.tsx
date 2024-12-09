"use client";

import React, { useEffect, useMemo, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import ActiveApplications from "@/components/ActiveApplications";
import Card, { CardContent, CardProps } from "@/components/Card";
import { PolicyColumns, policies } from "@/data/policyData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { GetServerSideProps } from "next";
import { useClientDataStore } from "@/lib/store/staticDataStore";
import axios from "axios";
import ActiveConnections from "@/components/ActiveConnections";
import RunningProcesses from "@/components/RunningProcesses";
import OpenPorts from "@/components/OpenPorts";
import DomainMapping from "@/components/DomainMapping";
import ApplicationData from "@/components/ApplicationData";
import Interfaces from "@/components/Interfaces";
import { useParams } from "react-router-dom";
interface ClientProps {
	clientID: string;
}

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
		accessorKey: "pid",
		header: "Process Id",
	},
	{
		accessorKey: "process_name",
		header: "Process Name",
	},
	{
		accessorKey: "exe",
		header: "Path",
	},
	{
		accessorKey: "app_name",
		header: "Application Name",
	},
];
const ActiveConnectionsColumns: ColumnDef<Policy>[] = [
	{
		accessorKey: "pid",
		header: "Process Id",
	},
	{
		accessorKey: "protocol",
		header: "Protocol",
	},
	{
		accessorKey: "local_address",
		header: "Local Address",
	},
	{
		accessorKey: "remote_address",
		header: "Remote Address",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "process_name",
		header: "Process Name",
	},
];

export default function PolicyPage({ params }: Params) {
	const [clientData, setClientData] = useState();
	const [runningProcesses, setRunningProcesses] = useState();
	const [applicationData, setApplicationData] = useState();
	const [activeConnections, setActiveConnections] = useState();
	const [domainMapping, setDomainMapping] = useState();
	const [interfaces, setInterfaces] = useState();
	const [openPorts, setOpenPorts] = useState();
	const [networkUsage, setNetworkUsage] = useState();
	// const clientID = "3b699cd7-2c43-4a02-8121-d859627d7a03"; // Access the host_id
	const { clientID } = useParams();
	// const { clientData, isLoading, error, fetchClientData } =
	// 	useClientDataStore();
	useEffect(() => {
		// fetchClientData(clientID);
		const func = async () => {
			const a = await axios.post("http://localhost:3000/details/client", {
				clientID: clientID,
			});
			if (a.data.error) {
				const array = [];
				array.push(clientID);
				const a = await axios.post("http://localhost:3000/details/clients", {
					clientIDS: array,
				});
				const date = new Date().toISOString();
				const newData = { ...a.data.data[0], last_ping: date };
				setClientData(newData);
			} else {
				const date = new Date().toISOString();
				const newData = { ...a.data.data[0], last_ping: date };
				setClientData(newData);
			}
		};
		func();
	}, [clientID]);
	useEffect(() => {
		setRunningProcesses(clientData?.running_processes);
		setActiveConnections(clientData?.active_connections);
		setOpenPorts(clientData?.open_ports);
		setDomainMapping(clientData?.domain_mapping);
		setApplicationData(clientData?.application_data);
		setInterfaces(clientData?.network_interfaces);
		setNetworkUsage(clientData?.network_usage);
		console.log(clientData);
		// setNetworkActivity(clientData?.network);
	}, [clientData]);

	const dataElement = useMemo(() => {
		return (
			<div className='bg-gray-100 p-2 border-2 shadow-md'>
				<div className='grid grid-cols-2 gap-x-8 gap-y-4 px-6 py-2 text-xs'>
					<div>
						<span className='font-semibold'>Device Name:</span>{" "}
						{clientData?.device_info?.device_name || "N/A"}
					</div>
					<div>
						<span className='font-semibold'>OS:</span>{" "}
						{clientData?.device_info?.os || "N/A"}
					</div>
					<div>
						<span className='font-semibold'>IP Address:</span>{" "}
						{clientData?.device_info?.public_ip || "N/A"}
					</div>
					<div>
						<span className='font-semibold'>Up Time:</span>{" "}
						{clientData?.device_info?.uptime?.days || "N/A"} days{" "}
						{clientData?.device_info?.uptime?.hours || "N/A"} hours
					</div>
					<div>
						<span className='font-semibold'>CPU Cores:</span>{" "}
						{clientData?.device_info?.cpu_info?.cpu_cores || "N/A"}
					</div>
					<div>
						<span className='font-semibold'>CPU Usage:</span>{" "}
						{clientData?.device_info?.cpu_info?.cpu_usage || "N/A"}%
					</div>
					<div>
						<span className='font-semibold'>Total Memory:</span>{" "}
						{clientData?.device_info?.memory_info?.total_memory?.toFixed(2) ||
							"N/A"}
					</div>
					<div>
						<span className='font-semibold'>Used Memory:</span>{" "}
						{clientData?.device_info?.memory_info?.used_memory || "N/A"}
					</div>
					<div>
						<span className='font-semibold'>Last Ping:</span>{" "}
						{clientData?.last_ping
							? new Date(clientData.last_ping).toISOString()
							: "N/A"}
					</div>
				</div>
			</div>
		);
	}, [clientData]);

	return (
		<div className='flex flex-col gap-5 w-full text-sm'>
			<div>Host - {clientData?.device_info?.device_name || ""}</div>

			{/* Display Node Info */}
			{dataElement}
			{/* Policy DataTable */}

			<Tabs
				defaultValue='account'
				className=''>
				<TabsList>
					<TabsTrigger value='account'>Running Applications</TabsTrigger>
					<TabsTrigger value='password'>Active Connections</TabsTrigger>
					<TabsTrigger value='ports'>Open Ports</TabsTrigger>
					<TabsTrigger value='domain'>Domain Mapping</TabsTrigger>
					<TabsTrigger value='appdata'>Application Data</TabsTrigger>
					<TabsTrigger value='interfaces'>Network Interfaces</TabsTrigger>
					<TabsTrigger value='network_usage'>Network Usage</TabsTrigger>
				</TabsList>
				<TabsContent value='account'>
					<CardContent>
						<div>Running Applications</div>
						<RunningProcesses data={runningProcesses} />
					</CardContent>
				</TabsContent>
				<TabsContent value='password'>
					<CardContent>
						<div>Applied Policies</div>
						{activeConnections && (
							<ActiveConnections data={activeConnections} />
						)}
					</CardContent>
				</TabsContent>
				<TabsContent value='ports'>
					<CardContent>
						<div>Open Ports</div>
						{openPorts && <OpenPorts data={openPorts} />}
					</CardContent>
				</TabsContent>
				<TabsContent value='domain'>
					<CardContent>
						<div>Domain Mapping</div>
						{domainMapping && <DomainMapping data={domainMapping} />}
					</CardContent>
				</TabsContent>
				<TabsContent value='appdata'>
					<CardContent>
						<div>Application Data</div>
						{applicationData && <ApplicationData data={applicationData} />}
					</CardContent>
				</TabsContent>
				<TabsContent value='interfaces'>
					<CardContent>
						<div>Application Data</div>
						{applicationData && <Interfaces data={interfaces} />}
					</CardContent>
				</TabsContent>
				<TabsContent value='network_usage'>
					<CardContent>
						<div className='bg-gray-100 p-2 border-2 shadow-md'>
							<div className='grid grid-cols-2 gap-x-8 gap-y-4 px-6 py-2 text-xs'>
								<div>
									<span className='font-semibold'>Time of report:</span>{" "}
									{clientData?.network_usage?.time_of_report || "N/A"}
								</div>
								<div>
									<span className='font-semibold'>Bytes Sent:</span>{" "}
									{clientData?.network_usage?.bytes_sent || "N/A"}
								</div>
								<div>
									<span className='font-semibold'>Bytes Received:</span>{" "}
									{clientData?.network_usage?.bytes_received || "N/A"}
								</div>
								<div>
									<span className='font-semibold'>Packets Sent:</span>{" "}
									{clientData?.network_usage?.packets_sent || "N/A"}
								</div>
								<div>
									<span className='font-semibold'>Packets received:</span>{" "}
									{clientData?.network_usage?.packets_received || "N/A"}
								</div>
							</div>
						</div>
					</CardContent>
				</TabsContent>
			</Tabs>
		</div>
	);
}
