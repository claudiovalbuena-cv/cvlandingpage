'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);

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

        const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={heroRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
                    alt="Wedding couple"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
                <h1 className="animate-on-scroll font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] mb-6">
                    Capture Moments
                </h1>
                <p className="animate-on-scroll delay-100 text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                    A portfolio landing page designed for photographers who want their images to do the talking.
                </p>
                <Link
                    href="#booking"
                    className="animate-on-scroll delay-200 inline-block bg-accent hover:bg-accent-hover text-white px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                    Book a Session
                </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <svg
                    className="w-6 h-6 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </section>
    );
}
