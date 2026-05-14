'use client';

import { useEffect, useRef } from 'react';
import type { Service } from '@/types';

interface PricingProps {
    services: Service[];
    subtitle?: string;
    title?: string;
}

export default function Pricing({ services, subtitle, title }: PricingProps) {
    const sectionRef = useRef<HTMLElement>(null);
    // ... animation effect remains the same
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

        const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll, .stagger-children');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // ... displayServices logic remains the same
    const displayServices = services.length > 0 ? services : [
        { id: '1', name: 'Portrait Session', description: 'Professional portrait photography for individuals or couples', price: 250, price_text: '/ session', price_url: null, category: 'portrait', icon: null, created_at: new Date().toISOString() },
        { id: '2', name: 'Wedding Package', description: 'Full day wedding coverage with edited photos', price: 2500, price_text: '/ session', price_url: null, category: 'wedding', icon: null, created_at: new Date().toISOString() },
        { id: '3', name: 'Fashion Editorial', description: 'Creative fashion shoots for portfolios or brands', price: 500, price_text: '/ session', price_url: null, category: 'fashion', icon: null, created_at: new Date().toISOString() },
    ];

    return (
        <section
            ref={sectionRef}
            id="services"
            className="bg-gray-light section-padding"
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="animate-on-scroll text-accent text-sm tracking-widest uppercase mb-4 block">
                        {subtitle || 'Investment'}
                    </span>
                    <h2 className="animate-on-scroll delay-100 font-serif text-4xl md:text-5xl">
                        {title || 'Photography Packages'}
                    </h2>
                </div>

                <div className="stagger-children grid md:grid-cols-3 gap-8">
                    {displayServices.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white p-8 border border-gray-200 hover:border-accent/30 transition-colors group"
                        >
                            <h3 className="font-serif text-2xl mb-3 group-hover:text-accent transition-colors">
                                {service.name}
                            </h3>
                            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                {service.description}
                            </p>
                            <div className="flex items-baseline gap-1 mt-auto pt-4">
                                {!service.hide_price && (
                                    <span className="text-3xl font-light">${service.price.toLocaleString()}</span>
                                )}
                                {service.price_url ? (
                                    <a
                                        href={service.price_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${service.hide_price ? 'text-xl font-medium text-gray-800' : 'text-gray-500 text-sm'} hover:text-accent transition-colors underline decoration-dotted`}
                                    >
                                        {service.price_text || (service.hide_price ? 'Consultar' : '/ session')}
                                    </a>
                                ) : (
                                    <span className={`${service.hide_price ? 'text-xl font-medium text-gray-800' : 'text-gray-500 text-sm'}`}>
                                        {service.price_text || (service.hide_price ? 'Consultar' : '/ session')}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
