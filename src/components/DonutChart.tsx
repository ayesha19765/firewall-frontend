"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DonutChart = ({ activeConnectionsNo, inactiveConnectionsNo }) => {
	// Chart data using props
	const data = {
		labels: ["Active", "Inactive"],
		datasets: [
			{
				data: [activeConnectionsNo, inactiveConnectionsNo],
				backgroundColor: ["#0088FE", "#FF8042"],
				borderWidth: 0,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false, // Hide the built-in legend
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						let label = context.label || "";
						if (context.parsed !== null) {
							label += `: ${context.parsed}`;
						}
						return label;
					},
				},
			},
			title: {
				display: false,
			},
		},
		cutout: "75%",
	};

	return (
		<div
			style={{
				height: "200px",
				width: "100%",
				display: "flex",
				alignItems: "center",
			}}>
			<div
				style={{
					flex: "2",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<div style={{ width: "70%", height: "70%" }}>
					<Doughnut
						data={data}
						options={options}
					/>
				</div>
			</div>
			<div
				style={{
					flex: "1",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "flex-start",
				}}>
				{data.labels.map((label, index) => (
					<div
						key={label}
						style={{
							marginBottom: "8px",
							display: "flex",
							alignItems: "center",
						}}>
						<div
							style={{
								width: "12px",
								height: "12px",
								backgroundColor: data.datasets[0].backgroundColor[index],
								marginRight: "8px",
							}}></div>
						<span style={{ fontSize: "12px" }}>
							{label}: {data.datasets[0].data[index]}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default DonutChart;
