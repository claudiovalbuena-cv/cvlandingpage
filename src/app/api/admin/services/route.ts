import { NextResponse } from 'next/server';
import { getServices, createService } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const services = await getServices();
        return NextResponse.json({ services });
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, price, category, icon, price_text, price_url } = body;

        if (!name || price === undefined) {
            return NextResponse.json(
                { error: 'Name and price are required' },
                { status: 400 }
            );
        }

        const service = await createService({
            name,
            description: description || null,
            price: parseFloat(price),
            price_text: price_text || null,
            price_url: price_url || null,
            category: category || null,
            icon: icon || null,
        });

        return NextResponse.json({ service });
    } catch (error) {
        console.error('Error creating service:', error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
