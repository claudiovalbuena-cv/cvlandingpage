'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Booking } from '@/types';
import AdminHeader from '@/components/AdminHeader';

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

    const [formSettings, setFormSettings] = useState({
        booking_subtitle: '',
        booking_title: '',
        booking_description: '',
        booking_date_label: '',
        booking_button_text: '',
        booking_success_title: '',
        booking_success_message: '',
    });
    const [isSavingSettings, setIsSavingSettings] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        fetchBookings();
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/admin/settings');
            const data = await response.json();
            if (data.settings) {
                setFormSettings({
                    booking_subtitle: data.settings.booking_subtitle || '',
                    booking_title: data.settings.booking_title || '',
                    booking_description: data.settings.booking_description || '',
                    booking_date_label: data.settings.booking_date_label || '',
                    booking_button_text: data.settings.booking_button_text || '',
                    booking_success_title: data.settings.booking_success_title || '',
                    booking_success_message: data.settings.booking_success_message || '',
                });
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    const handleSaveSettings = async () => {
        setIsSavingSettings(true);
        try {
            const response = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formSettings),
            });
            if (response.ok) {
                alert('Configuración guardada correctamente');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
        } finally {
            setIsSavingSettings(false);
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

                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-all text-sm font-medium"
                        >
                            {showSettings ? 'Cerrar Ajustes' : 'Ajustes del Formulario'}
                        </button>
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
                </div>

                {/* Settings Panel */}
                {showSettings && (
                    <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm mb-12 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo (ej: RESERVA AHORA)</label>
                                <input
                                    type="text"
                                    value={formSettings.booking_subtitle}
                                    onChange={(e) => setFormSettings({ ...formSettings, booking_subtitle: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal (ej: Reserva tu Sesión)</label>
                                <input
                                    type="text"
                                    value={formSettings.booking_title}
                                    onChange={(e) => setFormSettings({ ...formSettings, booking_title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                                <textarea
                                    rows={2}
                                    value={formSettings.booking_description}
                                    onChange={(e) => setFormSettings({ ...formSettings, booking_description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Etiqueta del Calendario (ej: Fecha Preferida *)</label>
                                <input
                                    type="text"
                                    value={formSettings.booking_date_label}
                                    onChange={(e) => setFormSettings({ ...formSettings, booking_date_label: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Texto del Botón (ej: Solicitar Reserva)</label>
                                <input
                                    type="text"
                                    value={formSettings.booking_button_text}
                                    onChange={(e) => setFormSettings({ ...formSettings, booking_button_text: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Título de Éxito (ej: ¡Gracias!)</label>
                                <input
                                    type="text"
                                    value={formSettings.booking_success_title}
                                    onChange={(e) => setFormSettings({ ...formSettings, booking_success_title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje de Éxito</label>
                                <textarea
                                    value={formSettings.booking_success_message}
                                    onChange={(e) => setFormSettings({ ...formSettings, booking_success_message: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all resize-none"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button
                                onClick={handleSaveSettings}
                                disabled={isSavingSettings}
                                className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                {isSavingSettings ? 'Guardando...' : 'Guardar Ajustes'}
                            </button>
                        </div>
                    </div>
                )}

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
                                        <button
                                            onClick={() => deleteBooking(booking.id)}
                                            className="text-sm bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 transition-colors ml-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main >
        </div >
    );
}
