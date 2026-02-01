import { NextRequest, NextResponse } from 'next/server';
import { updatePortfolioItem, deletePortfolioItem } from '@/lib/supabase';

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const item = await updatePortfolioItem(params.id, body);
        return NextResponse.json({ item });
    } catch (error) {
        console.error('Error updating portfolio item:', error);
        return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await deletePortfolioItem(params.id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting portfolio item:', error);
        return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 });
    }
}
