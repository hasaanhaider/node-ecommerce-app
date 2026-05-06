'use client'
import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import GuestLayout from "../GuestLayout";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/dist/client/components/navigation";

const Login = () => {
  const { login,  error, loading, success } = useAuthStore();
  const [ form, setForm] = useState({
    email: "",
    password: "",
  });
    const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {    e.preventDefault();
    await login(form);
    router.push("/dashboard");
  }

  return (
    <GuestLayout title="Sign In" description="Enter your credentials to access your account.">
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 shadow-sm">
          <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500"></div>
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700 shadow-sm">
          <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500"></div>
          <p className="text-sm font-medium">{success}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email Address
        </label>
        <div className="relative">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-black bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Password
        </label>
        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="password"
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-black bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end">
        <Link href="/auth/forgot-password" className="text-sm text-pink-500 cursor-pointer hover:underline">
          Forgot password?
        </Link>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
      >
        Sign In
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-xs text-gray-500">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>


      {/* Footer */}
      <p className="text-center text-sm text-slate-600">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="text-pink-500 font-medium cursor-pointer hover:underline">
          Register
        </Link>
      </p>
    </form>
      </GuestLayout>
  );
};

export default Login;