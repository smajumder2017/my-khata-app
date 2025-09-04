import { NextRequest, NextResponse } from "next/server";
import { auth as middleware } from "@/auth";

const protectedRoutes = ["/dashboard", "/settings"];


export default middleware(async (req) => {
  const { pathname } = req.nextUrl;
  console.log("Middleware running for path:", pathname);
  console.log(req.auth)

  const user = req.auth?.user;

  if (!user && protectedRoutes.includes(pathname)) {
    const loginUrl = new URL("/login", req.url); // Redirect to login page
    return NextResponse.redirect(loginUrl);
  }

  if (req.nextUrl.pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to home or another appropriate page
  }

  return NextResponse.next(); // Allow access to the route
})

// Optionally, define a matcher to specify which routes the middleware should apply to
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Apply to all routes except API, static, and image files
};
