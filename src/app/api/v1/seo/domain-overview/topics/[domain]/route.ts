import { NextRequest, NextResponse } from 'next/server';

// Mock topics data
const mockTopics = {
    'example.com': [
        {
            topic: 'SEO Strategy',
            keywords: 342,
            traffic: 8760,
            difficulty: 72,
            opportunities: 28,
            topKeywords: ['seo strategy guide', 'seo strategy tips', 'seo strategy tools']
        },
        {
            topic: 'Content Marketing',
            keywords: 287,
            traffic: 6540,
            difficulty: 68,
            opportunities: 35,
            topKeywords: ['content marketing guide', 'content marketing tips', 'content marketing strategy']
        },
        {
            topic: 'Link Building',
            keywords: 198,
            traffic: 4320,
            difficulty: 75,
            opportunities: 22,
            topKeywords: ['link building strategies', 'how to build links', 'link building tools']
        },
        {
            topic: 'Keyword Research',
            keywords: 156,
            traffic: 3890,
            difficulty: 65,
            opportunities: 18,
            topKeywords: ['keyword research tools', 'how to do keyword research', 'keyword analysis']
        },
        {
            topic: 'Technical SEO',
            keywords: 234,
            traffic: 5670,
            difficulty: 80,
            opportunities: 31,
            topKeywords: ['technical seo checklist', 'website optimization', 'page speed optimization']
        }
    ],
    'google.com': [
        {
            topic: 'Search Technology',
            keywords: 125000,
            traffic: 45000000,
            difficulty: 95,
            opportunities: 5000,
            topKeywords: ['search algorithm', 'search results', 'search technology']
        },
        {
            topic: 'Web Services',
            keywords: 98000,
            traffic: 38000000,
            difficulty: 92,
            opportunities: 3500,
            topKeywords: ['google services', 'web applications', 'cloud services']
        },
        {
            topic: 'Mobile Apps',
            keywords: 87000,
            traffic: 32000000,
            difficulty: 88,
            opportunities: 4200,
            topKeywords: ['android apps', 'mobile applications', 'app store']
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
        const limit = parseInt(searchParams.get('limit') || '50');

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        let topics = mockTopics[domain as keyof typeof mockTopics] || [];

        // Generate mock topics for unknown domains
        if (topics.length === 0) {
            const mockTopicNames = [
                'Product Features', 'Customer Support', 'Industry Insights', 'Best Practices',
                'Technology Trends', 'Market Analysis', 'User Guides', 'Case Studies',
                'Business Solutions', 'Service Offerings', 'Company News', 'Expert Advice',
                'Tutorial Content', 'Product Reviews', 'Comparison Guides', 'Resource Library'
            ];

            topics = Array.from({ length: Math.min(limit, 12) }, (_, i) => {
                const topicName = mockTopicNames[i % mockTopicNames.length] || `Topic ${i + 1}`;
                return {
                    topic: `${topicName} - ${domain.split('.')[0]}`,
                    keywords: Math.floor(Math.random() * 500) + 50,
                    traffic: Math.floor(Math.random() * 10000) + 1000,
                    difficulty: Math.floor(Math.random() * 40) + 40, // 40-80
                    opportunities: Math.floor(Math.random() * 50) + 10,
                    topKeywords: [
                        `${topicName.toLowerCase().replace(' ', ' ')} tips`,
                        `${topicName.toLowerCase().replace(' ', ' ')} guide`,
                        `${topicName.toLowerCase().replace(' ', ' ')} best practices`
                    ]
                };
            });
        }

        // Apply limit
        const limitedTopics = topics.slice(0, limit);

        const response = {
            data: limitedTopics,
            total: Math.max(topics.length, 15), // Simulate more topics exist
            domain
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Topics API error:', error);
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
