"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { HostSelect } from "./SelectHost";
import { AppSelect } from "./SelectApplication";

const formSchema = z
	.object({
		application: z.string().optional(),
		domain: z.string().optional(),
		protocol: z.string().optional(),
		port: z.string().optional(),
		ip: z.string().optional(),
		blockCountry: z.string().optional(),
		direction: z.string().min(1, { message: "Direction is required" }),
		description: z.string().min(1, { message: "Description is required" }),
		action: z.string().min(1, { message: "Action is required" }),
		endTime: z.string().min(1, { message: "End time is required" }),
	})
	.refine(
		(data) => {
			const group1 = [
				data.application,
				data.domain,
				data.protocol,
				data.port,
				data.ip,
			];
			const group2 = data.blockCountry;
			return group1.some(Boolean) || group2;
		},
		{
			message: "At least one field from Group 1 or Group 2 must be selected",
			path: ["application"],
		}
	);

export function FirewallRuleForm() {
	const [selectedHost, setSelectedHost] = useState<{
		id: string;
		name: string;
		ip: string;
		os: string;
		platform: string;
	} | null>(null);
	const [selectedApp, setSelectedApp] = useState<{
		id: string;
		appName: string;
		path: string;
		os: string;
		platform: string;
	} | null>(null);
	const [group1Selected, setGroup1Selected] = useState(false);
	const [group2Selected, setGroup2Selected] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			application: "",
			domain: "",
			protocol: "",
			port: "",
			ip: "",
			blockCountry: "",
			direction: "",
			description: "",
			action: "",
			endTime: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	const handleGroup1Change = (value: string) => {
		setGroup1Selected(!!value);
		if (!!value) setGroup2Selected(false);
	};

	const handleGroup2Change = (value: string) => {
		setGroup2Selected(!!value);
		if (!!value) setGroup1Selected(false);
	};

	return (
		<div className='space-y-8'>
			<div>
				<h2 className='text-2xl font-bold mb-4'>Select Host</h2>
				<HostSelect onSelect={setSelectedHost} />
			</div>

			{selectedHost && (
				<div className='bg-gray-100 p-4 rounded-md'>
					<h3 className='text-lg font-semibold mb-2'>Host Information</h3>
					<p>
						<strong>Name:</strong> {selectedHost.name}
					</p>
					<p>
						<strong>IP:</strong> {selectedHost.ip}
					</p>
					<p>
						<strong>OS:</strong> {selectedHost.os}
					</p>
					<p>
						<strong>Platform:</strong> {selectedHost.platform}
					</p>
				</div>
			)}

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8'>
					<div>
						<h3 className='text-lg font-semibold mb-2'>Group 1 Fields</h3>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<h2 className='font-bold mb-4'>Select Application</h2>
								<AppSelect onSelect={setSelectedApp} />
							</div>
							{/* <FormField
								control={form.control}
								name='application'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Application</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={group2Selected}
												onChange={(e) => {
													field.onChange(e);
													handleGroup1Change(e.target.value);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/> */}
							<FormField
								control={form.control}
								name='domain'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Domain</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={group2Selected}
												onChange={(e) => {
													field.onChange(e);
													handleGroup1Change(e.target.value);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='protocol'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Protocol</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={group2Selected}
												onChange={(e) => {
													field.onChange(e);
													handleGroup1Change(e.target.value);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='port'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Port</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={group2Selected}
												onChange={(e) => {
													field.onChange(e);
													handleGroup1Change(e.target.value);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='ip'
								render={({ field }) => (
									<FormItem>
										<FormLabel>IP</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={group2Selected}
												onChange={(e) => {
													field.onChange(e);
													handleGroup1Change(e.target.value);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<Separator />

					<div>
						<h3 className='text-lg font-semibold mb-2'>Group 2 Fields</h3>
						<FormField
							control={form.control}
							name='blockCountry'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Block Country</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={group1Selected}
											onChange={(e) => {
												field.onChange(e);
												handleGroup2Change(e.target.value);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Separator />

					<div>
						<h3 className='text-lg font-semibold mb-2'>Compulsory Fields</h3>
						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='direction'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Direction</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select direction' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='inbound'>Inbound</SelectItem>
												<SelectItem value='outbound'>Outbound</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='action'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Action</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select action' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='allow'>Allow</SelectItem>
												<SelectItem value='block'>Block</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='endTime'
								render={({ field }) => (
									<FormItem>
										<FormLabel>End Time</FormLabel>
										<FormControl>
											<Input
												type='datetime-local'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<Button type='submit'>Add Rule</Button>
				</form>
			</Form>
		</div>
	);
}
