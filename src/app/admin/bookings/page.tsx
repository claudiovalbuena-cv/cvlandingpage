'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Booking } from '@/types';
import AdminHeader from '@/components/AdminHeader';

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/admin/bookings');
            const data = await response.json();
            setBookings(data.bookings || []);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
        try {
            const response = await fetch(`/api/admin/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                fetchBookings();
            }
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    const filteredBookings = filter === 'all'
        ? bookings
        : bookings.filter(b => b.status === filter);

    return (
        <div className="min-h-screen bg-gray-light">
            <AdminHeader />

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="font-serif text-3xl">Manage Bookings</h2>

                    {/* Filter */}
                    <div className="flex gap-2">
                        {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 text-sm capitalize transition-colors ${filter === status
                                    ? 'bg-black text-white'
                                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bookings List */}
                <div className="bg-white border border-gray-200">
                    {isLoading ? (
                        <p className="p-6 text-gray-500 text-center">Loading bookings...</p>
                    ) : filteredBookings.length === 0 ? (
                        <p className="p-6 text-gray-500 text-center">No bookings found.</p>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {filteredBookings.map((booking) => (
                                <div key={booking.id} className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="font-medium text-lg">{booking.name}</p>
                                            <p className="text-sm text-gray-500">{booking.email}</p>
                                            {booking.phone && (
                                                <p className="text-sm text-gray-500">{booking.phone}</p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">{booking.preferred_date}</p>
                                            <span className={`text-xs px-2 py-1 rounded inline-block mt-1 ${booking.status === 'confirmed'
                                                ? 'bg-green-100 text-green-700'
                                                : booking.status === 'cancelled'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    </div>

                                    {booking.service && (
                                        <p className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">Service:</span> {booking.service.name} (${booking.service.price})
                                        </p>
                                    )}

                                    {booking.message && (
                                        <p className="text-sm text-gray-600 mb-4">
                                            <span className="font-medium">Message:</span> {booking.message}
                                        </p>
                                    )}

                                    <div className="flex gap-2 mt-4">
                                        {booking.status !== 'confirmed' && (
                                            <button
                                                onClick={() => updateStatus(booking.id, 'confirmed')}
                                                className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 transition-colors"
                                            >
                                                Confirm
                                            </button>
                                        )}
                                        {booking.status !== 'cancelled' && (
                                            <button
                                                onClick={() => updateStatus(booking.id, 'cancelled')}
                                                className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                        {booking.status !== 'pending' && (
                                            <button
                                                onClick={() => updateStatus(booking.id, 'pending')}
                                                className="text-sm border border-gray-300 px-4 py-2 hover:bg-gray-50 transition-colors"
                                            >
                                                Mark Pending
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
