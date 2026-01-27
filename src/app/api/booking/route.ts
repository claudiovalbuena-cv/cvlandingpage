import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createBooking, getServices } from '@/lib/supabase';

const resendApiKey = process.env.RESEND_API_KEY || 're_123456789';
const resend = new Resend(resendApiKey);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, service_id, preferred_date, message } = body;

        // Basic Sanitization
        const cleanName = name?.trim();
        const cleanEmail = email?.trim().toLowerCase();
        const cleanPhone = phone?.trim();
        const cleanMessage = message?.trim();

        // Validate required fields
        if (!cleanName || !cleanEmail || !preferred_date) {
            return NextResponse.json(
                { error: 'Name, email, and preferred date are required' },
                { status: 400 }
            );
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Get service details if service_id is provided
        let serviceName = 'General Inquiry';
        if (service_id) {
            const services = await getServices();
            const service = services.find((s) => s.id === service_id);
            if (service) {
                serviceName = service.name;
            }
        }

        // Save booking to Supabase
        const booking = await createBooking({
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone || null,
            service_id: service_id || null,
            preferred_date,
            message: cleanMessage,
        });

        // Send confirmation email via Resend
        const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';
        const emailTo = process.env.EMAIL_TO || email;
        const isResendConfigured = process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith('re_placeholder');

        if (isResendConfigured) {
            try {
                await resend.emails.send({
                    from: emailFrom,
                    to: [emailTo],
                    subject: `New Booking Request: ${name}`,
                    html: `
              <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; margin-bottom: 24px;">
                  New Booking Request
                </h1>
                
                <div style="background: #F5F5F5; padding: 24px; margin-bottom: 24px;">
                  <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${email}</p>
                  ${phone ? `<p style="margin: 0 0 8px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
                  <p style="margin: 0 0 8px 0;"><strong>Service:</strong> ${serviceName}</p>
                  <p style="margin: 0 0 8px 0;"><strong>Preferred Date:</strong> ${preferred_date}</p>
                  ${message ? `<p style="margin: 0;"><strong>Message:</strong> ${message}</p>` : ''}
                </div>
                
                <p style="color: #666; font-size: 14px;">
                  Please respond to this inquiry within 24 hours.
                </p>
              </div>
            `,
                });
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
                // Don't fail the booking if email fails
            }
        } else {
            console.warn('Resend API key not configured, skipping email confirmation.');
        }

        return NextResponse.json({
            success: true,
            booking: booking || { message: 'Booking saved' },
            message: 'Booking request submitted successfully',
        });
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json(
            { error: 'Failed to process booking request' },
            { status: 500 }
        );
    }
}
