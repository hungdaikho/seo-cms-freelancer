import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string }> }
) {
    try {
        const { domain } = await params;

        if (!domain) {
            return NextResponse.json(
                { success: false, error: 'Domain parameter is required' },
                { status: 400 }
            );
        }

        // Mock competitors data - replace with actual API call
        const mockCompetitors = [
            {
                domain: `competitor1-of-${domain}`,
                commonKeywords: 150,
                competitionLevel: 'High',
                trafficShare: 0.25
            },
            {
                domain: `competitor2-of-${domain}`,
                commonKeywords: 120,
                competitionLevel: 'Medium',
                trafficShare: 0.18
            }
        ];

        return NextResponse.json({
            success: true,
            data: {
                competitors: mockCompetitors,
                totalCompetitors: mockCompetitors.length
            }
        });
    } catch (error) {
        console.error('Error fetching competitors:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch competitors' },
            { status: 500 }
        );
    }
}