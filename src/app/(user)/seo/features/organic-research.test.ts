import { organicResearchService } from '@/services/organic-research.service';

/**
 * Test file for Organic Research Service
 * Run this to test the service functionality
 */
export const testOrganicResearchService = async () => {
    const testDomain = 'example.com';
    const testCountry = 'US';

    console.log('🧪 Testing Organic Research Service...');

    try {
        // Test 1: Domain Analysis
        console.log('\n📊 Testing Domain Analysis...');
        const domainAnalysis = await organicResearchService.analyzeDomain(testDomain, testCountry);
        console.log('✅ Domain Analysis Result:', domainAnalysis);

        // Test 2: Organic Keywords
        console.log('\n🔍 Testing Organic Keywords...');
        const keywords = await organicResearchService.getOrganicKeywords(testDomain, {
            country: testCountry,
            limit: 10,
            sortBy: 'position',
            sortOrder: 'asc',
        });
        console.log('✅ Keywords Result:', keywords);

        // Test 3: Competitors
        console.log('\n🏆 Testing Competitors...');
        const competitors = await organicResearchService.getCompetitors(testDomain, {
            country: testCountry,
            limit: 5,
        });
        console.log('✅ Competitors Result:', competitors);

        // Test 4: Top Pages
        console.log('\n📄 Testing Top Pages...');
        const topPages = await organicResearchService.getTopPages(testDomain, {
            country: testCountry,
            limit: 10,
            sortBy: 'traffic',
        });
        console.log('✅ Top Pages Result:', topPages);

        // Test 5: API Limits
        console.log('\n📈 Testing API Limits...');
        const apiLimits = await organicResearchService.getApiLimits();
        console.log('✅ API Limits Result:', apiLimits);

        // Test 6: Supported Countries
        console.log('\n🌍 Testing Supported Countries...');
        const supportedCountries = organicResearchService.getSupportedCountries();
        console.log('✅ Supported Countries:', supportedCountries.slice(0, 5), '...and more');

        console.log('\n🎉 All tests completed successfully!');
        return true;

    } catch (error) {
        console.error('❌ Test failed:', error);
        return false;
    }
};

// Usage example
export const runServiceTests = () => {
    console.log('Starting Organic Research Service tests...');
    testOrganicResearchService()
        .then((success) => {
            if (success) {
                console.log('✅ All service tests passed!');
            } else {
                console.log('❌ Some tests failed!');
            }
        })
        .catch((error) => {
            console.error('❌ Test execution failed:', error);
        });
};
