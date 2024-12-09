import { create } from "zustand";
import axios from "axios";

interface ClientDataState {
	clientData: ClientData | null;
	isLoading: boolean;
	error: string | null;
	fetchClientData: (clientID: string) => Promise<void>;
}

export const useClientDataStore = create<ClientDataState>((set) => ({
	clientData: null,
	isLoading: false,
	error: null,

	fetchClientData: async (clientID) => {
		set({ isLoading: true, error: null });

		try {
			const response = await axios.post(
				`http://localhost:3000/details/client`,
				{ clientId: "84c20d6c-85ab-45bc-b4f6-eefce46f9906" }
			);
			let response2;
			let array = [];
			array.push(clientID);
			if (response.data.message == "device is not online") {
				response2 = await axios.post(`http://localhost:3000/details/clients`, {
					clientIDS: array,
				});
				const newClientData = { ...response2.data.data, last_ping: new Date() };
				set({ clientData: newClientData, isLoading: false });
			} else set({ clientData: response.data.data, isLoading: false });
		} catch (error: any) {
			console.error("Error fetching client data:", error);
			set({
				error: error.response?.data?.message || "Failed to fetch client data",
				isLoading: false,
			});
		}
	},
}));
