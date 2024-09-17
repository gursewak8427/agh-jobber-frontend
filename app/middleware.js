import { NextResponse } from 'next/server';

export function middleware(request) {
    const cookies = request.cookies.getAll();
    const authToken = cookies.find((cookie) => cookie.name === 'token');
    const expires = cookies.find((cookie) => cookie.name === 'expires');
    // Exclude requests to static files (_next/static, favicon, etc.)
    const isStaticAsset = request.nextUrl.pathname.startsWith('/_next') ||
        request.nextUrl.pathname.startsWith('/static') ||
        request.nextUrl.pathname.startsWith('/favicon.ico') ||
        request.nextUrl.pathname.startsWith('/api/login');

    // Allow requests to static assets
    if (isStaticAsset) {
        return NextResponse.next();
    }
    if (request.nextUrl.pathname === '/auth/login') {
        if (authToken) {
            const expiryDate = new Date(expires.value);
            if (expiryDate > new Date()) {
                return NextResponse.redirect(new URL('/', request.url));
            }
        }
    } else {
        if (!authToken) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        const expiryDate = new Date(expires);
        if (expiryDate < new Date()) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }
    return NextResponse.next();
}

// Define the paths where the middleware should not be applied
export const config = {
    matcher: ['/', '/auth/login', '/((?!.next|static/|public/|favicon.ico|api).*)'],
};
