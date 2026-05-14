import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/firebase-admin';

export async function POST(request: Request) {
    try {
        const { idToken } = await request.json();

        // Expire session in 5 days
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        
        const auth = getAuth();
        // Create the session cookie
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

        const options = {
            name: '__session',
            value: sessionCookie,
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        };

        const response = NextResponse.json({ status: 'success' }, { status: 200 });
        
        // Next.js 14 Response Cookies API
        response.cookies.set(options);

        return response;
    } catch (error: any) {
        console.error('Session creation error:', error);
        return NextResponse.json({ error: error.message || 'Unauthorized request!' }, { status: 401 });
    }
}
