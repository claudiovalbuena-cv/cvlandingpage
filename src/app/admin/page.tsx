import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices, getBookings, getSettings } from '@/lib/db';
import AdminHeader from '@/components/AdminHeader';

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
            <AdminHeader />

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
