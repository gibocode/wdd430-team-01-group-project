import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isProtectedPage = pathname.startsWith("/dashboard");

  // If token not exists, redirect to login page if not on auth page
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If token exists, verify it
  if (token) {
    try {
      verifyToken(token);
    } catch (error) {
      console.error(error);
      const response = NextResponse.redirect(new URL("/login", request.url));
      // Delete the token from the cookie to avoid infinite redirect loop
      response.cookies.delete("auth_token");
      return response;
    }
  }

  // If token is valid, redirect to dashboard page if on auth page
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
