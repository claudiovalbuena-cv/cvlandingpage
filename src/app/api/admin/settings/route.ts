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
            'hero_button_text',
            'hero_image_url',
            'about_title',
            'about_description',
            'portfolio_title',
            'behind_camera_subtitle',
            'behind_camera_title',
            'behind_camera_description1', 'behind_camera_description2', 'behind_camera_image_url',
            'pricing_subtitle', 'pricing_title',
            'portfolio_image_1', 'portfolio_image_2', 'portfolio_image_3',
            'gallery_image_1', 'gallery_image_2', 'gallery_image_3',
            'gallery_image_4', 'gallery_image_5', 'gallery_image_6',
            'gallery_image_7', 'gallery_image_8', 'gallery_image_9',
            'service_1_icon', 'service_1_title', 'service_1_description', 'service_1_url',
            'service_2_icon', 'service_2_title', 'service_2_description', 'service_2_url',
            'service_3_icon', 'service_3_title', 'service_3_description', 'service_3_url',
            'service_4_icon', 'service_4_title', 'service_4_description', 'service_4_url',
            'testimonials_title',
            'testimonials_subtitle',
            'testimonial_1_text', 'testimonial_1_author',
            'testimonial_2_text', 'testimonial_2_author',
            'testimonial_3_text', 'testimonial_3_author',
            'testimonial_4_text', 'testimonial_4_author',
            'testimonial_5_text', 'testimonial_5_author',
            'testimonial_6_text', 'testimonial_6_author',
            'cta_title', 'cta_button_text',
            'booking_subtitle',
            'booking_title',
            'booking_description',
            'booking_date_label',
            'booking_button_text',
            'booking_success_title',
            'booking_success_message',
            'booking_success_link_text',
            'booking_secondary_link_text',
            'booking_secondary_link_url',
            'pricing_unit',
            'pricing_unit_url',
            'menu_home_label',
            'menu_about_label',
            'menu_services_label',
            'menu_gallery_label',
            'menu_contact_label',
            'menu_cta_label',
            'menu_cta_url',
            'favicon_url',
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
