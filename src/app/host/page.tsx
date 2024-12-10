"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

export default function HostsOverall() {
	const [activeClients, setActiveClients] = useState();
	const [inactiveClients, setInactiveClients] = useState();
	const [adminEmail, setAdminEmail] = useState<string>("");
	const router = useRouter();

	useEffect(() => {
		// Fetch hosts and admin email from your backend API
		const fetchData = async () => {
			try {
				const hostsResponse = await axios.post(
					"http://localhost:3000/details/admin"
				);
				const activeClients = await hostsResponse.data.activeClients;
				const inactiveClients = await hostsResponse.data.admin.clientID;

				const adminResponse = await fetch("/api/admin");
				const adminData = await adminResponse.json();
				setAdminEmail(adminData.email);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const navigateToHost = (clientId: string) => {
		router.push(`/host/${clientId}`);
	};

	const HostCard = ({ host }: { host: Host }) => (
		<Card
			className='mb-4 cursor-pointer hover:shadow-md transition-shadow'
			onClick={() => navigateToHost(host.id)}>
			<CardHeader>
				<CardTitle>{host.deviceName}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>IP: {host.ip}</p>
				<p>OS: {host.os}</p>
			</CardContent>
		</Card>
	);

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Hosts Overview</h1>
			<p className='mb-6'>Admin: {adminEmail}</p>

			<div className='flex flex-col md:flex-row gap-6'>
				<div className='flex-1'>
					<h2 className='text-xl font-semibold mb-4 flex items-center'>
						<span className='w-3 h-3 bg-green-500 rounded-full mr-2'></span>
						Active Hosts
					</h2>
					<ScrollArea className='h-[calc(100vh-200px)]'>
						{hosts
							.filter((host) => host.isActive)
							.map((host) => (
								<HostCard
									key={host.id}
									host={host}
								/>
							))}
					</ScrollArea>
				</div>

				<div className='flex-1'>
					<h2 className='text-xl font-semibold mb-4 flex items-center'>
						<span className='w-3 h-3 bg-red-500 rounded-full mr-2'></span>
						Inactive Hosts
					</h2>
					<ScrollArea className='h-[calc(100vh-200px)]'>
						{hosts
							.filter((host) => !host.isActive)
							.map((host) => (
								<HostCard
									key={host.id}
									host={host}
								/>
							))}
					</ScrollArea>
				</div>
			</div>
		</div>
	);
}
