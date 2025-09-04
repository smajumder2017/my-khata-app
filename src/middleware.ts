// middleware.ts
import { NextRequest, NextResponse } from "next/server";
export { auth as middleware } from "@/auth";

const protectedRoutes = ["/dashboard", "/settings"]; // Define your protected routes

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("Middleware running for path:", pathname);
  // Example: Check for authentication status
  const isAuthenticated = req.cookies.get("auth_token"); // Replace with your actual authentication logic

  if (!isAuthenticated && protectedRoutes.includes(pathname)) {
    const loginUrl = new URL("/login", req.url); // Redirect to login page
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // Allow access to the route
}

// Optionally, define a matcher to specify which routes the middleware should apply to
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Apply to all routes except API, static, and image files
};
