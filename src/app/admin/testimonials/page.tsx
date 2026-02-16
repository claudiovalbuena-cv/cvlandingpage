'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Star, Save, User } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

interface TestimonialData {
    testimonials_title: string;
    testimonials_subtitle: string;
    [key: string]: string;
}

export default function TestimonialsAdminPage() {
    const [settings, setSettings] = useState<TestimonialData>({
        testimonials_title: '',
        testimonials_subtitle: '',
        testimonial_1_text: '', testimonial_1_author: '',
        testimonial_2_text: '', testimonial_2_author: '',
        testimonial_3_text: '', testimonial_3_author: '',
        testimonial_4_text: '', testimonial_4_author: '',
        testimonial_5_text: '', testimonial_5_author: '',
        testimonial_6_text: '', testimonial_6_author: '',
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
                setSettings(prev => ({ ...prev, ...data.settings }));
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

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminHeader />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="font-serif text-3xl mb-2">Testimoniales</h1>
                        <p className="text-gray-500 text-sm">Gestiona los testimonios de tus clientes (máximo 6)</p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                        ) : (
                            <Save size={18} />
                        )}
                        <span>Guardar Cambios</span>
                    </button>
                </div>

                {saveStatus === 'success' && (
                    <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
                        ¡Testimoniales guardados con éxito!
                    </div>
                )}

                {saveStatus === 'error' && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                        Error al guardar los testimoniales. Inténtalo de nuevo.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Header Section */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                            <Star className="text-accent" size={20} />
                            <h2 className="font-medium text-lg">Título de la Sección</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo (ej: CLIENT TESTIMONIALS)</label>
                                <input
                                    type="text"
                                    value={settings.testimonials_subtitle}
                                    onChange={(e) => handleChange('testimonials_subtitle', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</label>
                                <input
                                    type="text"
                                    value={settings.testimonials_title}
                                    onChange={(e) => handleChange('testimonials_title', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-[#F5E6D3]/30 p-8 rounded-xl shadow-sm border border-[#F5E6D3] space-y-6">
                        <div className="flex items-center gap-3 border-b border-[#F5E6D3] pb-4 mb-4">
                            <Star className="text-accent" size={20} />
                            <h2 className="font-medium text-lg text-gray-800">Sección Llamada a la Acción (CTA)</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Título del CTA</label>
                                <textarea
                                    rows={2}
                                    value={settings.cta_title}
                                    onChange={(e) => handleChange('cta_title', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all resize-none"
                                />
                                <p className="text-xs text-gray-400 mt-1">Usa &lt;br /&gt; para saltos de línea.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Texto del Botón</label>
                                <input
                                    type="text"
                                    value={settings.cta_button_text}
                                    onChange={(e) => handleChange('cta_button_text', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Testimonials List */}
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                            <div key={num} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-sm">
                                        {num}
                                    </div>
                                    <h2 className="font-medium text-lg">Testimonial {num}</h2>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left flex items-center gap-2">
                                            <Star size={14} className="text-accent" />
                                            Texto del Testimonio
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={settings[`testimonial_${num}_text`]}
                                            onChange={(e) => handleChange(`testimonial_${num}_text`, e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all resize-none"
                                            placeholder="Introduce el testimonio del cliente..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left flex items-center gap-2">
                                            <User size={14} className="text-accent" />
                                            Autor
                                        </label>
                                        <input
                                            type="text"
                                            value={settings[`testimonial_${num}_author`]}
                                            onChange={(e) => handleChange(`testimonial_${num}_author`, e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                                            placeholder="Nombre del cliente"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="bg-accent hover:bg-accent-hover text-white px-10 py-4 font-medium transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
                        >
                            {isSaving ? 'Guardando...' : 'Guardar Todos los Cambios'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
