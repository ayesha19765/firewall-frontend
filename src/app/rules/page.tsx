"use client";

import { useState } from "react";
import { Plus, Import } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlocksTable } from "@/components/RulesTable";
import { BlocksFilter } from "@/components/RulesFilterBox";
import { BlocksSort } from "@/components/SortRulesWindow";
import { AddRuleDialog } from "@/components/AddRuleWindow";
import { mockRules } from "@/data/rulesData";
import type { BlockRule, FilterOptions, SortOption } from "@/types/rules";

export default function Blocks() {
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

	return (
		<div className='container mx-auto py-6'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-3xl font-bold'>Blocks</h1>
				<div className='flex gap-2'>
					<AddRuleDialog
						open={isAddDialogOpen}
						onOpenChange={setIsAddDialogOpen}
						onAddRule={(rule: any) => {
							setRules([...rules, rule]);
							setIsAddDialogOpen(false);
						}}
					/>

					<Button variant='outline'>
						<Import className='mr-2 h-4 w-4' />
						Import
					</Button>
				</div>
			</div>

			<div className='grid grid-cols-12 gap-6 w-[70vw]'>
				<div className='col-span-3 w-[20%]'>
					<BlocksFilter
						filters={filters}
						onFiltersChange={setFilters}
					/>
				</div>

				<div className='col-span-7 w-[100%]'>
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

				<div className='col-span-2 w-[20%]'>
					<BlocksSort
						value={sortBy}
						onValueChange={setSortBy}
					/>
				</div>
			</div>
		</div>
	);
}
