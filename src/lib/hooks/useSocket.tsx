import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (serverURL: string) => {
	const [socket, setSocket] = useState(null);
	console.log(serverURL);

	// Initialize socket connection
	const socketInstance = io(serverURL);

	// Save socket instance

	// Cleanup on unmount
	return () => {
		socketInstance.disconnect();
	};

	return socketInstance;
};

export default useSocket;
