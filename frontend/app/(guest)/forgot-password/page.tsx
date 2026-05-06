import React from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import GuestLayout from "../GuestLayout"; 

const ForgotPassword = () => {
  return (
    <GuestLayout title="Forgot Password" description="Enter your email to receive a password reset link.">
    <form className="space-y-5">
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
          />
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
      >
        Send Reset Link
      </button>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-pink-500 font-medium cursor-pointer hover:underline">
            Login
          </Link>
        </p>


    </form>
    </GuestLayout>
  );
};

export default ForgotPassword;