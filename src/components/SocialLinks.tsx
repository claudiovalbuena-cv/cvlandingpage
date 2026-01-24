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
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.65 0-5.787 2.733-5.787 5.561 0 1.102.424 2.286.953 2.922.105.126.12.235.089.424-.098.406-.316 1.285-.359 1.465-.056.236-.187.279-.434.168-1.621-.755-2.633-3.132-2.633-5.044 0-4.107 2.986-7.874 8.604-7.874 4.516 0 8.028 3.22 8.028 7.525 0 4.496-2.834 8.118-6.769 8.118-1.321 0-2.559-.686-2.985-1.497l-.813 3.094c-.294 1.136-1.077 2.56-1.611 3.43C7.575 23.868 9.722 24.004 12 24.004c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" fill="currentColor" />
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
