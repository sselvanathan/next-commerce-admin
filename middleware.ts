// app/middleware.ts

import {NextResponse} from 'next/server';
import { cookies } from 'next/headers'

export const config = {
    matcher: [
        "/dashboard",
        "/",
    ]
}

export function middleware(request: any) {
    const {pathname, origin} = request.nextUrl;

    // Exclude specific paths from the middleware
    if (pathname.startsWith('/auth') || pathname.startsWith('/_next')) {
        return NextResponse.next();
    }

    // Access the JWT token from the request
    const jwtToken = request.cookies.get('jwt')?.value;

    if (jwtToken) {
        // Token exists in cookies (server-side)
        return NextResponse.next();
    }

    // User is not authenticated, redirect to login page
    // This only works server-side
    return NextResponse.redirect(`${origin}/auth/login`);
}
