'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        name: 'Miriam & Paul',
        text: 'Cada foto cuenta una historia. Nuestro álbum de bodas todavía nos emociona.',
    },
    {
        name: 'Brand Momently',
        text: 'The photos helped our brand shine. Stunning work that exceeded expectations.',
    },
    {
        name: 'Sarah Johnson',
        text: 'Incredible talent! The portraits captured my personality perfectly.',
    },
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
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

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section
            ref={sectionRef}
            className="bg-[#F5E6D3] section-padding"
        >
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Navigation */}
                    <div className="animate-on-scroll flex flex-col items-start">
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={prevTestimonial}
                                className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Current Testimonial */}
                        <div className="transition-opacity duration-500">
                            <p className="text-lg mb-4 italic">&ldquo;{testimonials[currentIndex].text}&rdquo;</p>
                            <p className="font-medium">{testimonials[currentIndex].name}</p>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="animate-on-scroll delay-200">
                        <span className="text-sm tracking-widest uppercase text-gray-600 mb-4 block">
                            Client Testimonials
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                            Memories That<br />Speak for Themselves
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
