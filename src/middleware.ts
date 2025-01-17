import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/cart",
    "/favorites",
    "/order_history/:path*",
    "/profile",
    "/auth/change-password",
    "/auth/delete-account",
    "/auth/signin",
    "/auth/signup",
  ],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token");
  const { pathname } = req.nextUrl;

  // Check if the route is a protected route
  const isProtectedRoute =
    pathname.startsWith("/cart") ||
    pathname.startsWith("/favorites") ||
    pathname.startsWith("/order_history") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/auth/change-password") ||
    pathname.startsWith("/auth/delete-account");

  // Redirect users without token trying to access protected routes
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  // Redirect logged-in users away from auth-related routes
  const isAuthRoute =
    pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup");

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Allow the request to proceed for other cases
  return NextResponse.next();
}
