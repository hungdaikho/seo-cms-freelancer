import { topicResearchService } from "@/services/topic-research.service";
import {
    TopicResearchRequest,
    BatchAnalysisRequest,
    TrendingTopicsParams,
} from "@/types/topic-research.type";

export class TopicResearchTestUtils {
    /**
     * Test basic topic research functionality
     */
    static async testBasicTopicResearch(keyword: string = "digital marketing", country: string = "US") {
        console.log("🧪 Testing Basic Topic Research...");

        try {
            const params: TopicResearchRequest = {
                seedKeyword: keyword,
                country,
                industry: "technology",
                contentType: "blog",
                limit: 20,
            };

            const result = await topicResearchService.generateTopicIdeas(params);
            console.log("✅ Topic Ideas Generated:", result.topicIdeas.length);
            return result;
        } catch (error) {
            console.error("❌ Basic Topic Research Failed:", error);
            throw error;
        }
    }

    /**
     * Test related topics functionality
     */
    static async testRelatedTopics(topic: string = "seo optimization", country: string = "US") {
        console.log("🧪 Testing Related Topics...");

        try {
            const result = await topicResearchService.getRelatedTopics(topic, {
                country,
                limit: 15,
            });
            console.log("✅ Related Topics Found:", result.relatedTopics.length);
            return result;
        } catch (error) {
            console.error("❌ Related Topics Test Failed:", error);
            throw error;
        }
    }

    /**
     * Test topic questions functionality
     */
    static async testTopicQuestions(topic: string = "content marketing", country: string = "US") {
        console.log("🧪 Testing Topic Questions...");

        try {
            const result = await topicResearchService.getTopicQuestions(topic, {
                country,
                limit: 25,
            });
            console.log("✅ Questions Found:", result.questions.length);
            return result;
        } catch (error) {
            console.error("❌ Topic Questions Test Failed:", error);
            throw error;
        }
    }

    /**
     * Test batch analysis functionality
     */
    static async testBatchAnalysis(topics: string[] = ["seo", "content marketing", "social media"], country: string = "US") {
        console.log("🧪 Testing Batch Analysis...");

        try {
            const params: BatchAnalysisRequest = {
                topics,
                country,
                includeQuestions: true,
            };

            const result = await topicResearchService.batchAnalysis(params);
            console.log("✅ Batch Analysis Completed for", result.totalTopics, "topics");
            return result;
        } catch (error) {
            console.error("❌ Batch Analysis Test Failed:", error);
            throw error;
        }
    }

    /**
     * Test trending topics functionality
     */
    static async testTrendingTopics(category: string = "technology", country: string = "US") {
        console.log("🧪 Testing Trending Topics...");

        try {
            const params: TrendingTopicsParams = {
                category,
                country,
                limit: 15,
            };

            const result = await topicResearchService.getTrendingTopics(params);
            console.log("✅ Trending Topics Found:", result.trendingTopics.length);
            return result;
        } catch (error) {
            console.error("❌ Trending Topics Test Failed:", error);
            throw error;
        }
    }

    /**
     * Test API status functionality
     */
    static async testAPIStatus() {
        console.log("🧪 Testing API Status...");

        try {
            const result = await topicResearchService.getAPIStatus();
            console.log("✅ API Status Retrieved:", result.hasRealData ? "Real Data Available" : "Mock Data");
            return result;
        } catch (error) {
            console.error("❌ API Status Test Failed:", error);
            throw error;
        }
    }

    /**
     * Test keyword demo functionality
     */
    static async testKeywordDemo(keyword: string = "digital marketing", country: string = "US") {
        console.log("🧪 Testing Keyword Demo...");

        try {
            const result = await topicResearchService.getKeywordDemo(keyword, country);
            console.log("✅ Keyword Demo Retrieved for:", result.keyword);
            return result;
        } catch (error) {
            console.error("❌ Keyword Demo Test Failed:", error);
            throw error;
        }
    }

    /**
     * Test comprehensive topic research
     */
    static async testComprehensiveResearch(
        seedKeyword: string = "email marketing",
        country: string = "US",
        industry: string = "marketing"
    ) {
        console.log("🧪 Testing Comprehensive Topic Research...");

        try {
            const result = await topicResearchService.researchTopic(seedKeyword, country, industry, "blog");
            console.log("✅ Comprehensive Research Completed:");
            console.log("  - Topic Ideas:", result.topicIdeas.topicIdeas.length);
            console.log("  - Related Topics:", result.relatedTopics.relatedTopics.length);
            console.log("  - Questions:", result.questions.questions.length);
            return result;
        } catch (error) {
            console.error("❌ Comprehensive Research Test Failed:", error);
            throw error;
        }
    }

    /**
     * Test content opportunities
     */
    static async testContentOpportunities(keyword: string = "social media marketing", country: string = "US") {
        console.log("🧪 Testing Content Opportunities...");

        try {
            const result = await topicResearchService.getContentOpportunities(keyword, country);
            console.log("✅ Content Opportunities Retrieved:");
            console.log("  - Blog Posts:", result.demo.contentOpportunities.blogPosts.length);
            console.log("  - Videos:", result.demo.contentOpportunities.videos.length);
            console.log("  - Social Media:", result.demo.contentOpportunities.socialMedia.length);
            console.log("  - Trending Topics:", result.trending.trendingTopics.length);
            return result;
        } catch (error) {
            console.error("❌ Content Opportunities Test Failed:", error);
            throw error;
        }
    }

