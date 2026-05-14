'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/client';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Sign in with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();

            // Create Firebase session cookie by calling our new endpoint
            const response = await fetch('/api/auth/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken }),
            });

            if (response.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to create session');
                setLoading(false);
            }
        } catch (err: any) {
            console.error('Firebase Login Error:', err);
            setError(err.message || 'Error occurred during login. Check console.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-light px-4">
            <div className="max-w-md w-full bg-white p-8 border border-gray-200 shadow-sm">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl mb-2">Admin Login</h1>
                    <p className="text-gray-500">Enter your credentials to access the dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 focus:border-accent transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 border border-gray-300 focus:border-accent transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm bg-red-50 p-3 border border-red-100">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-4 font-medium tracking-wide hover:bg-gray-900 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => router.push('/')}
                        className="text-sm text-gray-500 hover:text-black transition-colors"
                    >
                        ← Back to Site
                    </button>
                </div>
            </div>
        </div>
    );
}
