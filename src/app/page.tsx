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
import AlertsChart from "@/components/AlertsChart";

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
						<AlertsChart />
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
