import { NextRequest, NextResponse } from 'next/server';
import { updateBookingStatus } from '@/lib/supabase';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        if (!status || !['pending', 'confirmed', 'cancelled'].includes(status)) {
            return NextResponse.json(
                { error: 'Valid status is required' },
                { status: 400 }
            );
        }

        const booking = await updateBookingStatus(id, status);
        return NextResponse.json({ booking });
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}
