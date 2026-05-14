import { NextRequest, NextResponse } from 'next/server';
import { updateService, deleteService } from '@/lib/db';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, description, price, category, icon, price_text, price_url, hide_price } = body;

        const service = await updateService(id, {
            name,
            description,
            price: price !== undefined ? parseFloat(price) : undefined,
            price_text,
            price_url,
            category,
            icon,
            hide_price: hide_price !== undefined ? hide_price : false,
        });

        return NextResponse.json({ service });
    } catch (error) {
        console.error('Error updating service:', error);
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await deleteService(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting service:', error);
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}
