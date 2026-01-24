import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSetting } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const settings = await getSettings();
        return NextResponse.json({ settings });
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        // Update each setting
        const settingKeys = [
            'logo_url',
            'site_url',
            'site_name',
            'contact_email',
            'phone',
            'instagram',
            'pinterest',
            'linkedin',
            'behance',
            'social_style',
        ];

        for (const key of settingKeys) {
            if (body[key] !== undefined) {
                await updateSetting(key, body[key]);
            }
        }

        const settings = await getSettings();
        return NextResponse.json({ settings, success: true });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
