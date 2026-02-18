import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseBrowserClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        // Return a dummy client or handle missing env vars gracefully during build
        console.warn('Supabase environment variables are missing. Using mock client (expected during build).');
        return {} as any;
    }

    return createBrowserClient(supabaseUrl, supabaseKey)
}
