"use client";

import { useEffect, useState } from "react";
import { Plus, Import } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlocksTable } from "@/components/RulesTable";
import { BlocksFilter } from "@/components/RulesFilterBox";
import { BlocksSort } from "@/components/SortRulesWindow";
import { AddRuleDialog } from "@/components/AddRuleWindow";
import { useToast } from "@/components/hooks/use-toast";
import { mockRules } from "@/data/rulesData";
import type { BlockRule, FilterOptions, SortOption } from "@/types/rules";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/userStore";
import useSocket from "@/lib/hooks/useSocket";

export default function Blocks() {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const socket = useSocket();
	const [rules, setRules] = useState([]);
	const handleDeleteRule = async ({ clientID, appName, ruleName }) => {
		const response = await axios.post(
			`http://localhost:3000/rules/delete-rule`,
			{
				clientID,
				appName,
				ruleName,
			}
		);
	};
	const handleGetRules = async () => {
		const response = await axios.get(
			`http://localhost:3000/rules/get-rules-created-by-admin`
		);
		localStorage.setItem("admin_rules", JSON.stringify(response.data.rules));
	};

	useEffect(() => {
		console.log("dfkjbdsnj");
		handleGetRules();

		if (socket) {
			console.log(socket);
			console.log("ddsjfbjsndklsfnlasfkasbfkjds");
			// Listen for events

			socket.emit("message", {
				"data ": localStorage,
			});
			socket.on("message", (data) => {
				console.log("Received message:", data);
			});
			socket.on("get_rules", (data) => {
				console.log(data);
			});

			// Emit an event
			// socket.emit("joinRoom", { room: "room1" });
		}

		// Cleanup the listeners
		return () => {
			if (socket) {
				socket.off("message");
			}
		};
	}, [socket]);

	return (
		<div className='container mx-auto py-6 w-full'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-3xl font-bold'>Rules</h1>
				<div className='flex gap-2'>
					<AddRuleDialog
						open={isAddDialogOpen}
						onOpenChange={setIsAddDialogOpen}
					/>

					<Button variant='outline'>
						<Import className='mr-2 h-4 w-4' />
						Import
					</Button>
				</div>
			</div>

			<div className='grid grid-cols-12 gap-6 '>
				{/* <div className='col-span-3 w-[20%]'>
					<BlocksFilter
						filters={filters}
						onFiltersChange={setFilters}
					/>
				</div> */}

				<div className='col-span-7 w-[72vw]'>
					{/* <BlocksTable
						rules={rules}
						onStatusChange={(id, status) => {
							setRules(
								rules.map((rule) =>
									rule.id === id ? { ...rule, status } : rule
								)
							);
						}}
					/> */}
				</div>
			</div>
		</div>
	);
}
