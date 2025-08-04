import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Return API limits information
        return NextResponse.json({
            success: true,
            data: {
                remainingCredits: 1000,
                dailyLimit: 5000,
                monthlyLimit: 100000,
                resetTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            }
        });
    } catch (error) {
        console.error('Error fetching API limits:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch API limits' },
            { status: 500 }
        );
    }
}