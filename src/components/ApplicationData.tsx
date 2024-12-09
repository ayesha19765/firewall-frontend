import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableHeader,
	TableRow,
	TableHead,
	TableCaption,
	TableCell,
} from "./ui/table";

const ApplicationData = ({ data }: any) => {
	// State to manage the current page
	const [currentPage, setCurrentPage] = useState(1);

	// Number of entries per page
	const entriesPerPage = 15;

	// Calculate the index of the first and last entries on the current page
	const indexOfLastEntry = currentPage * entriesPerPage;
	const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;

	// Slice the data for the current page
	const currentData = data?.slice(indexOfFirstEntry, indexOfLastEntry);

	// Total number of pages
	const totalPages = Math.ceil(data?.length / entriesPerPage);

	// Handler for changing pages
	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div>
			<div className='rounded-md max-w-[75vw] border text-xs scroll-auto'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Process Id</TableHead>
							<TableHead>Process Type</TableHead>
							<TableHead>Process Name</TableHead>
							<TableHead>Path</TableHead>
							<TableHead>Uptime</TableHead>
							<TableHead>Sent Bytes(MB)</TableHead>
							<TableHead>Reveived Bytes(MB)</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{currentData?.map((element: any, index: any) => (
							<TableRow key={index}>
								<TableCell>{element.pid}</TableCell>
								<TableCell>{element.process}</TableCell>
								<TableCell>{element.name}</TableCell>
								<TableCell>{element.path}</TableCell>
								<TableCell>{element.uptime}</TableCell>
								<TableCell>
									{(element.total_bytes_sent / 1048576).toFixed(2)}
								</TableCell>
								<TableCell>
									{(element.total_bytes_received / 1048576).toFixed(2)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Pagination Controls */}
			<div className='flex justify-center items-center mt-4 space-x-2'>
				<button
					className='px-2 py-1 border rounded disabled:opacity-50'
					disabled={currentPage === 1}
					onClick={() => handlePageChange(currentPage - 1)}>
					Previous
				</button>
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index}
						className={`px-2 py-1 border rounded ${
							currentPage === index + 1 ? "bg-blue-500 text-white" : ""
						}`}
						onClick={() => handlePageChange(index + 1)}>
						{index + 1}
					</button>
				))}
				<button
					className='px-2 py-1 border rounded disabled:opacity-50'
					disabled={currentPage === totalPages}
					onClick={() => handlePageChange(currentPage + 1)}>
					Next
				</button>
			</div>
		</div>
	);
};

export default ApplicationData;
