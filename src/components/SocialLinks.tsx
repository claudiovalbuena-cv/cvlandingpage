import { Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

interface SocialLinksProps {
    settings?: {
        instagram?: string;
        pinterest?: string;
        linkedin?: string;
        behance?: string;
    };
    style?: 'text' | 'minimal' | 'filled' | 'circle';
    className?: string;
}

export default function SocialLinks({ settings, style = 'minimal', className = '' }: SocialLinksProps) {
    if (!settings) return null;

    // Custom Icons for brands not in Lucide or tailored styles
    const PinterestIcon = ({ className }: { className?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0" />
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" opacity="0.1" />
            {/* Simple pin representation or use path closer to brand if desired, 
                but for "minimalist" a Circle P or similar works. 
                Let's use a standard "P" style or Pin. 
                Actually, let's use a nice path for Pinterest.
             */}
            <path d="M12 2C6.5 2 2 6.5 2 12c0 5.5 4.5 10 10 10 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8 0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z" fill="none" stroke="none" />
            <path d="M8 12c0-5 0-5 4-5s4 1 4 5c0 3-1 4-2 4s-2-2-2-3 0-2 1-3-1-3-2-2-2 3-2 4" stroke="currentColor" />
            <line x1="12" y1="12" x2="12" y2="20" stroke="currentColor" />
        </svg>
    );

    const BehanceIcon = ({ className }: { className?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M19 14h-5v5h5v-5zM12.5 17.5L8.5 17.5c-2.5 0-3-2-3-3.0 0-1.8 1.5-3.0 3-3.0 1 0 2.5 0.5 2.5 3s-1.5 2.5-3.5 2.5l-2.0 0L5 14h14v-2H13.5v2L19 14M22 10h-6" />
        </svg>
    );

    const links = [
        {
            key: 'instagram',
            href: settings.instagram,
            label: 'Instagram',
            icon: Instagram,
        },
        {
            key: 'pinterest',
            href: settings.pinterest,
            label: 'Pinterest',
            icon: PinterestIcon,
        },
        {
            key: 'linkedin',
            href: settings.linkedin,
            label: 'LinkedIn',
            icon: Linkedin,
        },
        {
            key: 'behance',
            href: settings.behance,
            label: 'Behance',
            icon: BehanceIcon,
        },
    ];

    const validLinks = links.filter(link => link.href && link.href.length > 0);

    if (style === 'text') {
        return (
            <div className={`flex gap-6 ${className}`}>
                {validLinks.map((link) => (
                    <Link
                        key={link.key}
                        href={link.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-black transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        );
    }

    // Styles for 'minimal', 'filled', 'circle'
    return (
        <div className={`flex gap-4 ${className}`}>
            {validLinks.map((link) => {
                const Icon = link.icon;
                const isFilled = style === 'filled';
                const isCircle = style === 'circle';

                let containerClasses = "flex items-center justify-center transition-all duration-300";
                let iconClasses = "w-5 h-5";

                if (isCircle) {
                    containerClasses += " w-10 h-10 rounded-full border border-gray-300 hover:border-black hover:bg-black hover:text-white text-gray-700";
                } else if (isFilled) {
                    containerClasses += " w-10 h-10 rounded bg-gray-100 hover:bg-black hover:text-white text-gray-800";
                } else {
                    // Minimal
                    containerClasses += " w-8 h-8 text-gray-600 hover:text-black hover:scale-110";
                }

                return (
                    <Link
                        key={link.key}
                        href={link.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={containerClasses}
                        aria-label={link.label}
                    >
                        <Icon className={iconClasses} />
                    </Link>
                );
            })}
        </div>
    );
}
