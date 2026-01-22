import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Melody Photography | Capture Your Moments",
    description: "Professional photography services for weddings, portraits, fashion, and lifestyle. Every moment deserves to be captured beautifully.",
    keywords: ["photography", "wedding photographer", "portrait photography", "fashion photography", "professional photographer"],
    openGraph: {
        title: "Melody Photography | Capture Your Moments",
        description: "Professional photography services for weddings, portraits, fashion, and lifestyle.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body className="font-sans antialiased">
                {children}
            </body>
        </html>
    );
}
