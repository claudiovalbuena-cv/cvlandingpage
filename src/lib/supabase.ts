import { createSupabaseServerClient } from './supabase/server';
import { createSupabaseBrowserClient } from './supabase/client';

const isServer = typeof window === 'undefined';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

function getSupabaseClient() {
    return isServer ? createSupabaseServerClient() : createSupabaseBrowserClient();
}

const isMock = supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder');


// In-memory mock store
let mockSettings: Record<string, string> = {
    instagram: 'https://instagram.com/demo',
    linkedin: 'https://linkedin.com/in/demo',
    pinterest: 'https://pinterest.com/demo',
    facebook: 'https://facebook.com/demo',
    social_style: 'minimal',
    site_name: 'Claudio Valbuena',
    portfolio_image_1: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800',
    portfolio_image_2: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?q=80&w=800',
    portfolio_image_3: 'https://images.unsplash.com/photo-1469460340997-2f854421e72f?q=80&w=800',
    gallery_image_1: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600',
    gallery_image_2: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600',
    gallery_image_3: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600',
    gallery_image_4: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600',
    gallery_image_5: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600',
    gallery_image_6: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?q=80&w=600',
    gallery_image_7: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600',
    gallery_image_8: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600',
    gallery_image_9: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',

    // Services Defaults
    service_1_icon: 'Camera',
    service_1_title: 'Fashion & Editorial',
    service_1_description: 'Bold, artistic, story-driven',
    service_1_url: '',

    service_2_icon: 'Heart',
    service_2_title: 'Weddings',
    service_2_description: 'Timeless, romantic, emotional',
    service_2_url: '',

    service_3_icon: 'User',
    service_3_title: 'Portraits & Lifestyle',
    service_3_description: 'Authentic, expressive, professional',
    service_3_url: '',

    service_4_icon: 'Calendar',
    service_4_title: 'Events',
    service_4_description: 'Cultural, vibrant, candid',
    service_4_url: '',

    // Testimonials Defaults
    testimonials_title: 'Memories That Speak for Themselves',
    testimonials_subtitle: 'CLIENT TESTIMONIALS',
    testimonial_1_text: 'Cada foto cuenta una historia. Nuestro álbum de bodas todavía nos emociona.',
    testimonial_1_author: 'Miriam & Paul',
    testimonial_2_text: 'The photos helped our brand shine. Stunning work that exceeded expectations.',
    testimonial_2_author: 'Brand Momently',
    testimonial_3_text: 'Incredible talent! The portraits captured my personality perfectly.',
    testimonial_3_author: 'Sarah Johnson',
    testimonial_4_text: '',
    testimonial_4_author: '',
    testimonial_5_text: '',
    testimonial_5_author: '',
    testimonial_6_text: '',
    testimonial_6_author: '',

    // CTA Defaults
    cta_title: 'Every Moment Deserves to<br />Be Captured Beautifully.',
    cta_button_text: 'Book Your Session',

    // Booking Form Defaults
    booking_subtitle: 'RESERVA AHORA',
    booking_title: 'Reserva tu Sesión',
    booking_description: 'Completa el siguiente formulario y me pondré en contacto contigo en menos de 24 horas para confirmar tu sesión.',
    booking_date_label: 'Fecha Preferida *',
    booking_button_text: 'Solicitar Reserva',
    hero_title: 'Tu historia en una mirada',
    hero_subtitle: 'Mi objetivo es crear imágenes que hablen de ti, que expresen tu personalidad, que cuenten historias, que transmitan sensaciones y te hagan sonreír.',
    hero_button_text: 'Book Your Session',
    hero_image_url: '/images/_DSC0043.jpg',
    booking_success_title: '¡Gracias!',
    booking_success_message: 'Tu solicitud de reserva ha sido enviada. Me pondré en contacto contigo pronto.',
    pricing_unit: '/ sesión',
    pricing_unit_url: '',
    menu_home_label: 'Inicio',
    menu_about_label: 'Sobre Mí',
    menu_services_label: 'Servicios',
    menu_gallery_label: 'Galería',
    menu_contact_label: 'Contacto',
    menu_cta_label: 'Ver Galería',
    menu_cta_url: '#gallery',
    favicon_url: '/favicon.ico',
};

