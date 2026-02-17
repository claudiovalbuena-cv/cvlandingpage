'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
    logoUrl?: string;
    siteName?: string;
}

export default function Header({ logoUrl, siteName = 'Claudio Valbuena' }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#home', label: 'Inicio' },
        { href: '#about', label: 'Sobre Mí' },
        { href: '#services', label: 'Servicios' },
        { href: '#gallery', label: 'Galería' },
        { href: '#booking', label: 'Contacto' },
    ];

    // Use custom logos from public folder
    const logoWhite = '/images/logo-white.png';
    const logoBlack = '/images/logo-black.png';
    const currentLogo = logoUrl || (isScrolled ? logoBlack : logoWhite);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src={currentLogo}
                        alt={siteName}
                        width={180}
                        height={50}
                        className="h-12 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${isScrolled ? 'text-gray-800' : 'text-white/90'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="#gallery"
                        className="bg-black text-white px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors"
                    >
                        Ver Galería
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-black' : 'text-white'
                        }`}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isMobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ${isMobileMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-4 pointer-events-none'
                    }`}
            >
                <nav className="flex flex-col p-6 gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-800 font-medium py-2 hover:text-accent transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="#gallery"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="bg-black text-white text-center py-3 font-medium hover:bg-gray-800 transition-colors mt-2"
                    >
                        Ver Galería
                    </Link>
                </nav>
            </div>
        </header>
    );
}
