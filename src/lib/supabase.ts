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

    return data.reduce((acc: Record<string, string>, item: { key: string; value: string }) => {
        acc[item.key] = item.value;
        return acc;
    }, {});
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

export async function updateService(id: string, updates: Partial<{
    name: string;
    description: string;
    price: number;
    category: string;
    icon: string;
}>) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('services')
        .update(updates)
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
    description?: string;
    price: number;
    category?: string;
    icon?: string;
}) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('services')
        .insert([service])
        .select()
        .single();

    if (error) {
        throw error;
    }
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
