import { NextRequest, NextResponse } from 'next/server';

// Mock data for domain overview
const mockDomainData = {
    'example.com': {
        domain: 'example.com',
        authorityScore: 85,
        organicKeywords: 15420,
        organicTraffic: 234500,
        organicCost: 45600,
        backlinks: 856420,
        referringDomains: 3450,
        topCountries: [
            {
                country: 'US',
                traffic: 82075,
                percentage: 35.02
            },
            {
                country: 'UK',
                traffic: 58625,
                percentage: 25.01
            },
            {
                country: 'CA',
                traffic: 35100,
                percentage: 14.97
            },
            {
                country: 'AU',
                traffic: 28275,
                percentage: 12.06
            },
            {
                country: 'DE',
                traffic: 30425,
                percentage: 12.98
            }
        ],
        trafficTrend: [
            { date: '2024-01-01', traffic: 21500 },
            { date: '2024-02-01', traffic: 22100 },
            { date: '2024-03-01', traffic: 23400 },
            { date: '2024-04-01', traffic: 22800 },
            { date: '2024-05-01', traffic: 24200 },
            { date: '2024-06-01', traffic: 23900 },
            { date: '2024-07-01', traffic: 25100 },
            { date: '2024-08-01', traffic: 24500 },
            { date: '2024-09-01', traffic: 26200 },
            { date: '2024-10-01', traffic: 25800 },
            { date: '2024-11-01', traffic: 27400 },
            { date: '2024-12-01', traffic: 28100 }
        ]
    },
    'google.com': {
        domain: 'google.com',
        authorityScore: 100,
        organicKeywords: 5000000,
        organicTraffic: 1500000000,
        organicCost: 250000000,
        backlinks: 50000000,
        referringDomains: 500000,
        topCountries: [
            { country: 'US', traffic: 525000000, percentage: 35.0 },
            { country: 'IN', traffic: 150000000, percentage: 10.0 },
            { country: 'BR', traffic: 105000000, percentage: 7.0 },
            { country: 'JP', traffic: 90000000, percentage: 6.0 },
            { country: 'UK', traffic: 75000000, percentage: 5.0 }
        ],
        trafficTrend: [
            { date: '2024-01-01', traffic: 1400000000 },
            { date: '2024-02-01', traffic: 1420000000 },
            { date: '2024-03-01', traffic: 1450000000 },
            { date: '2024-04-01', traffic: 1480000000 },
            { date: '2024-05-01', traffic: 1500000000 },
            { date: '2024-06-01', traffic: 1520000000 },
            { date: '2024-07-01', traffic: 1510000000 },
            { date: '2024-08-01', traffic: 1530000000 },
            { date: '2024-09-01', traffic: 1540000000 },
            { date: '2024-10-01', traffic: 1560000000 },
            { date: '2024-11-01', traffic: 1580000000 },
            { date: '2024-12-01', traffic: 1600000000 }
        ]
    }
};

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string }> }
) {
    try {
        const { domain } = await params;
        const { searchParams } = new URL(request.url);
        const includeSubdomains = searchParams.get('includeSubdomains') === 'true';

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if we have mock data for this domain
        if (mockDomainData[domain as keyof typeof mockDomainData]) {
            return NextResponse.json(mockDomainData[domain as keyof typeof mockDomainData]);
        }

        // Generate mock data for unknown domains
        const mockData = {
            domain,
            authorityScore: Math.floor(Math.random() * 40) + 30, // 30-70
            organicKeywords: Math.floor(Math.random() * 50000) + 1000,
            organicTraffic: Math.floor(Math.random() * 500000) + 10000,
            organicCost: Math.floor(Math.random() * 100000) + 5000,
            backlinks: Math.floor(Math.random() * 1000000) + 10000,
            referringDomains: Math.floor(Math.random() * 5000) + 100,
            topCountries: [
                { country: 'US', traffic: Math.floor(Math.random() * 100000), percentage: Math.random() * 30 + 20 },
                { country: 'UK', traffic: Math.floor(Math.random() * 50000), percentage: Math.random() * 20 + 10 },
                { country: 'CA', traffic: Math.floor(Math.random() * 30000), percentage: Math.random() * 15 + 5 },
                { country: 'AU', traffic: Math.floor(Math.random() * 25000), percentage: Math.random() * 10 + 5 },
                { country: 'DE', traffic: Math.floor(Math.random() * 20000), percentage: Math.random() * 10 + 5 }
            ],
            trafficTrend: Array.from({ length: 12 }, (_, i) => ({
                date: `2024-${String(i + 1).padStart(2, '0')}-01`,
                traffic: Math.floor(Math.random() * 50000) + 10000
            }))
        };

        return NextResponse.json(mockData);

    } catch (error) {
        console.error('Domain overview API error:', error);
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
