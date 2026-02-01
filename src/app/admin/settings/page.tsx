'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';

interface SettingsData {
    logo_url: string;
    site_url: string;
    site_name: string;
    contact_email: string;
    phone: string;
    instagram: string;
    pinterest: string;
    linkedin: string;
    behance: string;
    facebook: string;
    social_style: string;
}

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<SettingsData>({
        logo_url: '',
        site_url: '',
        site_name: '',
        contact_email: '',
        phone: '',
        instagram: '',
        pinterest: '',
        linkedin: '',
        behance: '',
        facebook: '',
        social_style: 'minimal',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/admin/settings');
            const data = await response.json();
            if (data.settings) {
                setSettings((prev) => ({ ...prev, ...data.settings }));
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveStatus('idle');

        try {
            const response = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (response.ok) {
                setSaveStatus('success');
                setTimeout(() => setSaveStatus('idle'), 3000);
            } else {
                setSaveStatus('error');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettings((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-light">
            <AdminHeader />

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <h2 className="font-serif text-3xl mb-8">Site Settings</h2>

                {isLoading ? (
                    <p className="text-gray-500">Loading settings...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* General Settings */}
                        <div className="bg-white border border-gray-200 p-6">
                            <h3 className="font-serif text-xl mb-6">General</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Site Name</label>
                                    <input
                                        type="text"
                                        name="site_name"
                                        value={settings.site_name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300"
                                        placeholder="Melody"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Site URL</label>
                                    <input
                                        type="url"
                                        name="site_url"
                                        value={settings.site_url}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300"
                                        placeholder="https://example.com"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">Logo URL</label>
                                    <input
                                        type="url"
                                        name="logo_url"
                                        value={settings.logo_url}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300"
                                        placeholder="https://example.com/logo.png"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Leave empty to use text logo
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white border border-gray-200 p-6">
                            <h3 className="font-serif text-xl mb-6">Contact Information</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="contact_email"
                                        value={settings.contact_email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300"
                                        placeholder="hello@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={settings.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white border border-gray-200 p-6">
                            <h3 className="font-serif text-xl mb-6">Social Media Links</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Instagram</label>
                                    <input
                                        type="url"
                                        name="instagram"
                                        value={settings.instagram}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300"
                                        placeholder="https://instagram.com/username"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Pinterest</label>
                                    <input
                                        type="url"
                                        name="pinterest"
                                        value={settings.pinterest}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300"
                                        placeholder="https://pinterest.com/username"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">LinkedIn</label>
                                    <input
                                        type="url"
                                        name="linkedin"
                                        value={settings.linkedin}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300"
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Behance</label>
                                    <input
                                        type="url"
                                        name="behance"
                                        value={settings.behance}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300"
                                        placeholder="https://behance.net/username"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Facebook</label>
                                    <input
                                        type="url"
                                        name="facebook"
                                        value={settings.facebook}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300"
                                        placeholder="https://facebook.com/username"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">Social Icons Style</label>
                                    <select
                                        name="social_style"
                                        value={settings.social_style || 'minimal'}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 bg-white"
                                    >
                                        <option value="text">Text Only</option>
                                        <option value="minimal">Minimalist (Outlined)</option>
                                        <option value="filled">Filled</option>
                                        <option value="circle">Circle Container</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex items-center gap-4">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="bg-accent hover:bg-accent-hover text-white px-8 py-3 font-medium transition-colors disabled:opacity-50"
                            >
                                {isSaving ? 'Saving...' : 'Save Settings'}
                            </button>
                            {saveStatus === 'success' && (
                                <span className="text-green-600">Settings saved successfully!</span>
                            )}
                            {saveStatus === 'error' && (
                                <span className="text-red-600">Error saving settings</span>
                            )}
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
}
