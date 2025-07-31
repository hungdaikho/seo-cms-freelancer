import { NextRequest, NextResponse } from 'next/server';

// Mock competitors data
const mockCompetitors = {
    'example.com': [
        {
            domain: 'competitor1.com',
            competitionLevel: 92,
            commonKeywords: 2850,
            authorityScore: 78,
            trafficGap: 45600,
            organicKeywords: 18500,
            estimatedTraffic: 156780
        },
        {
            domain: 'competitor2.com',
            competitionLevel: 88,
            commonKeywords: 2340,
            authorityScore: 72,
            trafficGap: 23400,
            organicKeywords: 14200,
            estimatedTraffic: 98650
        },
        {
            domain: 'competitor3.com',
            competitionLevel: 85,
            commonKeywords: 1950,
            authorityScore: 69,
            trafficGap: -12300,
            organicKeywords: 12800,
            estimatedTraffic: 87420
        },
        {
            domain: 'competitor4.com',
            competitionLevel: 82,
            commonKeywords: 1780,
            authorityScore: 66,
            trafficGap: -8900,
            organicKeywords: 11500,
            estimatedTraffic: 76540
        }
    ],
    'google.com': [
        {
            domain: 'bing.com',
            competitionLevel: 75,
            commonKeywords: 45000,
            authorityScore: 95,
            trafficGap: -1200000000,
            organicKeywords: 2500000,
            estimatedTraffic: 300000000
        },
        {
            domain: 'yahoo.com',
            competitionLevel: 65,
            commonKeywords: 35000,
            authorityScore: 88,
            trafficGap: -1300000000,
            organicKeywords: 1800000,
            estimatedTraffic: 200000000
        },
        {
            domain: 'duckduckgo.com',
            competitionLevel: 45,
            commonKeywords: 15000,
            authorityScore: 75,
            trafficGap: -1450000000,
            organicKeywords: 500000,
            estimatedTraffic: 50000000
        }
    ]
};

export async function GET(
    request: NextRequest,
    { params }: { params: { domain: string } }
) {
    try {
        const domain = params.domain;
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '50');
        const country = searchParams.get('country') || 'US';

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1200));

        let competitors = mockCompetitors[domain as keyof typeof mockCompetitors] || [];

        // Generate mock competitors for unknown domains
        if (competitors.length === 0) {
            const competitorDomains = [
                'competitor-a.com', 'competitor-b.com', 'competitor-c.com',
                'rival-site.com', 'alternative-solution.com', 'industry-leader.com',
                'market-player.com', 'business-rival.com', 'sector-competitor.com',
                'competing-brand.com'
            ];

            competitors = Array.from({ length: Math.min(limit, 10) }, (_, i) => ({
                domain: competitorDomains[i] || `competitor-${i + 1}.com`,
                competitionLevel: Math.floor(Math.random() * 40) + 50, // 50-90
                commonKeywords: Math.floor(Math.random() * 2000) + 500,
                authorityScore: Math.floor(Math.random() * 30) + 40, // 40-70
                trafficGap: Math.floor(Math.random() * 100000) - 50000, // -50k to +50k
                organicKeywords: Math.floor(Math.random() * 20000) + 5000,
                estimatedTraffic: Math.floor(Math.random() * 200000) + 20000
            }));
        }

        // Apply limit
        const limitedCompetitors = competitors.slice(0, limit);

        const response = {
            data: limitedCompetitors,
            total: Math.max(competitors.length, 20), // Simulate more competitors exist
            domain,
            country
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Competitors API error:', error);
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
