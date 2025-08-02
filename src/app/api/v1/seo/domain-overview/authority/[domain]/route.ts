import { NextRequest, NextResponse } from 'next/server';

// Mock domain authority data
const mockAuthority = {
    'example.com': {
        moz: 85,
        ahrefs: 78,
        semrush: 82
    },
    'google.com': {
        moz: 100,
        ahrefs: 100,
        semrush: 100
    },
    'facebook.com': {
        moz: 96,
        ahrefs: 99,
        semrush: 98
    },
    'youtube.com': {
        moz: 100,
        ahrefs: 98,
        semrush: 99
    }
};

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string }> }
) {
    try {
        const { domain } = await params;

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));

        // Check if we have mock data for this domain
        if (mockAuthority[domain as keyof typeof mockAuthority]) {
            return NextResponse.json(mockAuthority[domain as keyof typeof mockAuthority]);
        }

        // Generate mock authority scores for unknown domains
        const baseScore = Math.floor(Math.random() * 40) + 30; // 30-70 base
        const variance = 10; // ±10 variance between providers

        const authority = {
            moz: Math.min(100, Math.max(1, baseScore + Math.floor(Math.random() * variance * 2) - variance)),
            ahrefs: Math.min(100, Math.max(1, baseScore + Math.floor(Math.random() * variance * 2) - variance)),
            semrush: Math.min(100, Math.max(1, baseScore + Math.floor(Math.random() * variance * 2) - variance))
        };

        return NextResponse.json(authority);

    } catch (error) {
        console.error('Domain authority API error:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Internal server error'
                }
            },
            { status: 500 }
        );
    }
}
