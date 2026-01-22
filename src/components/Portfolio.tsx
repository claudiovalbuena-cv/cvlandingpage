'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const portfolioImages = [
    {
        src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800',
        alt: 'Wedding rings close-up',
        span: 'col-span-1 row-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?q=80&w=800',
        alt: 'Waterfall landscape',
        span: 'col-span-1 row-span-2',
    },
    {
        src: 'https://images.unsplash.com/photo-1469460340997-2f854421e72f?q=80&w=800',
        alt: 'Fashion portrait',
        span: 'col-span-1 row-span-1',
    },
];

export default function Portfolio() {
    const portfolioRef = useRef<HTMLElement>(null);

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

        const elements = portfolioRef.current?.querySelectorAll('.animate-on-scroll, .photo-grid-item');
        elements?.forEach((el, index) => {
            (el as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={portfolioRef}
            id="gallery"
            className="bg-white section-padding"
        >
            <div className="max-w-6xl mx-auto">
                <h2 className="animate-on-scroll font-serif text-4xl md:text-5xl lg:text-6xl text-center mb-16">
                    Stories Told Through My Lens
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {portfolioImages.map((image, index) => (
                        <div
                            key={image.src}
                            className={`photo-grid-item image-hover-zoom aspect-[3/4] relative ${image.span}`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
