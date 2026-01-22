'use client';

import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import type { Service } from '@/types';

interface BookingFormProps {
    services: Service[];
}

export default function BookingForm({ services }: BookingFormProps) {
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
            alert('Please select a preferred date');
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

    // Disable past dates
    const disabledDays = { before: new Date() };

    return (
        <section
            ref={sectionRef}
            id="booking"
            className="bg-white section-padding"
        >
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <span className="animate-on-scroll text-accent text-sm tracking-widest uppercase mb-4 block">
                        Book Now
                    </span>
                    <h2 className="animate-on-scroll delay-100 font-serif text-4xl md:text-5xl mb-4">
                        Reserve Your Session
                    </h2>
                    <p className="animate-on-scroll delay-200 text-gray-600 max-w-xl mx-auto">
                        Fill out the form below and I&apos;ll get back to you within 24 hours to confirm your booking.
                    </p>
                </div>

                {submitStatus === 'success' ? (
                    <div className="animate-on-scroll bg-green-50 border border-green-200 p-8 text-center">
                        <h3 className="font-serif text-2xl text-green-800 mb-2">Thank You!</h3>
                        <p className="text-green-700">
                            Your booking request has been submitted. I&apos;ll be in touch soon.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                        {/* Form Fields */}
                        <div className="animate-on-scroll space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent transition-colors"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent transition-colors"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <div>
                                <label htmlFor="service_id" className="block text-sm font-medium mb-2">
                                    Service Type
                                </label>
                                <select
                                    id="service_id"
                                    name="service_id"
                                    value={formData.service_id}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent transition-colors bg-white"
                                >
                                    <option value="">Select a service...</option>
                                    {services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.name} - ${service.price}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent transition-colors resize-none"
                                    placeholder="Tell me about your vision..."
                                />
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="animate-on-scroll delay-200">
                            <label className="block text-sm font-medium mb-4">
                                Preferred Date *
                            </label>
                            <div className="flex justify-center">
                                <DayPicker
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={disabledDays}
                                    showOutsideDays
                                />
                            </div>
                            {selectedDate && (
                                <p className="text-center mt-4 text-sm text-gray-600">
                                    Selected: <span className="font-medium text-black">{format(selectedDate, 'MMMM d, yyyy')}</span>
                                </p>
                            )}

                            {submitStatus === 'error' && (
                                <p className="text-red-600 text-sm mt-4 text-center">
                                    There was an error submitting your booking. Please try again.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-8 bg-accent hover:bg-accent-hover text-white py-4 font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : 'Request Booking'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
