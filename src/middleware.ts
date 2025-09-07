import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request is for the dashboard route
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Get the authentication cookie
    const authCookie = request.cookies.get("dashboard_auth");

    // If the cookie doesn't exist or isn't valid, redirect to login
    if (!authCookie || authCookie.value !== "authenticated") {
      const loginUrl = new URL("/login", request.url);
      // Add the original URL as a from parameter to redirect back after login
      loginUrl.searchParams.set("from", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Apply this middleware only to /dashboard routes
  matcher: ["/dashboard", "/dashboard/:path*"],
};