// Helper functions
export async function getServices() {
    if (isMock) {
        console.warn('Using mock data for services (Supabase not configured)');
        return [];
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching services:', error);
        return [];
    }
    return data;
}

export async function getBookings() {
    if (isMock) {
        console.warn('Using mock data for bookings (Supabase not configured)');
        return [];
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('bookings')
        .select('*, service:services(*)')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }
    return data;
}

export async function getSettings(): Promise<Record<string, string>> {
    if (isMock) {
        console.warn('Using mock data for settings (Supabase not configured)');
        return { ...mockSettings };
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('settings')
        .select('*');

    if (error) {
        console.error('Error fetching settings:', error);
        return {};
    }

    const dbSettings = data.reduce((acc: Record<string, string>, item: { key: string; value: string }) => {
        acc[item.key] = item.value;
        return acc;
    }, {});

    // Merge defaults (mockSettings) with actual DB settings
    // This ensures that if a key is missing in DB, we fall back to default
    // And if it exists in DB, we use the DB value.
    return { ...mockSettings, ...dbSettings };
}

export async function createBooking(booking: {
    name: string;
    email: string;
    phone?: string;
    service_id?: string;
    preferred_date: string;
    message?: string;
}) {
    // We attempt insertion. If it's a public user, they won't have SELECT permission
    // so we don't use .select() by default to avoid RLS 401/403 errors.
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('bookings')
        .insert([{ ...booking, status: 'pending' }])
        .select();

    if (error) {
        // If SELECT fails, we try a simple insert without select
        // This is a fallback for public users who can INSERT but not SELECT
        const { error: insertError } = await supabase
            .from('bookings')
            .insert([{ ...booking, status: 'pending' }]);

        if (insertError) throw insertError;
        return { success: true };
    }

    return data ? data[0] : null;
}

export async function updateSetting(key: string, value: string) {
    if (isMock) {
        console.log(`[MOCK] Updating setting ${key} to ${value}`);
        mockSettings[key] = value;
        return { key, value };
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('settings')
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
        .select()
        .single();

    if (error) {
        throw error;
    }
    return data;
}

export async function updateService(id: string, service: {
    name?: string;
    description?: string | null;
    price?: number;
    price_text?: string | null;
    price_url?: string | null;
    category?: string | null;
    icon?: string | null;
}) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('services')
        .update(service)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw error;
    }
    return data;
}

export async function createService(service: {
    name: string;
    description: string | null;
    price: number;
    price_text?: string | null;
    price_url?: string | null;
    category: string | null;
    icon: string | null;
}) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('services')
        .insert([service])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteService(id: string) {
    const supabase = getSupabaseClient();
    const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

    if (error) {
        throw error;
    }
}

export async function updateBookingStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled') {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw error;
    }
    return data;
}

export async function deleteBooking(id: string) {
    const supabase = getSupabaseClient();
    const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

    if (error) {
        throw error;
    }
}

// Portfolio helpers
export async function getPortfolio() {
    if (isMock) {
        console.warn('Using mock data for portfolio (Supabase not configured)');
        return [];
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching portfolio:', error);
        return [];
    }
    return data;
}

export async function createPortfolioItem(item: {
    url: string;
    title?: string;
    category?: string;
    order_index?: number;
}) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('portfolio')
        .insert([item])
        .select()
        .single();

    if (error) {
        throw error;
    }
    return data;
}

export async function updatePortfolioItem(id: string, updates: Partial<{
    url: string;
    title: string;
    category: string;
    order_index: number;
}>) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('portfolio')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw error;
    }
    return data;
}

export async function deletePortfolioItem(id: string) {
    const supabase = getSupabaseClient();
    const { error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id);

    if (error) {
        throw error;
    }
}
