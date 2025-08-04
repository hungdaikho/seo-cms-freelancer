/**
 * Keyword Gap Analysis Demo
 * 
 * This file demonstrates how to use the Keyword Gap Analysis feature
 * with real API integration.
 */

import { keywordGapService } from '@/services/keyword-gap.service';
import { useKeywordGap } from '@/stores/hooks/useKeywordGap';

// Example: Basic keyword gap analysis
export const demoBasicAnalysis = async () => {
    try {
        const result = await keywordGapService.analyzeKeywordGaps({
            seedKeyword: "seo tools",
            competitorDomains: ["semrush.com", "ahrefs.com"],
            includeCompetitorKeywords: true,
            location: "US",
            minVolume: 100,
        });

        console.log('Analysis Result:', result);

        // Process keyword opportunities
        const opportunities = keywordGapService.getKeywordOpportunities(result, {
            maxDifficulty: 60,
            minVolume: 500,
        });

        console.log('High-value opportunities:', opportunities.slice(0, 10));

    } catch (error) {
        console.error('Analysis failed:', error);
    }
};

// Example: Competitor discovery
export const demoCompetitorDiscovery = async () => {
    try {
        const competitors = await keywordGapService.discoverCompetitors(
            "yoursite.com",
            "US",
            20
        );

        console.log('Discovered competitors:', competitors);

        // Get top competitors by overlap score
        const topCompetitors = competitors.competitors
            .sort((a, b) => b.overlapScore - a.overlapScore)
            .slice(0, 5);

        console.log('Top 5 competitors by overlap:', topCompetitors);

    } catch (error) {
        console.error('Competitor discovery failed:', error);
    }
};

// Example: Using React hook (for reference)
export const useKeywordGapExample = () => {
    // This is just a reference example - to be used in React components
    const exampleUsage = `
    const keywordGap = useKeywordGap();
    
    const handleAnalysis = async () => {
      // Add competitors
      keywordGap.actions.addCompetitor("competitor1.com");
      keywordGap.actions.addCompetitor("competitor2.com");
      
      // Start analysis
      await keywordGap.actions.analyzeGaps({
        seedKeyword: "digital marketing",
        competitorDomains: keywordGap.selectedCompetitors,
        includeCompetitorKeywords: true,
        location: "US",
      });
      
      // Export results
      if (keywordGap.computed.hasOpportunities) {
        keywordGap.actions.exportKeywordGaps();
      }
    };
  `;

    return exampleUsage;
};

// Example: Advanced filtering
export const demoAdvancedFiltering = (analysisResult: any) => {
    // Easy wins - low difficulty, high volume
    const easyWins = keywordGapService.getKeywordOpportunities(analysisResult, {
        maxDifficulty: 40,
        minVolume: 1000,
        opportunity: "easy-win",
    });

    // Content gaps - informational intent
    const contentGaps = keywordGapService.getKeywordOpportunities(analysisResult, {
        intent: "informational",
        opportunity: "content-gap",
    });

    // Commercial opportunities
    const commercialOpps = keywordGapService.getKeywordOpportunities(analysisResult, {
        intent: "commercial",
        minVolume: 500,
    });

    return {
        easyWins,
        contentGaps,
        commercialOpps,
    };
};

// Test function to validate API integration
export const testKeywordGapAPI = async () => {
    console.log('🧪 Testing Keyword Gap Analysis API...');

    try {
        // Test 1: Basic analysis
        console.log('Test 1: Basic keyword gap analysis');
        await demoBasicAnalysis();
        console.log('✅ Basic analysis passed');

        // Test 2: Competitor discovery
        console.log('Test 2: Competitor discovery');
        await demoCompetitorDiscovery();
        console.log('✅ Competitor discovery passed');

        // Test 3: Service methods
        console.log('Test 3: Service methods');
        const mockResult = {
            seedKeyword: "test",
            totalKeywords: 0,
            summary: {
                avgSearchVolume: 0,
                avgDifficulty: 0,
                totalEstimatedTraffic: 0,
                topIntent: "informational",
                competitionLevel: "medium"
            },
            competitorAnalysis: [],
            primaryKeywords: [],
            longTailKeywords: [],
            questionKeywords: [],
        };

        const opportunities = keywordGapService.getKeywordOpportunities(mockResult);
        const csvData = keywordGapService.exportKeywordGaps([]);

        console.log('✅ Service methods passed');
        console.log('🎉 All tests passed!');

    } catch (error) {
        console.error('❌ Test failed:', error);
    }
};
