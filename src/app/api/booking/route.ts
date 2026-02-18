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

        // Send confirmation email via Nodemailer (Gmail)
        const gmailUser = process.env.GMAIL_USER;
        const gmailPass = process.env.GMAIL_APP_PASSWORD;
        const emailTo = process.env.EMAIL_TO || cleanEmail;

        console.log('Email Attempt:', {
            hasUser: !!gmailUser,
            hasPass: !!gmailPass,
            to: emailTo
        });

        let emailSent = false;
        let emailError = null;

        if (gmailUser && gmailPass) {
            try {
                const nodemailer = await import('nodemailer');
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: gmailUser,
                        pass: gmailPass,
                    },
                });

                await transporter.sendMail({
                    from: `"CV Landing" <${gmailUser}>`,
                    to: emailTo,
                    subject: `Nueva Solicitud de Reserva: ${cleanName}`,
                    html: `
              <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
                <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; margin-bottom: 24px; color: #000; border-bottom: 1px solid #eee; padding-bottom: 20px;">
                  Nueva Solicitud de Reserva
                </h1>
                
                <div style="background: #F9F9F9; padding: 24px; border: 1px solid #eee; border-radius: 8px; margin-bottom: 24px;">
                  <p style="margin: 0 0 12px 0;"><strong style="text-transform: uppercase; font-size: 11px; color: #888;">Cliente:</strong><br/>${cleanName}</p>
                  <p style="margin: 0 0 12px 0;"><strong style="text-transform: uppercase; font-size: 11px; color: #888;">Email:</strong><br/>${cleanEmail}</p>
                  ${cleanPhone ? `<p style="margin: 0 0 12px 0;"><strong style="text-transform: uppercase; font-size: 11px; color: #888;">Teléfono:</strong><br/>${cleanPhone}</p>` : ''}
                  <p style="margin: 0 0 12px 0;"><strong style="text-transform: uppercase; font-size: 11px; color: #888;">Servicio:</strong><br/>${serviceName}</p>
                  <p style="margin: 0 0 12px 0;"><strong style="text-transform: uppercase; font-size: 11px; color: #888;">Fecha Solicitada:</strong><br/>${preferred_date}</p>
                  ${cleanMessage ? `<p style="margin: 0;"><strong style="text-transform: uppercase; font-size: 11px; color: #888;">Mensaje:</strong><br/>${cleanMessage}</p>` : ''}
                </div>
                
                <p style="color: #666; font-size: 13px; text-align: center; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
                  Este es un mensaje automático enviado desde tu página web.
                </p>
              </div>
            `,
                });
                emailSent = true;
                console.log('Email sent successfully');
            } catch (err: any) {
                console.error('Gmail sending failed:', err);
                emailError = err.message || 'Unknown email error';
            }
        } else {
            console.warn('Gmail credentials not configured, skipping notification.');
            emailError = 'Credential missing';
        }

        return NextResponse.json({
            success: true,
            booking: booking || { message: 'Booking saved' },
            message: 'Booking request processed'
        });
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json(
            { error: 'Failed to process booking request' },
            { status: 500 }
        );
    }
}
