"use client";
import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import AuthLayout from "../authLayout";
import Link from "next/link";
import { useAuthStore } from "../../../store/authStore";

const Register = () => {
  const { register, error, loading, success } = useAuthStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <AuthLayout
      title="Create Account"
      description="Fill in the details below to create your account."
    >
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
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-black bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        </div>

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
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-black bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition"
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
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-black bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) =>
                setForm({ ...form, password_confirmation: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-black bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition"
            />
          </div>
        </div>
        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-pink-500 font-medium cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
