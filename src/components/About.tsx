'use client';

import { useEffect, useRef } from 'react';
import { Camera, Heart, User, calendar-check } from 'lucide-react';

const services = [
    {
        icon: Camera,
        title: 'Fashion & Editorial',
        description: 'Bold, artistic, story-driven',
    },
    {
        icon: Heart,
        title: 'Weddings',
        description: 'Timeless, romantic, emotional',
    },
    {
        icon: User,
        title: 'Portraits & Lifestyle',
        description: 'Authentic, expressive, professional',
    },
    {
        icon: calendar-check,
        title: 'Evento',
        description: 'Cultural, vibrant, candid',
    },
];

export default function About() {
    const aboutRef = useRef<HTMLElement>(null);

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

        const elements = aboutRef.current?.querySelectorAll('.animate-on-scroll, .stagger-children');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={aboutRef}
            id="about"
            className="bg-black text-white section-padding"
        >
            <div className="max-w-6xl mx-auto text-center">
                {/* Philosophy */}
                <div className="mb-16">
                    <h2 className="animate-on-scroll font-serif text-3xl md:text-4xl lg:text-5xl text-accent mb-6">
                        My Lens. My Language.
                    </h2>
                    <p className="animate-on-scroll delay-100 text-white/70 max-w-2xl mx-auto leading-relaxed">
                        For me, photography isn&apos;t about clicking a shutter. It&apos;s about capturing
                        the soul of a moment, the depth of an emotion, and the beauty hidden in everyday life.
                    </p>
                </div>

                {/* Service Categories */}
                <div className="stagger-children grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="border border-white/20 p-6 hover:border-accent/50 transition-colors group"
                        >
                            <service.icon className="w-6 h-6 mx-auto mb-4 text-white/60 group-hover:text-accent transition-colors" />
                            <h3 className="font-serif text-lg mb-2">{service.title}</h3>
                            <p className="text-sm text-white/50">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
