import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const GuestLayout = ({
  children,
  title = "Account Access",
  description = "Sign in, register, or recover your password to continue.",
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-gray-200 p-8 backdrop-blur-xl bg-white/50">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl text-black font-semibold">{title}</h1>
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        </div>

        {/* Content */}
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default GuestLayout;
