import { create } from "zustand";
import axios from "axios";
import { useUserStore } from "./userStore";

interface ClientDataState {
	clientData: any;
	isLoading: boolean;
	error: string | null;
	fetchClientData: () => Promise<void>;
}

export const useClientDataStore = create<ClientDataState>((set) => ({
	clientData: null,
	isLoading: false,
	error: null,

	fetchClientData: async () => {
		set({ isLoading: true, error: null });
		let admin = useUserStore((state) => state.user);
		// console.log(admin);

		try {
			const response = await axios.post(
				`http://localhost:3000/details/clients`,
				{ email: admin?.email, clientIDS: admin?.clientID }
			);

			set({ clientData: response.data.data, isLoading: false });
		} catch (error: any) {
			console.error("Error fetching client data:", error);
			set({
				error: error || "Failed to fetch client data",
				isLoading: false,
			});
		}
	},
}));
