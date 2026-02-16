'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { LogOut, LayoutDashboard, Briefcase, Calendar, Settings, ArrowLeft, Image as ImageIcon, Star } from 'lucide-react';

export default function AdminHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createSupabaseBrowserClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    const navItems = [
        { name: 'Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Services', href: '/admin/services', icon: Briefcase },
        { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
        { name: 'Testimoniales', href: '/admin/testimonials', icon: Star },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
            {/* Top Bar */}
            <div className="bg-black text-white py-4 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="font-serif text-2xl tracking-tight">
                            Admin <span className="text-accent">Panel</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Site</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all group"
                        >
                            <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="max-w-7xl mx-auto px-6">
                <div className="flex gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all ${isActive
                                    ? 'border-accent text-accent'
                                    : 'border-transparent text-gray-500 hover:text-black hover:border-gray-200'
                                    }`}
                            >
                                <Icon size={18} />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
