export interface Service {
    id: string;
    name: string;
    description: string | null;
    price: number;
    category: string | null;
    icon: string | null;
    created_at: string;
}

export interface Booking {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    service_id: string | null;
    preferred_date: string;
    message: string | null;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
    service?: Service;
}

export interface Setting {
    id: string;
    key: string;
    value: string;
    updated_at: string;
}

export interface SiteSettings {
    logo_url?: string;
    site_url?: string;
    site_name?: string;
    contact_email?: string;
    phone?: string;
    instagram?: string;
    pinterest?: string;
    linkedin?: string;
    behance?: string;
}