    /**
     * Test competitor analysis
     */
    static async testCompetitorAnalysis(
        topics: string[] = ["ppc advertising", "google ads", "facebook ads"],
        country: string = "US"
    ) {
        console.log("🧪 Testing Competitor Analysis...");

        try {
            const result = await topicResearchService.analyzeCompetitorTopics(topics, country, true);
            console.log("✅ Competitor Analysis Completed for", result.totalTopics, "topics");
            return result;
        } catch (error) {
            console.error("❌ Competitor Analysis Test Failed:", error);
            throw error;
        }
    }

    /**
     * Test topic clusters
     */
    static async testTopicClusters(seedKeyword: string = "e-commerce", country: string = "US") {
        console.log("🧪 Testing Topic Clusters...");

        try {
            const result = await topicResearchService.getTopicClusters(seedKeyword, country);
            console.log("✅ Topic Clusters Retrieved:");
            console.log("  - Clusters:", result.clusters.length);
            console.log("  - Related Topics:", result.relatedTopics.relatedTopics.length);
            return result;
        } catch (error) {
            console.error("❌ Topic Clusters Test Failed:", error);
            throw error;
        }
    }

    /**
     * Run all tests sequentially
     */
    static async runAllTests() {
        console.log("🚀 Running All Topic Research API Tests...");
        console.log("=".repeat(50));

        const results = {
            basicTopicResearch: null as any,
            relatedTopics: null as any,
            topicQuestions: null as any,
            batchAnalysis: null as any,
            trendingTopics: null as any,
            apiStatus: null as any,
            keywordDemo: null as any,
            comprehensiveResearch: null as any,
            contentOpportunities: null as any,
            competitorAnalysis: null as any,
            topicClusters: null as any,
        };

        try {
            // Test API Status first
            results.apiStatus = await this.testAPIStatus();
            console.log("-".repeat(30));

            // Test basic functionality
            results.basicTopicResearch = await this.testBasicTopicResearch();
            console.log("-".repeat(30));

            results.relatedTopics = await this.testRelatedTopics();
            console.log("-".repeat(30));

            results.topicQuestions = await this.testTopicQuestions();
            console.log("-".repeat(30));

            results.keywordDemo = await this.testKeywordDemo();
            console.log("-".repeat(30));

            results.trendingTopics = await this.testTrendingTopics();
            console.log("-".repeat(30));

            // Test advanced functionality
            results.batchAnalysis = await this.testBatchAnalysis();
            console.log("-".repeat(30));

            results.comprehensiveResearch = await this.testComprehensiveResearch();
            console.log("-".repeat(30));

            results.contentOpportunities = await this.testContentOpportunities();
            console.log("-".repeat(30));

            results.competitorAnalysis = await this.testCompetitorAnalysis();
            console.log("-".repeat(30));

            results.topicClusters = await this.testTopicClusters();

            console.log("=".repeat(50));
            console.log("🎉 All Tests Completed Successfully!");
            console.log("=".repeat(50));

            return results;
        } catch (error) {
            console.error("💥 Test Suite Failed:", error);
            throw error;
        }
    }

    /**
     * Generate performance report
     */
    static async performanceTest(iterations: number = 5) {
        console.log(`🏃‍♂️ Running Performance Test (${iterations} iterations)...`);

        const timings: number[] = [];

        for (let i = 0; i < iterations; i++) {
            const startTime = Date.now();

            try {
                await this.testBasicTopicResearch(`test keyword ${i}`);
                const endTime = Date.now();
                const duration = endTime - startTime;
                timings.push(duration);
                console.log(`Iteration ${i + 1}: ${duration}ms`);
            } catch (error) {
                console.error(`Iteration ${i + 1} failed:`, error);
            }
        }

        const avgTime = timings.reduce((sum, time) => sum + time, 0) / timings.length;
        const minTime = Math.min(...timings);
        const maxTime = Math.max(...timings);

        console.log("📊 Performance Results:");
        console.log(`  Average: ${avgTime.toFixed(2)}ms`);
        console.log(`  Fastest: ${minTime}ms`);
        console.log(`  Slowest: ${maxTime}ms`);

        return {
            averageTime: avgTime,
            minTime,
            maxTime,
            timings,
        };
    }

    /**
     * Test error handling
     */
    static async testErrorHandling() {
        console.log("🧪 Testing Error Handling...");

        const errorTests = [
            {
                name: "Empty keyword",
                test: () => topicResearchService.generateTopicIdeas({
                    seedKeyword: "",
                    country: "US",
                }),
            },
            {
                name: "Invalid country",
                test: () => topicResearchService.generateTopicIdeas({
                    seedKeyword: "test",
                    country: "INVALID",
                }),
            },
            {
                name: "Non-existent topic",
                test: () => topicResearchService.getRelatedTopics("xyzinvalidtopic123456"),
            },
        ];

        const results = [];

        for (const errorTest of errorTests) {
            try {
                await errorTest.test();
                console.log(`❌ ${errorTest.name}: Expected error but got success`);
                results.push({ name: errorTest.name, success: false, error: "No error thrown" });
            } catch (error) {
                console.log(`✅ ${errorTest.name}: Properly handled error`);
                results.push({ name: errorTest.name, success: true, error: error });
            }
        }

        return results;
    }
}

// Export for use in development/testing
export default TopicResearchTestUtils;
