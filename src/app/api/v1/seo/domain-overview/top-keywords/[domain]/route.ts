import { NextRequest, NextResponse } from 'next/server';

// Mock top keywords data
const mockTopKeywords = {
    'example.com': [
        {
            keyword: 'seo tools',
            position: 3,
            searchVolume: 12500,
            traffic: 1250,
            cpc: 15.67,
            difficulty: 78,
            trend: 'up',
            url: 'https://example.com/seo-tools'
        },
        {
            keyword: 'keyword research',
            position: 1,
            searchVolume: 8900,
            traffic: 2670,
            cpc: 12.34,
            difficulty: 65,
            trend: 'stable',
            url: 'https://example.com/keyword-research'
        },
        {
            keyword: 'content marketing',
            position: 5,
            searchVolume: 15600,
            traffic: 890,
            cpc: 8.45,
            difficulty: 82,
            trend: 'down',
            url: 'https://example.com/content-marketing'
        },
        {
            keyword: 'digital marketing',
            position: 2,
            searchVolume: 22400,
            traffic: 4480,
            cpc: 18.90,
            difficulty: 88,
            trend: 'up',
            url: 'https://example.com/digital-marketing'
        },
        {
            keyword: 'link building',
            position: 7,
            searchVolume: 6700,
            traffic: 430,
            cpc: 14.25,
            difficulty: 75,
            trend: 'stable',
            url: 'https://example.com/link-building'
        }
    ],
    'google.com': [
        {
            keyword: 'search engine',
            position: 1,
            searchVolume: 450000,
            traffic: 135000,
            cpc: 0.0,
            difficulty: 100,
            trend: 'stable',
            url: 'https://google.com'
        },
        {
            keyword: 'google',
            position: 1,
            searchVolume: 2500000,
            traffic: 750000,
            cpc: 0.0,
            difficulty: 100,
            trend: 'stable',
            url: 'https://google.com'
        },
        {
            keyword: 'gmail',
            position: 1,
            searchVolume: 1200000,
            traffic: 360000,
            cpc: 0.0,
            difficulty: 100,
            trend: 'stable',
            url: 'https://gmail.com'
        }
    ]
};

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string }> }
) {
    try {
        const { domain } = await params;
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '100');
        const country = searchParams.get('country') || 'US';

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        let keywords = mockTopKeywords[domain as keyof typeof mockTopKeywords] || [];

        // Generate mock keywords for unknown domains
        if (keywords.length === 0) {
            const mockKeywordTerms = [
                'website design', 'web development', 'online marketing', 'social media',
                'email marketing', 'content strategy', 'brand awareness', 'customer service',
                'business solutions', 'technology trends', 'industry news', 'best practices',
                'case studies', 'tutorials', 'guides', 'reviews', 'comparisons', 'tools',
                'software', 'applications', 'services', 'consulting', 'support', 'training'
            ];

            keywords = Array.from({ length: Math.min(limit, 50) }, (_, i) => ({
                keyword: `${mockKeywordTerms[i % mockKeywordTerms.length]} ${domain.split('.')[0]}`,
                position: Math.floor(Math.random() * 50) + 1,
                searchVolume: Math.floor(Math.random() * 50000) + 100,
                traffic: Math.floor(Math.random() * 5000) + 50,
                cpc: parseFloat((Math.random() * 25 + 0.5).toFixed(2)),
                difficulty: Math.floor(Math.random() * 60) + 20,
                trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
                url: `https://${domain}/${mockKeywordTerms[i % mockKeywordTerms.length].replace(' ', '-')}`
            }));
        }

        // Apply limit
        const limitedKeywords = keywords.slice(0, limit);

        const response = {
            data: limitedKeywords,
            total: keywords.length * 10, // Simulate larger total
            domain,
            country
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Top keywords API error:', error);
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
