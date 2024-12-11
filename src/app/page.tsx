"use client";

import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import Card, { CardContent, CardProps } from "@/components/Card";
import AgentsTable from "@/components/AgentsTable";
import MlAlerts from "@/components/MlAlerts";
import RulesAlerts from "@/components/RulesAlerts";
import DonutChart from "@/components/DonutChart";
import LineChart from "@/components/LineChart";
import DashboardCards from "@/components/DashboardCards"; // Import DashboardCards component
import "@fortawesome/fontawesome-free/css/all.min.css";
import Map from "@/components/Map";
import { useUserStore } from "@/lib/store/userStore";
import { useClientDataStore } from "@/lib/store/clientDataStore";
import { useAdminStore } from "@/lib/store/adminData";
import axios from "axios";
import AlertsChart from "@/components/AlertsChart";
import { useRouter } from "next/navigation";

const cardData: CardProps[] = [
	// Your card data here...
];

export default function Home() {
	// const [activeClients, setActiveClients] = useState();
	// const [inactiveClients, setInactiveClients] = useState();
	const router = useRouter();
	const [coordinates, setCoordinates] = useState([]);

	// const [clientData, setClientData] = useState();
	// const [adminData, setAdminData] = useState();

	useEffect(() => {
		const adminEmail = JSON.parse(localStorage.getItem("adminEmail"));
		// if (!adminEmail) router.push("/login");
		const fetchDetails = async () => {
			const response = await axios.post("http://localhost:3000/details/", {
				email: adminEmail,
			});
			console.log(response);
			localStorage.setItem("adminDetails", JSON.stringify(response.data.admin));
			localStorage.setItem(
				"activeClients",
				JSON.stringify(response.data.activeClients)
			);
			localStorage.setItem(
				"clientDetails",
				JSON.stringify(response.data.clientDetails)
			);
		};
		fetchDetails();
	}, []);

	const adminData = JSON.parse(localStorage.getItem("adminDetails"));
	const clientData = JSON.parse(localStorage.getItem("clientDetails"));
	const activeClients = JSON.parse(localStorage.getItem("activeClients"));
	const inactiveClients = [];

	return (
		<div className='flex flex-col gap-4 w-full text-sm'>
			<div>Dashboard - {adminData?.email}</div>

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
						<DonutChart
							activeConnectionsNo={activeClients?.length ?? 0}
							inactiveConnectionsNo={
								(inactiveClients?.length ?? 0) - (activeClients?.length ?? 0)
							}
						/>
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
					<AgentsTable />
				</CardContent>
			</section>
			<section className='w-[85vw] md:w-full'>
				<CardContent>
					<p className='p-4 font-semibold'>Rule Alerts</p>
					{/* <MlAlerts /> */}
					<RulesAlerts />
				</CardContent>
			</section>
		</div>
	);
}
/*
login
signup
host
rules

add-rule
log
profile
settings
treeview2
users
*/
