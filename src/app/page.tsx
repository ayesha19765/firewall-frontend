"use client";

import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import Card, { CardContent, CardProps } from "@/components/Card";
import AgentsTable from "@/components/AgentsTable";
import MlAlerts from "@/components/MlAlerts";
import DonutChart from "@/components/DonutChart";
import LineChart from "@/components/LineChart";
import DashboardCards from "@/components/DashboardCards"; // Import DashboardCards component
import "@fortawesome/fontawesome-free/css/all.min.css";
import Map from "@/components/Map";
import { useUserStore } from "@/lib/store/userStore";
import axios from "axios";
// const mockClientData = [
// 	{
// 		device_name: "Device A",
// 		os: "Windows",
// 		public_ip: "8.8.8.8",
// 		coordinates: { lat: 37.7749, lng: -122.4194 }, // San Francisco
// 		uptime: { days: 5, hours: 3, minutes: 45 },
// 		cpu_info: { cpu_cores: 4, cpu_usage: 50 },
// 		memory_info: { total_memory: 16, used_memory: 8, available_memory: 8 },
// 	},
// 	{
// 		device_name: "Device B",
// 		os: "Linux",
// 		public_ip: "1.1.1.1",
// 		coordinates: { lat: 37.7751, lng: -122.4195 }, // Close to Device A
// 		uptime: { days: 1, hours: 15, minutes: 20 },
// 		cpu_info: { cpu_cores: 8, cpu_usage: 20 },
// 		memory_info: { total_memory: 32, used_memory: 12, available_memory: 20 },
// 	},
// 	{
// 		device_name: "Device C",
// 		os: "MacOS",
// 		public_ip: "8.8.8.9",
// 		coordinates: { lat: 37.7745, lng: -122.4185 }, // Nearby to Device A and B
// 		uptime: { days: 7, hours: 8, minutes: 30 },
// 		cpu_info: { cpu_cores: 4, cpu_usage: 70 },
// 		memory_info: { total_memory: 8, used_memory: 6, available_memory: 2 },
// 	},
// 	{
// 		device_name: "Device D",
// 		os: "Windows",
// 		public_ip: "8.8.8.10",
// 		coordinates: { lat: 37.776, lng: -122.418 }, // Nearby to the other devices
// 		uptime: { days: 3, hours: 5, minutes: 10 },
// 		cpu_info: { cpu_cores: 6, cpu_usage: 40 },
// 		memory_info: { total_memory: 16, used_memory: 10, available_memory: 6 },
// 	},
// 	{
// 		device_name: "Device E",
// 		os: "Linux",
// 		public_ip: "1.1.1.2",
// 		coordinates: { lat: 37.7757, lng: -122.4187 }, // Close to others
// 		uptime: { days: 4, hours: 2, minutes: 50 },
// 		cpu_info: { cpu_cores: 8, cpu_usage: 30 },
// 		memory_info: { total_memory: 32, used_memory: 20, available_memory: 12 },
// 	},
// 	{
// 		device_name: "Device F",
// 		os: "Ubuntu",
// 		public_ip: "8.8.8.11",
// 		coordinates: { lat: 37.7742, lng: -122.419 }, // Close to others
// 		uptime: { days: 10, hours: 4, minutes: 5 },
// 		cpu_info: { cpu_cores: 4, cpu_usage: 60 },
// 		memory_info: { total_memory: 16, used_memory: 12, available_memory: 4 },
// 	},
// 	{
// 		device_name: "Device G",
// 		os: "Windows",
// 		public_ip: "8.8.8.12",
// 		coordinates: { lat: 37.777, lng: -122.4175 }, // Nearby to others
// 		uptime: { days: 8, hours: 3, minutes: 30 },
// 		cpu_info: { cpu_cores: 4, cpu_usage: 55 },
// 		memory_info: { total_memory: 16, used_memory: 10, available_memory: 6 },
// 	},
// 	{
// 		device_name: "Device H",
// 		os: "Windows",
// 		public_ip: "8.8.8.13",
// 		coordinates: { lat: 37.7775, lng: -122.417 }, // Nearby to others
// 		uptime: { days: 2, hours: 7, minutes: 25 },
// 		cpu_info: { cpu_cores: 8, cpu_usage: 65 },
// 		memory_info: { total_memory: 32, used_memory: 25, available_memory: 7 },
// 	},
// 	{
// 		device_name: "Device I",
// 		os: "Linux",
// 		public_ip: "8.8.8.14",
// 		coordinates: { lat: 37.778, lng: -122.4165 }, // Nearby to others
// 		uptime: { days: 6, hours: 9, minutes: 15 },
// 		cpu_info: { cpu_cores: 4, cpu_usage: 45 },
// 		memory_info: { total_memory: 8, used_memory: 5, available_memory: 3 },
// 	},
// 	{
// 		device_name: "Device J",
// 		os: "MacOS",
// 		public_ip: "8.8.8.15",
// 		coordinates: { lat: 37.779, lng: -122.416 }, // Nearby to others
// 		uptime: { days: 11, hours: 12, minutes: 50 },
// 		cpu_info: { cpu_cores: 6, cpu_usage: 30 },
// 		memory_info: { total_memory: 16, used_memory: 8, available_memory: 8 },
// 	},
// ];
const cardData: CardProps[] = [
	// Your card data here...
];
const coordinates = [
	{ lat: 23.0225, lng: 72.5714, label: "Ahemdabad" },
	{ lat: 23.0236, lng: 72.5734, label: "Ahemdabad" },
	{ lat: 23.0257, lng: 72.5814, label: "Ahemdabad" },
	{ lat: 23.0268, lng: 72.5794, label: "Ahemdabad" },
	{ lat: 23.0289, lng: 72.5614, label: "Ahemdabad" },
];
const email = "admin@mail.com";

