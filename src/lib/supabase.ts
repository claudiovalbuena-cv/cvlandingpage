import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const isMock = supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder');


// In-memory mock store
let mockSettings: Record<string, string> = {
    instagram: 'https://instagram.com/demo',
    linkedin: 'https://linkedin.com/in/demo',
    pinterest: 'https://pinterest.com/demo',
    social_style: 'minimal',
    site_name: 'Claudio Valbuena',
};

// Helper functions
export async function getServices() {
    if (isMock) {
        console.warn('Using mock data for services (Supabase not configured)');
        return [];
    }

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
    const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

    if (error) {
        throw error;
    }
}

export async function updateBookingStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled') {
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
