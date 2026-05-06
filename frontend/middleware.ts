import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname.startsWith("/dashboard");
  const isGuestRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  // 🔐 Block auth pages if not logged in
  if (!token && isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔁 Block login/register if already logged in
  if (token && isGuestRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}