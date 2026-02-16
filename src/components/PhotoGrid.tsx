'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const photos = [
    {
        src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600',
        alt: 'Portrait photography',
    },
    {
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600',
        alt: 'Fashion model colorful',
    },
    {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600',
        alt: 'Wedding couple',
    },
    {
        src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600',
        alt: 'Yellow fashion portrait',
    },
    {
        src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600',
        alt: 'Man portrait',
    },
    {
        src: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?q=80&w=600',
        alt: 'Sunset silhouette',
    },
    {
        src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600',
        alt: 'Fashion runway',
    },
    {
        src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600',
        alt: 'Natural beauty portrait',
    },
    {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
        alt: 'Bride with flowers',
    },
];

interface PhotoGridProps {
    items?: any[];
}

export default function PhotoGrid({ items = [] }: PhotoGridProps) {
    const displayPhotos = (items && items.length > 0) ? items : photos;
    const gridRef = useRef<HTMLElement>(null);

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

        const elements = gridRef.current?.querySelectorAll('.photo-grid-item');
        elements?.forEach((el, index) => {
            (el as HTMLElement).style.transitionDelay = `${index * 0.05}s`;
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={gridRef}
            className="bg-black py-0"
        >
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
                {displayPhotos.map((photo, index) => (
                    <div
                        key={index}
                        className="photo-grid-item image-hover-zoom relative aspect-square"
                    >
                        <Image
                            src={photo.url || photo.src}
                            alt={photo.title || photo.alt}
                            fill
                            className="object-cover"
                            sizes="33vw"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
