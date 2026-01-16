import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const isAuthenticated = !!token;

    const { pathname } = request.nextUrl;

    // Protected routes - require authentication
    if (pathname.startsWith("/dashboard")) {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // If logged in, redirect away from landing page and login page
    if (isAuthenticated) {
        if (pathname === "/" || pathname === "/login") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/dashboard/:path*",
    ],
};
