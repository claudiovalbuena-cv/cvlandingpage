'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Service } from '@/types';
import AdminHeader from '@/components/AdminHeader';

export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showNewForm, setShowNewForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
    });

    const [pricingUnit, setPricingUnit] = useState('/ session');
    const [isSavingUnit, setIsSavingUnit] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        fetchServices();
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/admin/settings');
            const data = await response.json();
            if (data.settings?.pricing_unit) {
                setPricingUnit(data.settings.pricing_unit);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    const handleSaveUnit = async () => {
        setIsSavingUnit(true);
        try {
            const response = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pricing_unit: pricingUnit }),
            });
            if (response.ok) {
                alert('Unidad de precio guardada correctamente');
            }
        } catch (error) {
            console.error('Error saving unit:', error);
        } finally {
            setIsSavingUnit(false);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/admin/services');
            const data = await response.json();
            setServices(data.services || []);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = editingId
            ? `/api/admin/services/${editingId}`
            : '/api/admin/services';

        const method = editingId ? 'PUT' : 'POST';

        try {
            if (!formData.name || !formData.price || isNaN(parseFloat(formData.price))) {
                alert('Please enter a valid name and price');
                return;
            }

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                }),
            });

            if (response.ok) {
                fetchServices();
                resetForm();
            }
        } catch (error) {
            console.error('Error saving service:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const response = await fetch(`/api/admin/services/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchServices();
            }
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const startEditing = (service: Service) => {
        setEditingId(service.id);
        setFormData({
            name: service.name,
            description: service.description || '',
            price: service.price.toString(),
            category: service.category || '',
        });
        setShowNewForm(true);
    };

    const resetForm = () => {
        setEditingId(null);
        setShowNewForm(false);
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
        });
    };

    return (
        <div className="min-h-screen bg-gray-light">
            <AdminHeader />

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="font-serif text-3xl">Manage Services</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-all text-sm font-medium"
                        >
                            {showSettings ? 'Cerrar Ajustes' : 'Ajustes de Inversión'}
                        </button>
                        {!showNewForm && (
                            <button
                                onClick={() => setShowNewForm(true)}
                                className="bg-accent hover:bg-accent-hover text-white px-6 py-3 font-medium transition-colors"
                            >
                                + Add Service
                            </button>
                        )}
                    </div>
                </div>

                {/* Settings Panel */}
                {showSettings && (
                    <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm mb-12 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Unidad de Precio (ej: / sesión)</label>
                                <input
                                    type="text"
                                    value={pricingUnit}
                                    onChange={(e) => setPricingUnit(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <button
                                    onClick={handleSaveUnit}
                                    disabled={isSavingUnit}
                                    className="bg-black text-white px-8 py-3.5 hover:bg-gray-800 transition-colors disabled:opacity-50 font-medium"
                                >
                                    {isSavingUnit ? 'Guardando...' : 'Guardar Unidad'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form */}
                {showNewForm && (
                    <div className="bg-white border border-gray-200 p-6 mb-8">
                        <h3 className="font-serif text-xl mb-6">
                            {editingId ? 'Edit Service' : 'New Service'}
                        </h3>
                        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    required
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300"
                                    placeholder="e.g., wedding, portrait, fashion"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300"
                                    rows={3}
                                />
                            </div>
                            <div className="md:col-span-2 flex gap-4">
                                <button
                                    type="submit"
                                    className="bg-accent hover:bg-accent-hover text-white px-6 py-3 font-medium transition-colors"
                                >
                                    {editingId ? 'Update Service' : 'Create Service'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="border border-gray-300 px-6 py-3 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Services List */}
                <div className="bg-white border border-gray-200">
                    {isLoading ? (
                        <p className="p-6 text-gray-500 text-center">Loading services...</p>
                    ) : services.length === 0 ? (
                        <p className="p-6 text-gray-500 text-center">No services configured. Add your first service above.</p>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {services.map((service) => (
                                <div key={service.id} className="p-6 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-lg">{service.name}</p>
                                        <p className="text-sm text-gray-500">{service.description}</p>
                                        {service.category && (
                                            <span className="text-xs text-gray-400 mt-1 inline-block">
                                                {service.category}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <p className="text-2xl font-light">${service.price}</p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => startEditing(service)}
                                                className="text-sm text-accent hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(service.id)}
                                                className="text-sm text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
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
