import Link from 'next/link';
import SocialLinks from './SocialLinks';

interface FooterProps {
    settings?: Record<string, string>;
}

export default function Footer({ settings }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { href: '#gallery', label: settings?.menu_gallery_label || 'Galería' },
        { href: '#services', label: settings?.menu_services_label || 'Servicios' },
        { href: '#contact', label: settings?.menu_contact_label || 'Contacto' },
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
                    {/* Social Links */}
                    <div className="flex gap-6">
                        <SocialLinks
                            settings={settings}
                            style={(settings as any)?.social_style as any || 'minimal'}
                        />
                    </div>
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
