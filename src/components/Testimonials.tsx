'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialItem {
    name: string;
    text: string;
}

interface TestimonialsProps {
    title?: string;
    subtitle?: string;
    testimonials?: TestimonialItem[];
}

export default function Testimonials({
    title = 'Memories That Speak for Themselves',
    subtitle = 'CLIENT TESTIMONIALS',
    testimonials = []
}: TestimonialsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    // Filter out empty testimonials
    const activeTestimonials = testimonials.length > 0
        ? testimonials.filter(t => t.text.trim() !== '')
        : [];

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
        if (activeTestimonials.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % activeTestimonials.length);
    };

    const prevTestimonial = () => {
        if (activeTestimonials.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + activeTestimonials.length) % activeTestimonials.length);
    };

    if (activeTestimonials.length === 0) return null;

    return (
        <section
            ref={sectionRef}
            className="bg-white section-padding"
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
                        <div className="transition-opacity duration-500 min-h-[150px]">
                            <p className="text-xl mb-6 italic leading-relaxed">&ldquo;{activeTestimonials[currentIndex].text}&rdquo;</p>
                            <p className="font-bold tracking-wide uppercase text-sm">{activeTestimonials[currentIndex].name}</p>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="animate-on-scroll delay-200">
                        <span className="text-sm tracking-[0.2em] uppercase text-gray-400 mb-6 block font-medium">
                            {subtitle}
                        </span>
                        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
                            {title.split('<br />').map((line, i) => (
                                <span key={i}>
                                    {line}
                                    {i < title.split('<br />').length - 1 && <br />}
                                </span>
                            ))}
                            {title.indexOf('<br />') === -1 && title}
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
