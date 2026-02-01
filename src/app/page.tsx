import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import BehindCamera from '@/components/BehindCamera';
import PhotoGrid from '@/components/PhotoGrid';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Pricing from '@/components/Pricing';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';
import { getServices, getSettings, getPortfolio } from '@/lib/supabase';

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
    // Fetch data from Supabase
    let services = [];
    let settings: Record<string, string> = {};
    let portfolio = [];

    try {
        services = await getServices();
        settings = await getSettings();
        portfolio = await getPortfolio();
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return (
        <main>
            <Header
                logoUrl={settings.logo_url}
                siteName={settings.site_name || 'Melody'}
            />
            <Hero
                title={settings.hero_title}
                subtitle={settings.hero_subtitle}
                backgroundImage={settings.hero_image_url}
            />
            <About
                title={settings.about_title}
                description={settings.about_description}
            />
            <Portfolio items={portfolio} />
            <BehindCamera />
            <PhotoGrid items={portfolio} />
            <Testimonials />
            <CTA />
            <Pricing services={services} />
            <BookingForm services={services} />
            <Footer
                settings={settings}
            />
        </main>
    );
}
