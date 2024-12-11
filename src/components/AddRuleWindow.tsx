"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { elements } from "chart.js";

// Dummy data
const HOSTS = {
	client123: "host1.example.com",
	client456: "host2.example.com",
	client789: "host3.example.com",
};

const APPLICATIONS = ["Chrome", "Firefox", "Safari", "VS Code", "Slack"];

interface Rule {
	rule_name?: string;
	rule_description?: string;
	appName?: string;
	domain?: string;
	app_path?: string;
	direction?: "inbound" | "outbound";
	ports?: number[];
	action?: "allow" | "deny";
}

interface FormData {
	clientID?: string;
	rules: Rule[];
}

export function AddRuleDialog({
	open,
	onOpenChange,
	onAddRules,
	clientData,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAddRules: (data: FormData) => void;
	clientData: any;
}) {
	const [currentTab, setCurrentTab] = React.useState("host");
	const [formData, setFormData] = React.useState<FormData>({
		clientID: undefined,
		rules: [{}],
	});

	const handleInputChange = (
		field: keyof Rule,
		value: string | number[] | undefined
	) => {
		setFormData((prev) => ({
			...prev,
			rules: [{ ...prev.rules[0], [field]: value }],
		}));
	};

	const handleNext = () => {
		const tabs = ["host", "application", "domain", "ports", "rest"];
		const currentIndex = tabs.indexOf(currentTab);
		if (currentIndex < tabs.length - 1) {
			setCurrentTab(tabs[currentIndex + 1]);
		}
	};

	const handleAddRule = () => {
		onAddRules(formData);
		onOpenChange(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button variant='outline'>+ Add Rule</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>Add New Rule</DialogTitle>
				</DialogHeader>
				<Tabs
					value={currentTab}
					onValueChange={setCurrentTab}
					className='w-full'>
					<TabsList className='grid w-full grid-cols-5'>
						<TabsTrigger value='host'>Host</TabsTrigger>
						<TabsTrigger value='application'>Application</TabsTrigger>
						<TabsTrigger value='domain'>Domain</TabsTrigger>
						<TabsTrigger value='ports'>Ports</TabsTrigger>
						<TabsTrigger value='rest'>Rest</TabsTrigger>
					</TabsList>

					<TabsContent
						value='host'
						className='space-y-4'>
						<Select
							onValueChange={(value) =>
								setFormData((prev) => ({ ...prev, clientID: value }))
							}>
							<SelectTrigger>
								<SelectValue placeholder='Select host' />
							</SelectTrigger>
							<SelectContent>
								{clientData?.map((elements, index) => (
									<SelectItem
										key={index}
										value={elements.clientID}>
										{elements}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</TabsContent>

					<TabsContent
						value='application'
						className='space-y-4'>
						<Select
							onValueChange={(value) => handleInputChange("appName", value)}>
							<SelectTrigger>
								<SelectValue placeholder='Select application' />
							</SelectTrigger>
							<SelectContent>
								{APPLICATIONS.map((app) => (
									<SelectItem
										key={app}
										value={app}>
										{app}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Input
							placeholder='Application path'
							value={formData.rules[0]?.app_path ?? ""}
							onChange={(e) => handleInputChange("app_path", e.target.value)}
						/>
					</TabsContent>

					<TabsContent
						value='domain'
						className='space-y-4'>
						<Input
							placeholder='Enter domain'
							value={formData.rules[0]?.domain ?? ""}
							onChange={(e) => handleInputChange("domain", e.target.value)}
						/>
					</TabsContent>

					<TabsContent
						value='ports'
						className='space-y-4'>
						<Input
							placeholder='Enter ports (comma-separated)'
							value={formData.rules[0]?.ports?.join(", ") ?? ""}
							onChange={(e) => {
								const ports = e.target.value
									.split(",")
									.map((port) => parseInt(port.trim()))
									.filter((port) => !isNaN(port));
								handleInputChange("ports", ports);
							}}
						/>
					</TabsContent>

					<TabsContent
						value='rest'
						className='space-y-4'>
						<Input
							placeholder='Rule name'
							value={formData.rules[0]?.rule_name ?? ""}
							onChange={(e) => handleInputChange("rule_name", e.target.value)}
						/>
						<Textarea
							placeholder='Rule description'
							value={formData.rules[0]?.rule_description ?? ""}
							onChange={(e) =>
								handleInputChange("rule_description", e.target.value)
							}
						/>
						<Select
							onValueChange={(value) =>
								handleInputChange("direction", value as "inbound" | "outbound")
							}>
							<SelectTrigger>
								<SelectValue placeholder='Select direction' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='inbound'>Inbound</SelectItem>
								<SelectItem value='outbound'>Outbound</SelectItem>
							</SelectContent>
						</Select>
						<Select
							onValueChange={(value) =>
								handleInputChange("action", value as "allow" | "deny")
							}>
							<SelectTrigger>
								<SelectValue placeholder='Select action' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='allow'>Allow</SelectItem>
								<SelectItem value='deny'>Deny</SelectItem>
							</SelectContent>
						</Select>
					</TabsContent>
				</Tabs>
				<div className='flex justify-between mt-4'>
					{currentTab !== "rest" ? (
						<Button onClick={handleNext}>Next</Button>
					) : (
						<Button onClick={handleAddRule}>Add Rule</Button>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
