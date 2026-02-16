'use client';

import { Camera, Heart, User, Calendar, Video, Star, Award, Aperture } from 'lucide-react';
import Link from 'next/link';

interface ServiceItem {
    icon: string;
    title: string;
    description: string;
    url?: string;
}

interface ServicesProps {
    items: ServiceItem[];
}

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

export default function Services({ items }: ServicesProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className="py-20 bg-black text-white border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {items.map((item, index) => {
                        const IconComponent = iconMap[item.icon] || Camera;
                        const CardContent = (
                            <div className="flex flex-col items-center text-center p-8 border border-white/10 hover:border-white/30 transition-colors h-full group">
                                <div className="mb-6 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                                    <IconComponent strokeWidth={1.5} size={32} />
                                </div>
                                <h3 className="font-serif text-xl mb-3 tracking-wide">{item.title}</h3>
                                <p className="text-gray-400 text-sm font-light leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );

                        return (
                            <div key={index}>
                                {item.url ? (
                                    <Link href={item.url} className="block h-full">
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
