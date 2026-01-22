'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CTA() {
    const ctaRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        const elements = ctaRef.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={ctaRef}
            className="bg-[#F5E6D3] section-padding text-center"
        >
            <div className="max-w-3xl mx-auto">
                <h2 className="animate-on-scroll font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
                    Every Moment Deserves to<br />Be Captured Beautifully.
                </h2>
                <Link
                    href="#booking"
                    className="animate-on-scroll delay-200 inline-block bg-accent hover:bg-accent-hover text-white px-10 py-4 text-sm font-medium tracking-wide transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                    Book Your Session
                </Link>
            </div>
        </section>
    );
}
