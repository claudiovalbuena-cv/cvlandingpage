'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface BehindCameraProps {
    subtitle?: string;
    title?: string;
    description1?: string;
    description2?: string;
    imageUrl?: string;
}

export default function BehindCamera({
    subtitle,
    title,
    description1,
    description2,
    imageUrl
}: BehindCameraProps) {
    const sectionRef = useRef<HTMLElement>(null);

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

        const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-black text-white py-0"
        >
            <div className="grid md:grid-cols-2 items-center min-h-[600px]">
                {/* Image */}
                <div className="relative h-[400px] md:h-full">
                    <Image
                        src={imageUrl || "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1000"}
                        alt="Photographer with camera"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-8 md:p-16 lg:p-20">
                    <span className="animate-on-scroll text-accent text-sm tracking-widest uppercase mb-4 block">
                        {subtitle || 'About me'}
                    </span>
                    <h2 className="animate-on-scroll delay-100 font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
                        {title || 'Behind\nthe Camera'}
                    </h2>
                    <p className="animate-on-scroll delay-200 text-white/70 leading-relaxed mb-6">
                        {description1 || "From candid street captures to carefully staged editorial shoots, I've always believed photography is about connection and storytelling."}
                    </p>
                    <p className="animate-on-scroll delay-300 text-white/70 leading-relaxed">
                        {description2 || "Every client has a story — my job is to bring it to life through images that speak louder than words."}
                    </p>
                </div>
            </div>
        </section>
    );
}
