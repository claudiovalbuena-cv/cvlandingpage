import { NextRequest, NextResponse } from 'next/server';
import { updateService, deleteService } from '@/lib/supabase';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, description, price, category, icon, price_text, price_url } = body;

        const service = await updateService(id, {
            name: name || undefined,
            description: description !== undefined ? description : undefined,
            price: price !== undefined ? parseFloat(price) : undefined,
            price_text: price_text !== undefined ? price_text : undefined,
            price_url: price_url !== undefined ? price_url : undefined,
            category: category !== undefined ? category : undefined,
            icon: icon !== undefined ? icon : undefined,
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
