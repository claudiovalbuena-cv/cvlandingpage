import Link from 'next/link';

interface SocialLinksProps {
    settings?: {
        instagram?: string;
        pinterest?: string;
        linkedin?: string;
        behance?: string;
        facebook?: string;
    };
    style?: 'text' | 'minimal' | 'filled' | 'circle';
    className?: string;
}

export default function SocialLinks({ settings, style = 'minimal', className = '' }: SocialLinksProps) {
    if (!settings) return null;

    const links = [
        {
            key: 'instagram',
            href: settings.instagram,
            label: 'Instagram',
            iconClass: 'fa-brands fa-instagram',
        },
        {
            key: 'facebook',
            href: settings.facebook,
            label: 'Facebook',
            iconClass: 'fa-brands fa-facebook-f',
        },
        {
            key: 'pinterest',
            href: settings.pinterest,
            label: 'Pinterest',
            iconClass: 'fa-brands fa-pinterest-p',
        },
        {
            key: 'linkedin',
            href: settings.linkedin,
            label: 'LinkedIn',
            iconClass: 'fa-brands fa-linkedin-in',
        },
        {
            key: 'behance',
            href: settings.behance,
            label: 'Behance',
            iconClass: 'fa-brands fa-behance',
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
                const isFilled = style === 'filled';
                const isCircle = style === 'circle';

                let containerClasses = "flex items-center justify-center transition-all duration-300";
                let iconClasses = "text-lg";

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
                        <i className={`${link.iconClass} ${iconClasses}`}></i>
                    </Link>
                );
            })}
        </div>
    );
}