export default function Home() {
	const [clientData, setClientData] = useState();
	let admin = useUserStore((state) => state.user);
	if (admin == null) admin = JSON.parse(localStorage.getItem("admin"));

	useEffect(() => {
		const func = async () => {
			const clientDataArray = [];
			for (let i = 0; i < admin?.clientID.length; i++) {
				const element = admin?.clientID[i];
				const a = await axios.post("http://localhost:3000/resend/client", {
					clientID: element,
				});
				if (a.data.error) {
					const array = [];
					array.push(element);
					const a = await axios.post("http://localhost:3000/details/clients", {
						clientIDS: array,
					});
					const date = new Date().toISOString();
					const newData = { ...a.data.data[0], last_ping: date };
					clientDataArray.push(newData);
				} else {
					const date = new Date().toISOString();
					const newData = { ...a.data.data[0], last_ping: date };
					clientDataArray.push(newData);
				}
			}
			setClientData(clientDataArray);
		};
		func();
	}, []);
	useEffect(() => {
		console.log(clientData);
		const fetchCoordinates = async () => {
			if (!clientData?.length) return;

			const coordinatesArray = await Promise.all(
				clientData.map(async (client) => {
					try {
						const response = await axios.get(
							`http://ip-api.com/json/${client.public_ip}`
						);
						const { lat, lon } = response.data;
						return { lat, lng: lon, label: client.device_name || "Unknown" };
					} catch (error) {
						console.error(
							`Error fetching coordinates for IP ${client.public_ip}:`,
							error
						);
						return null;
					}
				})
			);

			setCoordinates(coordinatesArray.filter(Boolean)); // Filter out null responses
		};

		fetchCoordinates();
	}, [clientData]);

	return (
		<div className='flex flex-col gap-4 w-full text-sm'>
			<div>Dashboard - {admin?.email}</div>

			{/* Cards Section */}
			<section className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
				{cardData.map((d, i) => (
					<Card
						key={i}
						amount={d.amount}
						discription={d.discription}
						icon={d.icon}
						label={d.label}
					/>
				))}
			</section>

			{/* Top Row: Donut Chart, Summary Card, Line Chart */}
			<section className='grid w-[85vw] md:w-full gap-4 grid-cols-1 md:grid-cols-3'>
				{/* Donut Chart */}
				<div className='flex-1'>
					<CardContent>
						<p className='font-semibold'>Connection Status</p>
						<DonutChart />
					</CardContent>
				</div>

				<div>
					<CardContent>
						<p className='font-semibold'>Location of connected hosts</p>
						<Map coordinates={coordinates} />
					</CardContent>
				</div>
				<div>
					<CardContent>
						<p className='font-semibold'>Location of connected hosts</p>
						<Map coordinates={coordinates} />
					</CardContent>
				</div>

				{/* Compact Summary Card */}
				{/* <div className='flex-1 '>
					<CardContent>
						<DashboardCards />{" "}
						
					</CardContent>
				</div> */}

				{/* Line Chart */}
				{/* <div className="flex-1">
          <CardContent>
            <p className="p-4 font-semibold">Agent Activity</p>
            <LineChart  />
          </CardContent>
        </div> */}
			</section>

			{/* Full-width Agents Table */}
			<section className='w-[85vw] md:w-full'>
				<CardContent>
					<p className='p-4 font-semibold'>Overview</p>
					<AgentsTable clientData={clientData} />
				</CardContent>
			</section>
			<section className='w-[85vw] md:w-full'>
				<CardContent>
					<p className='p-4 font-semibold'>ML Model notifications</p>
					<MlAlerts />
				</CardContent>
			</section>
		</div>
	);
}
