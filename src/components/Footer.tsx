import Link from 'next/link';

interface FooterProps {
    settings?: {
        instagram?: string;
        pinterest?: string;
        linkedin?: string;
        behance?: string;
    };
}

export default function Footer({ settings }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { href: '#gallery', label: 'Gallery' },
        { href: '#services', label: 'Services' },
        { href: '#contact', label: 'Contact' },
    ];

    const socialLinks = [
        { href: settings?.instagram || '#', label: 'Instagram' },
        { href: settings?.pinterest || '#', label: 'Pinterest' },
        { href: settings?.linkedin || '#', label: 'LinkedIn' },
        { href: settings?.behance || '#', label: 'Behance' },
    ];

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-6xl mx-auto py-8 px-6">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    {/* Navigation Links */}
                    <nav className="flex gap-6">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-gray-600 hover:text-black transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Social Links */}
                    <nav className="flex gap-6">
                        {socialLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-600 hover:text-black transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Bottom Section */}
                <div className="pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500">
                        © {currentYear} Claudio Valbuena Fotografía. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
