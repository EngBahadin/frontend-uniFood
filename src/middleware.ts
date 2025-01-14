import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Refined matcher for protected routes only, explicitly excluding the home page
export const config = {
  matcher: [
    "/favorites",
    "/profile",
    "/cart",
    "/order_history",
    "/auth/change-password",
    "/auth/delete-account",
    "/auth/signup/check-email", // exclude other paths
    "/auth/signin",
    "/auth/signup",
    "/auth/activate",
  ],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token");

  // If no token and trying to access a protected route, redirect to login
  if (
    !token &&
    !req.nextUrl.pathname.startsWith("/auth/signin") &&
    req.nextUrl.pathname !== "/"
  ) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  // If logged in (token exists), redirect to home page if trying to access authentication routes
  if (token) {
    if (
      req.nextUrl.pathname.startsWith("/auth/signin") ||
      req.nextUrl.pathname.startsWith("/auth/signup") ||
      req.nextUrl.pathname.startsWith("/auth/activate")
    ) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  // Proceed with the request if no issues
  return NextResponse.next();
}
