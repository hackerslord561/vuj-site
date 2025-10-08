import { NextRequest, NextResponse } from 'next/server';
import { incrementStoryViews } from '@/lib/firestore';

export async function POST(request: NextRequest) {
    try {
        const { storyId } = await request.json();

        if (!storyId) {
            return NextResponse.json({ error: 'Story ID is required' }, { status: 400 });
        }

        await incrementStoryViews(storyId);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error incrementing views:', error);
        return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
    }
}