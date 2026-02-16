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
import { getServices, getSettings } from '@/lib/supabase';

export const revalidate = 0; // Disable cache for immediate updates

export default async function Home() {
    // Fetch data from Supabase
    let services = [];
    let settings: Record<string, string> = {};
    let portfolio = [];

    try {
        services = await getServices();
        settings = await getSettings();
        // portfolio = await getPortfolio(); // We are now using settings for portfolio

        if (settings.portfolio_image_1) {
            portfolio.push({
                src: settings.portfolio_image_1,
                alt: 'Portfolio 1',
                span: 'col-span-1 row-span-1',
            });
        }
        if (settings.portfolio_image_2) {
            portfolio.push({
                src: settings.portfolio_image_2,
                alt: 'Portfolio 2',
                span: 'col-span-1 row-span-2',
            });
        }
        if (settings.portfolio_image_3) {
            portfolio.push({
                src: settings.portfolio_image_3,
                alt: 'Portfolio 3',
                span: 'col-span-1 row-span-1',
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    // Build PhotoGrid items from settings
    const photoGridItems = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
        const url = settings[`gallery_image_${num}`];
        return url ? { src: url, alt: `Gallery Image ${num}` } : null;
    }).filter(item => item !== null);

    // Build Services items from settings (New 4-card section)
    const servicesSectionItems = [1, 2, 3, 4].map(num => ({
        icon: settings[`service_${num}_icon`] || 'Camera',
        title: settings[`service_${num}_title`] || '',
        description: settings[`service_${num}_description`] || '',
        url: settings[`service_${num}_url`] || '',
    })).filter(item => item.title !== ''); // Only show if title is present

    const testimonialsItems = [1, 2, 3, 4, 5, 6].map(num => ({
        text: settings[`testimonial_${num}_text`] || '',
        name: settings[`testimonial_${num}_author`] || '',
    }));

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
                services={servicesSectionItems}
            />



            <Portfolio
                items={portfolio}
                title={settings.portfolio_title}
            />
            <BehindCamera
                subtitle={settings.behind_camera_subtitle}
                title={settings.behind_camera_title}
                description1={settings.behind_camera_description1}
                description2={settings.behind_camera_description2}
                imageUrl={settings.behind_camera_image_url}
            />


            <PhotoGrid items={photoGridItems} />
            <Testimonials
                title={settings.testimonials_title}
                subtitle={settings.testimonials_subtitle}
                testimonials={testimonialsItems}
            />
            <CTA />
            <Pricing
                services={services}
                subtitle={settings.pricing_subtitle}
                title={settings.pricing_title}
            />
            <BookingForm services={services} />
            <Footer
                settings={settings}
            />
        </main>
    );
}
