import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (serverURL) => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		// Initialize socket connection
		const socketInstance = io(serverURL);

		// Save socket instance
		setSocket(socketInstance);

		// Cleanup on unmount
		return () => {
			socketInstance.disconnect();
		};
	}, [serverURL]);

	return socket;
};

export default useSocket;
