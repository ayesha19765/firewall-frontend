import { create } from "zustand";
import axios from "axios";
import { useToast } from "@/components/hooks/use-toast";
interface User {
	name: string;
	email: string;
	role: string;
	password?: string;
}

interface UserState {
	user: User | null;
	error: string | null;
	isLoading: boolean;
	registerUser: (
		name: string,
		email: string,
		password: string,
		role: string,
		toast: any
	) => Promise<void>;
	loginUser: (email: string, password: string, toast: any) => Promise<void>;
	logoutUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
	user: null,
	error: null,
	isLoading: false,

	registerUser: async (name, email, password, role, toast) => {
		set({ isLoading: true, error: null });

		try {
			const response = await axios.post("http://localhost:3000/auth/signup", {
				name: name,
				email: email,
				password: password,
				role: role,
			});

			const {
				name: user_name,
				email: user_email,
				role: user_role,
			} = response?.data.user;
			const token = response?.data.token;
			localStorage.setItem("csstoken", token);
			set({
				user: { name: user_name, email: user_email, role: user_role },
				error: null,
			});

			toast({
				title: "Signed in successfully",
				description: "User registered successfully.",
			});
		} catch (error: any) {
			console.log(error);
			const errorMessage =
				error.response?.data?.error || "An error occurred. Please try again.";
			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});
			set({ error: errorMessage });
		} finally {
			set({ isLoading: false });
		}
	},

	loginUser: async (email, password, toast) => {
		set({ isLoading: true, error: null });

		try {
			const response = await axios.post("http://localhost:3000/auth/login", {
				email: email,
				password: password,
			});

			if (response.status == 200) {
				const { name, email, role, token } = response.data;
				localStorage.setItem("csstoken", token);
				set({ user: { name, email, role }, error: null });
				toast({
					title: "Logged in successfully",
					description: "User login successful.",
				});
			} else {
				set({ error: response.data.error });
				toast({
					title: response.data.error,
					description: "User registered error.",
				});
			}
		} catch (error: any) {
			set({ error: "An error occurred. Please try again." });
			toast({
				title: error?.response?.data?.error,
				description: "Probelm while looging in",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	logoutUser: () => {
		set({ user: null });
		localStorage.clear();
	},
}));
