"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, CogIcon } from "@heroicons/react/24/solid";
import { nodes } from "../data/nodesData"; // Import the nodes data
import { useUserStore } from "@/lib/store/userStore";

export default function NodesTable({ clientData }: any) {
	const admin = useUserStore((state) => state.user);
	const router = useRouter(); // Initialize the router

	const navigateToPolicy = () => {
		router.push(`/policy`); // Navigate to the Policy page
	};

	const navigateToLog = () => {
		router.push(`/log`); // Navigate to the Log page
	};

	const navigateToHost = (node_id: any) => {
		router.push(`host/${node_id}`);
	};

	return (
		<div className='overflow-x-auto'>
			<table className='min-w-full bg-white border border-gray-200'>
				<thead className='bg-gray-100'>
					<tr>
						<th className='px-4 py-2 border text-left'>Client ID</th>
						<th className='px-4 py-2 border text-left'>Device Name</th>
						<th className='px-4 py-2 border text-left'>IP Address</th>
						<th className='px-4 py-2 border text-left'>OS</th>
					</tr>
				</thead>
				<tbody>
					{clientData?.map((node, index) => (
						<tr
							key={index}
							onClick={() => navigateToHost(node?.clientID)}
							className='cursor-pointer'>
							<td className='px-4 py-2 border'>{node?.clientID || ""}</td>
							<td className='px-4 py-2 border'>
								{node.device_info.deviceName}
							</td>
							<td className='px-4 py-2 border'>
								{node?.device_info?.public_ip}
							</td>
							<td className='px-4 py-2 border'>{node?.device_info?.os}</td>

							{/* <td className='px-4 py-2 border'>
								<span
									className={`${
										node.status === "active"
											? "text-green-600"
											: node.status === "inactive"
											? "text-red-600"
											: "text-yellow-600"
									}`}>
									{node.status}
								</span>
							</td>
							<td className='px-4 py-2 border'>{node.lastPing}</td>
							<td className='px-4 py-2 border'>{node.anomaliesDetected}</td> */}
							{/* <td className='px-4 py-2 border'>
								<button
									onClick={navigateToPolicy}
									title='View Policies'>
									<EyeIcon className='h-5 w-5 text-blue-500' />
								</button>
								<button
									onClick={navigateToLog}
									title='Add Policy'>
									<CogIcon className='h-5 w-5 text-gray-500' />
								</button>
							</td> */}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
