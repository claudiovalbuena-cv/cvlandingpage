import { NextResponse } from 'next/server';
import { getPortfolio, createPortfolioItem } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const portfolio = await getPortfolio();
        return NextResponse.json({ portfolio });
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const item = await createPortfolioItem(body);
        return NextResponse.json({ item });
    } catch (error) {
        console.error('Error creating portfolio item:', error);
        return NextResponse.json({ error: 'Failed to create portfolio item' }, { status: 500 });
    }
}
