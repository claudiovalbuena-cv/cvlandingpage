'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';
import { Upload } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

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
    hero_title: string;
    hero_subtitle: string;
    hero_image_url: string;
    about_title: string;
    about_description: string;
    portfolio_title: string;
    behind_camera_subtitle: string;
    behind_camera_title: string;
    behind_camera_description1: string;
    behind_camera_description2: string;
    behind_camera_image_url: string;
    pricing_subtitle: string;
    pricing_title: string;
    portfolio_image_1: string;
    portfolio_image_2: string;
    portfolio_image_3: string;
    gallery_image_1: string;
    gallery_image_2: string;
    gallery_image_3: string;
    gallery_image_4: string;
    gallery_image_5: string;
    gallery_image_6: string;
    gallery_image_7: string;
    gallery_image_8: string;
    gallery_image_9: string;
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
        hero_title: '',
        hero_subtitle: '',
        hero_image_url: '',
        about_title: '',
        about_description: '',
        portfolio_title: '',
        behind_camera_subtitle: '',
        behind_camera_title: '',
        behind_camera_description1: '',
        behind_camera_description2: '',
        behind_camera_image_url: '',
        pricing_subtitle: '',
        pricing_title: '',
        portfolio_image_1: '',
        portfolio_image_2: '',
        portfolio_image_3: '',
        gallery_image_1: '',
        gallery_image_2: '',
        gallery_image_3: '',
        gallery_image_4: '',
        gallery_image_5: '',
        gallery_image_6: '',
        gallery_image_7: '',
        gallery_image_8: '',
        gallery_image_9: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const supabase = createSupabaseBrowserClient();

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

    const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `hero_${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `settings/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            setSettings(prev => ({ ...prev, hero_image_url: publicUrl }));
        } catch (error) {
            console.error('Error uploading hero image:', error);
            alert('Error uploading image');
        } finally {
            setIsUploading(false);
        }
    };

    const handleBehindCameraUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `behind_${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `settings/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            setSettings(prev => ({ ...prev, behind_camera_image_url: publicUrl }));
        } catch (error) {
            console.error('Error uploading behind camera image:', error);
            alert('Error uploading image');
        } finally {
            setIsUploading(false);
        }
    };

    const handlePortfolioUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `portfolio_${index}_${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `settings/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            setSettings(prev => ({ ...prev, [`portfolio_image_${index}`]: publicUrl }));
        } catch (error) {
            console.error(`Error uploading portfolio image ${index}:`, error);
            alert('Error uploading image');
        } finally {
            setIsUploading(false);
        }
    };

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `gallery_${index}_${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `settings/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            setSettings(prev => ({ ...prev, [`gallery_image_${index}`]: publicUrl }));
        } catch (error) {
            console.error(`Error uploading gallery image ${index}:`, error);
            alert('Error uploading image');
        } finally {
            setIsUploading(false);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

                        {/* Hero Section */}
                        <div className="bg-white border border-gray-200 p-6">
                            <h3 className="font-serif text-xl mb-6">Hero Section</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Hero Title</label>
                                    <input
                                        type="text"
                                        name="hero_title"
                                        value={settings.hero_title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300"
                                        placeholder="Capture Moments"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                                    <textarea
                                        name="hero_subtitle"
                                        value={settings.hero_subtitle}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300"
                                        rows={2}
                                        placeholder="A portfolio landing page designed for photographers..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Hero Image</label>
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                name="hero_image_url"
                                                value={settings.hero_image_url}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 mb-2"
                                                placeholder="/images/_DSC0043.jpg"
                                            />
                                            <div className="mt-2">
                                                <label className="relative cursor-pointer bg-white border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 flex items-center gap-2 w-fit">
                                                    <Upload size={16} />
                                                    <span>{isUploading ? 'Uploading...' : 'Upload New Image'}</span>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleHeroUpload}
                                                        disabled={isUploading}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        {settings.hero_image_url && (
                                            <div className="w-32 h-20 border border-gray-200 overflow-hidden bg-gray-50">
                                                <img
                                                    src={settings.hero_image_url}
                                                    alt="Hero Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Portfolio Section */}
                        <div className="bg-white border border-gray-200 p-6">
                            <h3 className="font-serif text-xl mb-6">Portfolio Section</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="mb-6">
                                        <h3 className="font-serif text-xl">Photo Gallery</h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Manage the 9 images displayed in the photo grid (below "Behind the Camera").
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                            <div key={num}>
                                                <label className="block text-sm font-medium mb-2">Image {num}</label>
                                                <div className="space-y-3">
                                                    <input
                                                        type="text"
                                                        name={`portfolio_image_${num}`}
                                                        value={(settings as any)[`portfolio_image_${num}`]}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300"
                                                        placeholder="Image URL..."
                                                    />
                                                    <div className="relative">
                                                        <label className="cursor-pointer bg-white border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2 w-full">
                                                            <Upload size={16} />
                                                            <span>Upload</span>
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={(e) => handlePortfolioUpload(e, num)}
                                                                disabled={isUploading}
                                                            />
                                                        </label>
                                                    </div>
                                                    {(settings as any)[`portfolio_image_${num}`] && (
                                                        <div className="aspect-[3/4] border border-gray-200 overflow-hidden bg-gray-50 relative">
                                                            <img
                                                                src={(settings as any)[`portfolio_image_${num}`]}
                                                                alt={`Portfolio ${num}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* About Section */}
                                <div className="bg-white border border-gray-200 p-6">
                                    <h3 className="font-serif text-xl mb-6">About Section</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">About Title</label>
                                            <input
                                                type="text"
                                                name="about_title"
                                                value={settings.about_title}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300"
                                                placeholder="My Lens. My Language."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">About Description</label>
                                            <textarea
                                                name="about_description"
                                                value={settings.about_description}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300"
                                                rows={4}
                                                placeholder="For me, photography isn't about clicking a shutter..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Behind the Camera Section */}
                                <div className="bg-white border border-gray-200 p-6">
                                    <h3 className="font-serif text-xl mb-6">Behind the Camera</h3>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Subtitle</label>
                                                <input
                                                    type="text"
                                                    name="behind_camera_subtitle"
                                                    value={settings.behind_camera_subtitle}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300"
                                                    placeholder="About me"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Title</label>
                                                <input
                                                    type="text"
                                                    name="behind_camera_title"
                                                    value={settings.behind_camera_title}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300"
                                                    placeholder="Behind the Camera"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Description 1</label>
                                                <textarea
                                                    name="behind_camera_description1"
                                                    value={settings.behind_camera_description1}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className="w-full px-4 py-3 border border-gray-300"
                                                    placeholder="First paragraph..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Description 2</label>
                                                <textarea
                                                    name="behind_camera_description2"
                                                    value={settings.behind_camera_description2}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className="w-full px-4 py-3 border border-gray-300"
                                                    placeholder="Second paragraph..."
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Image</label>
                                            <div className="flex gap-4 items-start">
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        name="behind_camera_image_url"
                                                        value={settings.behind_camera_image_url}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 mb-2"
                                                        placeholder="Image URL..."
                                                    />
                                                    <div className="mt-2">
                                                        <label className="relative cursor-pointer bg-white border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 flex items-center gap-2 w-fit">
                                                            <Upload size={16} />
                                                            <span>{isUploading ? 'Uploading...' : 'Upload New Image'}</span>
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={handleBehindCameraUpload}
                                                                disabled={isUploading}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                                {settings.behind_camera_image_url && (
                                                    <div className="w-32 h-20 border border-gray-200 overflow-hidden bg-gray-50">
                                                        <img
                                                            src={settings.behind_camera_image_url}
                                                            alt="Behind Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing Section */}
                                <div className="bg-white border border-gray-200 p-6">
                                    <h3 className="font-serif text-xl mb-6">Pricing Section</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Subtitle</label>
                                            <input
                                                type="text"
                                                name="pricing_subtitle"
                                                value={settings.pricing_subtitle}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300"
                                                placeholder="Investment"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Title</label>
                                            <input
                                                type="text"
                                                name="pricing_title"
                                                value={settings.pricing_title}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300"
                                                placeholder="Photography Packages"
                                            />
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
