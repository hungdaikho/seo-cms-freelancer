// Test file to demonstrate the new global search functionality
import { searchFeatures, NavigationFeature } from '@/utils/navigation-features';

console.log('=== Testing Global Search Functionality ===');

// Test 1: Search for SEO features
console.log('\n1. Search for "seo":');
const seoResults = searchFeatures('seo');
seoResults.forEach(result => {
    console.log(`- ${result.title} (${result.category})`);
});

// Test 2: Search for keyword-related features
console.log('\n2. Search for "keyword":');
const keywordResults = searchFeatures('keyword');
keywordResults.forEach(result => {
    console.log(`- ${result.title} (${result.category})`);
});

// Test 3: Search for traffic features
console.log('\n3. Search for "traffic":');
const trafficResults = searchFeatures('traffic');
trafficResults.forEach(result => {
    console.log(`- ${result.title} (${result.category})`);
});

// Test 4: Search for content features
console.log('\n4. Search for "content":');
const contentResults = searchFeatures('content');
contentResults.forEach(result => {
    console.log(`- ${result.title} (${result.category})`);
});

// Test 5: Search for specific feature names
console.log('\n5. Search for "position tracking":');
const positionResults = searchFeatures('position tracking');
positionResults.forEach(result => {
    console.log(`- ${result.title} (${result.category}) -> ${result.route}`);
});

console.log('\n=== Search Test Complete ===');

export { };
