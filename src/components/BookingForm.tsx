'use client';

import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import type { Service } from '@/types';

import { es } from 'date-fns/locale';

interface BookingFormProps {
    services: Service[];
    subtitle?: string;
    title?: string;
    description?: string;
    dateLabel?: string;
    buttonText?: string;
    successTitle?: string;
    successMessage?: string;
}

export default function BookingForm({
    services,
    subtitle = 'RESERVA AHORA',
    title = 'Reserva tu Sesión',
    description = 'Completa el siguiente formulario y me pondré en contacto contigo en menos de 24 horas para confirmar tu sesión.',
    dateLabel = 'Fecha Preferida *',
    buttonText = 'Solicitar Reserva',
    successTitle = '¡Gracias!',
    successMessage = 'Tu solicitud de reserva ha sido enviada. Me pondré en contacto contigo pronto.',
}: BookingFormProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service_id: '',
        message: '',
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDate) {
            alert('Por favor selecciona una fecha preferida');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    preferred_date: format(selectedDate, 'yyyy-MM-dd'),
                }),
            });

            if (!response.ok) {
                throw new Error('Booking failed');
            }

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                service_id: '',
                message: '',
            });
            setSelectedDate(undefined);
        } catch (error) {
            console.error('Booking error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (submitStatus === 'success' && sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [submitStatus]);

    // Disable past dates
    const disabledDays = { before: new Date() };

    return (
        <section
            ref={sectionRef}
            id="booking"
            className="bg-white section-padding scroll-mt-20"
        >
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <span className="animate-on-scroll text-accent text-sm tracking-widest uppercase mb-4 block">
                        {subtitle}
                    </span>
                    <h2 className="animate-on-scroll delay-100 font-serif text-4xl md:text-5xl mb-4">
                        {title}
                    </h2>
                    <p className="animate-on-scroll delay-200 text-gray-600 max-w-xl mx-auto">
                        {description}
                    </p>
                </div>

                {submitStatus === 'success' ? (
                    <div className="bg-green-50 border-2 border-green-200 p-12 text-center rounded-lg shadow-sm animate-in fade-in duration-500">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-3xl text-green-800 mb-4">{successTitle}</h3>
                        <p className="text-green-700 text-lg max-w-lg mx-auto leading-relaxed">
                            {successMessage}
                        </p>
                        <button
                            onClick={() => setSubmitStatus('idle')}
                            className="mt-8 text-green-600 font-medium hover:text-green-700 underline underline-offset-4"
                        >
                            Enviar otra reserva
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                        {/* Form Fields */}
                        <div className="animate-on-scroll space-y-6 text-left">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Nombre Completo *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent transition-colors outline-none"
                                    placeholder="Tu nombre"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Correo Electrónico *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent transition-colors outline-none"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                    Número de Teléfono
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent transition-colors outline-none"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <div>
                                <label htmlFor="service_id" className="block text-sm font-medium mb-2">
                                    Tipo de Servicio
                                </label>
                                <select
                                    id="service_id"
                                    name="service_id"
                                    value={formData.service_id}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent transition-colors bg-white outline-none"
                                >
                                    <option value="">Selecciona un servicio...</option>
                                    {services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.name} - ${service.price}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Mensaje
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent transition-colors resize-none outline-none"
                                    placeholder="Cuéntame sobre tu visión..."
                                />
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="animate-on-scroll delay-200 text-left">
                            <label className="block text-sm font-medium mb-4">
                                {dateLabel}
                            </label>
                            <div className="flex justify-center bg-gray-50 p-4 border border-gray-100 rounded-lg">
                                <DayPicker
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={disabledDays}
                                    showOutsideDays
                                    locale={es}
                                />
                            </div>
                            {selectedDate && (
                                <p className="text-center mt-4 text-sm text-gray-600">
                                    Seleccionado: <span className="font-medium text-black">{format(selectedDate, "d 'de' MMMM, yyyy", { locale: es })}</span>
                                </p>
                            )}

                            {submitStatus === 'error' && (
                                <p className="text-red-600 text-sm mt-4 text-center">
                                    Hubo un error al enviar tu reserva. Por favor intenta de nuevo.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-8 bg-accent hover:bg-accent-hover text-white py-4 font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
                            >
                                {isSubmitting ? 'Enviando...' : buttonText}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
