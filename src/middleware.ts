import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // Check for Firebase session cookie created safely by our endpoint
    const sessionCookie = request.cookies.get('__session')?.value;
    const pathname = request.nextUrl.pathname;

    let isAuthenticated = !!sessionCookie;

    // Protect /admin routes
    if (!isAuthenticated && (pathname === '/admin' || pathname.startsWith('/admin/'))) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // Protect /api/admin routes
    if (!isAuthenticated && pathname.startsWith('/api/admin/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|api/auth/session).*)',
    ],
};
