import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices, getBookings, getSettings } from '@/lib/supabase';

export const metadata: Metadata = {
    title: 'Admin Dashboard | Melody Photography',
    robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const services = await getServices();
    const bookings = await getBookings();
    const settings = await getSettings();

    const pendingBookings = bookings.filter((b) => b.status === 'pending');
    const confirmedBookings = bookings.filter((b) => b.status === 'confirmed');

    return (
        <div className="min-h-screen bg-gray-light">
            {/* Header */}
            <header className="bg-black text-white py-4 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="font-serif text-2xl">Admin Dashboard</h1>
                    <Link
                        href="/"
                        className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                        ← Back to Site
                    </Link>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-8">
                        <Link
                            href="/admin"
                            className="py-4 border-b-2 border-accent text-accent font-medium"
                        >
                            Overview
                        </Link>
                        <Link
                            href="/admin/services"
                            className="py-4 border-b-2 border-transparent hover:border-gray-300 transition-colors"
                        >
                            Services
                        </Link>
                        <Link
                            href="/admin/bookings"
                            className="py-4 border-b-2 border-transparent hover:border-gray-300 transition-colors"
                        >
                            Bookings
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="py-4 border-b-2 border-transparent hover:border-gray-300 transition-colors"
                        >
                            Settings
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-6 border border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">Total Services</p>
                        <p className="text-3xl font-light">{services.length}</p>
                    </div>
                    <div className="bg-white p-6 border border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
                        <p className="text-3xl font-light">{bookings.length}</p>
                    </div>
                    <div className="bg-white p-6 border border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">Pending</p>
                        <p className="text-3xl font-light text-accent">{pendingBookings.length}</p>
                    </div>
                    <div className="bg-white p-6 border border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">Confirmed</p>
                        <p className="text-3xl font-light text-green-600">{confirmedBookings.length}</p>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white border border-gray-200 mb-8">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="font-serif text-xl">Recent Bookings</h2>
                        <Link
                            href="/admin/bookings"
                            className="text-sm text-accent hover:underline"
                        >
                            View All →
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {bookings.slice(0, 5).map((booking) => (
                            <div key={booking.id} className="p-6 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{booking.name}</p>
                                    <p className="text-sm text-gray-500">{booking.email}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm">{booking.preferred_date}</p>
                                    <span className={`text-xs px-2 py-1 rounded ${booking.status === 'confirmed'
                                            ? 'bg-green-100 text-green-700'
                                            : booking.status === 'cancelled'
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {bookings.length === 0 && (
                            <p className="p-6 text-gray-500 text-center">No bookings yet</p>
                        )}
                    </div>
                </div>

                {/* Services Overview */}
                <div className="bg-white border border-gray-200">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="font-serif text-xl">Services</h2>
                        <Link
                            href="/admin/services"
                            className="text-sm text-accent hover:underline"
                        >
                            Manage →
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {services.map((service) => (
                            <div key={service.id} className="p-6 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{service.name}</p>
                                    <p className="text-sm text-gray-500">{service.description}</p>
                                </div>
                                <p className="text-lg font-light">${service.price}</p>
                            </div>
                        ))}
                        {services.length === 0 && (
                            <p className="p-6 text-gray-500 text-center">No services configured</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
