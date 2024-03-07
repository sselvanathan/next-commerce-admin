// app/middleware.ts

import {NextResponse} from 'next/server';
import {auth} from "@/auth";

export const config = {
    matcher: [
        "/dashboard",
        "/",
    ]
}

export async function middleware(request: any) {
    const {pathname, origin} = request.nextUrl;

    // Exclude specific paths from the middleware
    if (pathname.startsWith('/auth') || pathname.startsWith('/_next')) {
        return NextResponse.next();
    }

    const session = await auth();
    const jwtToken = session?.user.jwt;

    // Access the JWT token from the request

    if (jwtToken) {
        // Token exists in cookies (server-side)
        return NextResponse.next();
    }

    // User is not authenticated, redirect to login page
    // This only works server-side
    return NextResponse.redirect(`${origin}/auth/login`);
}
