import { create } from 'zustand';

interface User {
  username: string;
  email: string;
  role: string;
  _id: string;
  password?: string;
}

interface UserState {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  registerUser: (username :string ,email: string, password: string, role: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  error: null,
  isLoading: false,

  registerUser: async (username , email, password, role) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, email, password, role }),
      });

      const result = await response.json();

      if (response.ok) {
        const { username, email, role, _id, password } = result.data;
        set({
          user: { username, email, role, _id },  // Store relevant user data
          error: null,
        });
      } else {
        set({ error: result.message });
      }
    } catch (error) {
      set({ error: 'An error occurred. Please try again.' });
    } finally {
      set({ isLoading: false });
    }
  },

  loginUser: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        const { username, email, role, _id } = result.data;
        set({ user: { username, email, role, _id }, error: null });
      } else {
        set({ error: result.message });
      }
    } catch (error) {
      set({ error: 'An error occurred. Please try again.' });
    } finally {
      set({ isLoading: false });
    }
  },

  logoutUser: () => {
    set({ user: null });
    document.cookie = 'accessToken=; refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  },
}));
