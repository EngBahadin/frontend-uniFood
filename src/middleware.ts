export const config = {
  matcher: [
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token");

  // Check if the requested page is protected
  console.log(req.cookies.getAll());

  if (!token) {
    // Redirect to the login page if not authenticated
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}
