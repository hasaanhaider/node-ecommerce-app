import { create } from "zustand";
import axios from "axios";

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: string | null;

  hydrate: () => void;
  register: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => void;
}

const API_URL = "http://localhost:3000/api/v1/auth";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  success: null,

  // 🔄 Restore auth on refresh
  hydrate: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
      });

      // axios global header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },

  // ✅ REGISTER
  register: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post(`${API_URL}/register`, data);

      const token = res.data.token;
      const user = res.data.user;

      // localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🔥 COOKIE (IMPORTANT for middleware)
      document.cookie = `token=${token}; path=/`;

      // axios header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      set({
        user,
        token,
        loading: false,
        success: "Registration successful",
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Registration failed",
        loading: false,
      });
    }
  },

  // ✅ LOGIN
  login: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post(`${API_URL}/login`, data);

      const token = res.data.token;
      const user = res.data.user;

      // localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🔥 COOKIE (IMPORTANT for middleware)
      document.cookie = `token=${token}; path=/`;

      // axios header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      set({
        user,
        token,
        loading: false,
        success: "Login successful",
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
    }
  },

  // ✅ FORGOT PASSWORD
  forgotPassword: async (email) => {
    try {
      set({ loading: true, error: null });

      await axios.post(`${API_URL}/forgot-password`, { email });

      set({
        loading: false,
        success: "Password reset link sent to your email",
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },

  // ✅ LOGOUT
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // remove cookie (VERY IMPORTANT)
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    delete axios.defaults.headers.common["Authorization"];

    set({
      user: null,
      token: null,
    });
  },
}));