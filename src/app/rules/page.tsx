"use client";

import { useState } from "react";
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

export default function Blocks() {
	const toast = useToast();
	const [rules, setRules] = useState<BlockRule[]>(mockRules);
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [filters, setFilters] = useState<FilterOptions>({
		appCategory: [],
		hosts: [],
		domains: [],
		internetAccess: false,
		timeRange: {
			start: null,
			end: null,
		},
	});
	const [sortBy, setSortBy] = useState<SortOption>("timeApplied");

	const callAPI = (rules: any) => {
		try {
			const response = axios.post("http://localhost:3000/rules/add-app-rules", {
				rules: rules,
				clientID: rules.clientID,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='container mx-auto py-6 w-full'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-3xl font-bold'>Rules</h1>
				<div className='flex gap-2'>
					<AddRuleDialog
						open={isAddDialogOpen}
						onOpenChange={setIsAddDialogOpen}
						onAddRules={(rule: any) => {
							setRules([...rules, rule]);
							// if (rules.clientID == null) {
							// 	alert("Please select Host");
							// 	return;
							// } else if (
							// 	rules.rules[0].appName == null &&
							// 	rules.rules[0].domain == null &&
							// 	rules.rules[0].ports == null
							// ) {
							// 	alert("Please select Host");
							// 	return;
							// }
							console.log(rule);
							setIsAddDialogOpen(false);
							callAPI(rule);
						}}
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
					<BlocksTable
						rules={rules}
						onStatusChange={(id, status) => {
							setRules(
								rules.map((rule) =>
									rule.id === id ? { ...rule, status } : rule
								)
							);
						}}
					/>
				</div>

				{/* <div className='col-span-2 w-[20%]'>
					<BlocksSort
						value={sortBy}
						onValueChange={setSortBy}
					/>
				</div> */}
			</div>
		</div>
	);
}
