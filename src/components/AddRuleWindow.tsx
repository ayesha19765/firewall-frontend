"use client";

import * as React from "react";
import { Search, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

// Dummy data
const HOSTS = [
	"host1.example.com",
	"host2.example.com",
	"host3.example.com",
	"host4.example.com",
	"host5.example.com",
];

const APPLICATIONS = ["Chrome", "Firefox", "Safari", "VS Code", "Slack"];

const DOMAINS = [
	{ name: "domain1.com", category: "Social Media" },
	{ name: "domain2.com", category: "Social Media" },
	{ name: "domain3.com", category: "Entertainment" },
	{ name: "domain4.com", category: "Entertainment" },
	{ name: "domain5.com", category: "Productivity" },
];

const CATEGORIES = ["Social Media", "Entertainment", "Productivity"];

interface SelectedItems {
	hosts: string[];
	applications: string[];
	domains: string[];
}

export function AddRuleDialog({ open, onOpenChange, onAddRules }) {
	const [selectedItems, setSelectedItems] = React.useState<SelectedItems>({
		hosts: [],
		applications: [],
		domains: [],
	});
	const [hostSearchQuery, setHostSearchQuery] = React.useState("");
	const [appSearchQuery, setAppSearchQuery] = React.useState("");
	const [selectedCategory, setSelectedCategory] = React.useState("");
	const [newDomain, setNewDomain] = React.useState("");
	const [currentTab, setCurrentTab] = React.useState("hosts");
	const [isAppSearchOpen, setIsAppSearchOpen] = React.useState(false);
	const [isPopoverOpen, setPopoverOpen] = React.useState(false);

	const filteredHosts = HOSTS.filter((host) =>
		hostSearchQuery === "*"
			? true
			: host.toLowerCase().includes(hostSearchQuery.toLowerCase())
	);

	const filteredApps = APPLICATIONS.filter((app) =>
		appSearchQuery === "*"
			? true
			: app.toLowerCase().includes(appSearchQuery.toLowerCase())
	);

	const filteredDomains = DOMAINS.filter(
		(domain) => domain.category === selectedCategory
	);

	const handleItemToggle = (type: keyof SelectedItems, item: string) => {
		setSelectedItems((prev) => {
			const newItems = prev[type].includes(item)
				? prev[type].filter((i) => i !== item)
				: [...prev[type], item];
			return { ...prev, [type]: newItems };
		});
	};

	const handleAddDomain = () => {
		const newDomains = newDomain.split(/[,\s]+/).filter(Boolean);
		setSelectedItems((prev) => ({
			...prev,
			domains: [...prev.domains, ...newDomains],
		}));
		setNewDomain("");
	};

	const handleCategorySelect = (category: string) => {
		setSelectedCategory(category);
		const domainsInCategory = DOMAINS.filter(
			(d) => d.category === category
		).map((d) => d.name);
		setSelectedItems((prev) => ({
			...prev,
			domains: [...new Set([...prev.domains, ...domainsInCategory])],
		}));
	};

	const handleNext = () => {
		const tabs = ["hosts", "applications", "domains"];
		const currentIndex = tabs.indexOf(currentTab);
		if (currentIndex < tabs.length - 1) {
			setCurrentTab(tabs[currentIndex + 1]);
		}
	};

	const handleAddRule = () => {
		console.log("Rule added:", selectedItems);
		// Here you would typically send this data to your backend or perform some action
	};

	return (
		<Dialog>
			<DialogTrigger
				asChild
				className='bg-black text-white hover:bg-black hover:text-gray-300'>
				<Button variant='outline'>+ Add Rule</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle>What Do You Want to Block?</DialogTitle>
				</DialogHeader>
				<Tabs
					value={currentTab}
					onValueChange={setCurrentTab}
					className='w-full'>
					<TabsList className='grid w-full grid-cols-3'>
						<TabsTrigger value='hosts'>Hosts</TabsTrigger>
						<TabsTrigger value='applications'>Applications</TabsTrigger>
						<TabsTrigger value='domains'>Domains</TabsTrigger>
					</TabsList>

					{/* Hosts Tab */}
					<TabsContent
						value='hosts'
						className='space-y-4'>
						<div className='flex items-center space-x-2'>
							<Search className='w-4 h-4' />
							<Input
								placeholder='Search hosts... (use * to select all)'
								value={hostSearchQuery}
								onChange={(e) => setHostSearchQuery(e.target.value)}
							/>
						</div>
						<div className='space-y-2'>
							{filteredHosts.map((host) => (
								<div
									key={host}
									className='flex items-center space-x-2'>
									<Checkbox
										id={host}
										checked={selectedItems.hosts.includes(host)}
										onCheckedChange={() => handleItemToggle("hosts", host)}
									/>
									<Label htmlFor={host}>{host}</Label>
								</div>
							))}
						</div>
						<div className='border rounded-lg p-4 min-h-[100px]'>
							{selectedItems.hosts.map((host) => (
								<div
									key={host}
									className='flex items-center justify-between py-1'>
									<span>{host}</span>
									<Button
										variant='ghost'
										size='sm'
										onClick={() => handleItemToggle("hosts", host)}>
										<Minus className='h-4 w-4' />
									</Button>
								</div>
							))}
						</div>
					</TabsContent>

					{/* Applications Tab */}
					<TabsContent
						value='applications'
						className='space-y-4'>
						<Popover
							open={isPopoverOpen}
							onOpenChange={setPopoverOpen}>
							<PopoverTrigger asChild>
								<div
									className='flex items-center space-x-2 cursor-pointer'
									onClick={() => onOpenChange(true)}>
									<Search className='w-4 h-4' />
									<Input
										placeholder='Search applications... (use * to select all)'
										value={appSearchQuery}
										onChange={(e) => setAppSearchQuery(e.target.value)}
										onFocus={() => setPopoverOpen(true)}
									/>
								</div>
							</PopoverTrigger>
							<PopoverContent className='w-80'>
								<div className='space-y-2'>
									{filteredApps.map((app) => (
										<div
											key={app}
											className='flex items-center space-x-2'>
											<Checkbox
												id={app}
												checked={selectedItems.applications.includes(app)}
												onCheckedChange={() =>
													handleItemToggle("applications", app)
												}
											/>
											<Label htmlFor={app}>{app}</Label>
										</div>
									))}
								</div>
							</PopoverContent>
						</Popover>
						<div className='border rounded-lg p-4 min-h-[100px]'>
							{selectedItems.applications.map((app) => (
								<div
									key={app}
									className='flex items-center justify-between py-1'>
									<span>{app}</span>
									<Button
										variant='ghost'
										size='sm'
										onClick={() => handleItemToggle("applications", app)}>
										<Minus className='h-4 w-4' />
									</Button>
								</div>
							))}
						</div>
					</TabsContent>

					{/* Domains Tab */}
					<TabsContent
						value='domains'
						className='space-y-4'>
						<Select onValueChange={handleCategorySelect}>
							<SelectTrigger>
								<SelectValue placeholder='Select category' />
							</SelectTrigger>
							<SelectContent>
								{CATEGORIES.map((category) => (
									<SelectItem
										key={category}
										value={category}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<div className='flex space-x-2'>
							<Input
								placeholder='Enter domains (comma or space-separated)'
								value={newDomain}
								onChange={(e) => setNewDomain(e.target.value)}
							/>
							<Button onClick={handleAddDomain}>
								<Plus className='h-4 w-4' />
							</Button>
						</div>
						<div className='border rounded-lg p-4 min-h-[100px]'>
							{selectedItems.domains.map((domain) => (
								<div
									key={domain}
									className='flex items-center justify-between py-1'>
									<span>{domain}</span>
									<Button
										variant='ghost'
										size='sm'
										onClick={() => handleItemToggle("domains", domain)}>
										<Minus className='h-4 w-4' />
									</Button>
								</div>
							))}
						</div>
					</TabsContent>
				</Tabs>
				<div className='flex justify-between mt-4'>
					{currentTab !== "domains" ? (
						<Button onClick={handleNext}>Next</Button>
					) : (
						<Button onClick={handleAddRule}>Add Rule</Button>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
