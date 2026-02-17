import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/supabase";

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

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSettings();
    const siteTitle = settings.site_name || "Claudio Valbuena Fotografía";
    const faviconUrl = settings.favicon_url || "/favicon.ico";

    return {
        title: siteTitle,
        description: "Servicios de fotografía profesional para bodas, retratos, moda y estilo de vida. Cada momento merece ser capturado hermosamente.",
        keywords: ["fotografía", "fotógrafo de bodas", "fotografía de retratos", "fotografía de moda", "fotógrafo profesional"],
        icons: {
            icon: faviconUrl,
            shortcut: faviconUrl,
            apple: faviconUrl,
        },
        openGraph: {
            title: siteTitle,
            description: "Servicios de fotografía profesional para bodas, retratos, moda y estilo de vida.",
            type: "website",
        },
    };
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                    integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </head>
            <body className="font-sans antialiased">
                {children}
            </body>
        </html>
    );
}
