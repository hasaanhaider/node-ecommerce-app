import { create } from "zustand";
import axios from "axios";

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: string | null;

  register: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => void;
}

const API_URL = "http://localhost:3000/api/v1/auth"; // change to your backend

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  success: null,

  // ✅ REGISTER
  register: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post(`${API_URL}/register`, data);

      set({
        user: res.data.user,
        token: res.data.token,
        loading: false,
        success: "Registration successful",
      });

      localStorage.setItem("token", res.data.token);
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Registration failed",
        loading: false,
        success: null,
      });
    }
  },

  // ✅ LOGIN
  login: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post(`${API_URL}/auth/login`, data);

      set({
        user: res.data.user,
        token: res.data.token,
        loading: false,
        success: "Login successful",
      });

      localStorage.setItem("token", res.data.token);
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
        success: null,
      });
    }
  },

  // ✅ FORGOT PASSWORD
  forgotPassword: async (email) => {
    try {
      set({ loading: true, error: null });

      await axios.post(`${API_URL}/auth/forgot-password`, { email });

      set({ loading: false, success: "Password reset link sent to your email" });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Something went wrong",
        loading: false,
        success: null,
      });
    }
  },

  // ✅ LOGOUT
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));