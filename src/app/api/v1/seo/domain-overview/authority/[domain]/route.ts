import { NextRequest, NextResponse } from 'next/server';

// Mock domain authority data
const mockAuthority = {
    'example.com': {
        domain: 'example.com',
        metrics: {
            mozDA: 85,
            mozPA: 78,
            ahrefsDR: 78,
            ahrefsUR: 75,
            semrushAS: 82,
            majesticTF: 80,
            majesticCF: 76
        },
        backlinks: {
            total: 125000,
            dofollow: 90000,
            nofollow: 35000,
            referringDomains: 4500,
            referringIPs: 3200
        },
        trust: {
            trustFlow: 80,
            citationFlow: 76,
            spamScore: 2
        }
    },
    'google.com': {
        domain: 'google.com',
        metrics: {
            mozDA: 100,
            mozPA: 98,
            ahrefsDR: 100,
            ahrefsUR: 95,
            semrushAS: 100,
            majesticTF: 98,
            majesticCF: 99
        },
        backlinks: {
            total: 5000000,
            dofollow: 4500000,
            nofollow: 500000,
            referringDomains: 150000,
            referringIPs: 120000
        },
        trust: {
            trustFlow: 98,
            citationFlow: 99,
            spamScore: 0
        }
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
            domain,
            metrics: {
                mozDA: Math.min(100, Math.max(1, baseScore + Math.floor(Math.random() * variance * 2) - variance)),
                mozPA: Math.min(100, Math.max(1, baseScore - 5 + Math.floor(Math.random() * variance))),
                ahrefsDR: Math.min(100, Math.max(1, baseScore + Math.floor(Math.random() * variance * 2) - variance)),
                ahrefsUR: Math.min(100, Math.max(1, baseScore - 3 + Math.floor(Math.random() * variance))),
                semrushAS: Math.min(100, Math.max(1, baseScore + Math.floor(Math.random() * variance * 2) - variance)),
                majesticTF: Math.min(100, Math.max(1, baseScore + Math.floor(Math.random() * variance))),
                majesticCF: Math.min(100, Math.max(1, baseScore - 2 + Math.floor(Math.random() * variance)))
            },
            backlinks: {
                total: Math.floor(Math.random() * 500000) + 10000,
                dofollow: Math.floor(Math.random() * 350000) + 7000,
                nofollow: Math.floor(Math.random() * 150000) + 3000,
                referringDomains: Math.floor(Math.random() * 5000) + 100,
                referringIPs: Math.floor(Math.random() * 3500) + 80
            },
            trust: {
                trustFlow: Math.min(100, Math.max(1, baseScore + Math.floor(Math.random() * 20) - 10)),
                citationFlow: Math.min(100, Math.max(1, baseScore + Math.floor(Math.random() * 20) - 10)),
                spamScore: Math.min(17, Math.max(0, Math.floor(Math.random() * 8)))
            }
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
