'use client';

import { useEffect, useRef } from 'react';
import { Camera, Heart, User, Calendar, Video, Star, Award, Aperture } from 'lucide-react';
import Link from 'next/link';

const iconMap: { [key: string]: any } = {
    Camera,
    Heart,
    User,
    Calendar,
    Video,
    Star,
    Award,
    Aperture,
};

interface ServiceItem {
    icon: string;
    title: string;
    description: string;
    url?: string;
}

interface AboutProps {
    title?: string;
    description?: string;
    services?: ServiceItem[];
}

export default function About({ title, description, services = [] }: AboutProps) {
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
                        {title || 'My Lens. My Language.'}
                    </h2>
                    <p className="animate-on-scroll delay-100 text-white/70 max-w-2xl mx-auto leading-relaxed">
                        {description || "For me, photography isn't about clicking a shutter. It's about capturing the soul of a moment, the depth of an emotion, and the beauty hidden in everyday life."}
                    </p>
                </div>

                {/* Service Categories */}
                <div className="stagger-children grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {services.map((service, index) => {
                        const IconComponent = iconMap[service.icon] || Camera;
                        const CardContent = (
                            <div className="h-full border border-white/20 p-6 hover:border-accent/50 transition-colors group cursor-pointer">
                                <IconComponent className="w-6 h-6 mx-auto mb-4 text-white/60 group-hover:text-accent transition-colors" />
                                <h3 className="font-serif text-lg mb-2">{service.title}</h3>
                                <p className="text-sm text-white/50">{service.description}</p>
                            </div>
                        );

                        return (
                            <div key={index}>
                                {service.url ? (
                                    <Link href={service.url} className="block h-full">
                                        {CardContent}
                                    </Link>
                                ) : (
                                    CardContent
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
