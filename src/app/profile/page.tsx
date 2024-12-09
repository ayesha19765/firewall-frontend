"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useUserStore } from "@/lib/store/userStore";

export default function AdminProfile() {
	const adminInfo = {
		name: "John Doe",
		email: "john.doe@example.com",
		role: "Super Admin",
	};
	const admin = useUserStore((state) => state.user);

	const activityData = [
		{ action: "User Banned", ruleId: "R-001", time: "2023-06-01 14:30" },
		{ action: "Post Deleted", ruleId: "R-002", time: "2023-06-02 09:15" },
		{ action: "Comment Approved", ruleId: "R-003", time: "2023-06-03 11:45" },
		{ action: "User Promoted", ruleId: "R-004", time: "2023-06-04 16:20" },
		{ action: "Settings Updated", ruleId: "R-005", time: "2023-06-05 13:10" },
	];

	return (
		<div className='container mx-auto p-6 space-y-8'>
			<Card>
				<CardContent className='flex flex-col items-center space-y-4 pt-6'>
					<Avatar className='w-48 h-48 relative group cursor-pointer'>
						<div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 rounded-full flex items-center justify-center'>
							<span className='text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
								Update Photo
							</span>
						</div>
						<AvatarFallback className='text-6xl bg-gradient-to-r from-purple-400 to-pink-600'>
							MS
						</AvatarFallback>
					</Avatar>
					<div className='text-center'>
						<h2 className='text-2xl font-bold'>{admin?.name}</h2>
						<p className='text-gray-500'>{admin?.email || "email"}</p>
						<p className='text-gray-500'>{admin?.adminID || "adminID"}</p>
						<p>Clients :</p>
						{admin?.clientID.map((element, index) => {
							return (
								<p
									className='text-gray-500'
									key={index}>
									{element || "clientID"}
								</p>
							);
						})}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Action</TableHead>
								<TableHead>Rule ID</TableHead>
								<TableHead>Time</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{activityData.map((activity, index) => (
								<TableRow key={index}>
									<TableCell>{activity.action}</TableCell>
									<TableCell>{activity.ruleId}</TableCell>
									<TableCell>{activity.time}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
