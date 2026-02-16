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
            'hero_title',
            'hero_subtitle',
            'hero_image_url',
            'about_title',
            'about_description',
            'portfolio_title',
            'behind_camera_subtitle',
            'behind_camera_title',
            'behind_camera_description1',
            'behind_camera_description2',
            'behind_camera_image_url',
            'pricing_subtitle',
            'pricing_title',
            'site_name',
            'logo_url',
            'contact_email',
            'phone',
            'instagram',
            'pinterest',
            'linkedin',
            'behance',
            'facebook',
            'hero_title',
            'hero_subtitle',
            'hero_image_url',
            'about_title',
            'about_description',
            'portfolio_image_1',
            'portfolio_image_2',
            'portfolio_image_3',
            'gallery_image_1',
            'gallery_image_2',
            'gallery_image_3',
            'gallery_image_4',
            'gallery_image_5',
            'gallery_image_6',
            'gallery_image_7',
            'gallery_image_8',
            'gallery_image_9',
            'service_1_icon', 'service_1_title', 'service_1_description', 'service_1_url',
            'service_2_icon', 'service_2_title', 'service_2_description', 'service_2_url',
            'service_3_icon', 'service_3_title', 'service_3_description', 'service_3_url',
            'service_4_icon', 'service_4_title', 'service_4_description', 'service_4_url',
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
