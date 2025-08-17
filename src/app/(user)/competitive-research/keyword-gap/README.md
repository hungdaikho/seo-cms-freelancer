# Keyword Gap Analysis Page

## Overview

This page provides comprehensive keyword gap analysis functionality, comparing your domain with competitors to identify keyword opportunities and overlaps.

## Features

### 1. Domain Comparison

- Target domain input
- Up to 3 competitor domains
- Real-time keyword gap analysis

### 2. Filtering Options

- Country/Database selection (US, UK, CA, AU, DE, FR, ES, IT, BR, IN)
- Device targeting (Desktop/Mobile)
- Database selection (All, Google, Bing)
- Timeframe filtering (7d, 30d, 90d)

### 3. Analysis Types

- **Organic Keywords**: Organic search keyword analysis
- **Paid Keywords**: Coming soon
- **PLA Keywords**: Coming soon

### 4. Visual Insights

- **Venn Diagram**: Shows keyword overlap between domains
- **Top Opportunities**: Lists high-value missing/weak keywords
- **Keyword Statistics**: Shared, Missing, Weak, Strong, Untapped, Unique counts

### 5. Detailed Results Table

- Keyword listing with search intent
- Position comparison across domains
- Search volume, keyword difficulty (KD), and CPC data
- Status categorization (shared, missing, weak, strong, etc.)

## Data Integration

### Redux State Management

The page uses Redux slices for state management:

- `competitive.slice.ts` - Handles all competitive analysis data
- Actions: `compareKeywordGaps`, `getKeywordOverlap`
- State: loading states, error handling, filters

### API Services

Integrates with `competitive.service.ts`:

- Domain overview analysis
- Keyword gap comparison
- Keyword overlap analysis
- Link building prospects

## Usage

1. **Setup**: Enter your target domain
2. **Add Competitors**: Input up to 3 competitor domains
3. **Configure Filters**: Select country, device, database preferences
4. **Analyze**: Click "Compare" to run the analysis
5. **Review Results**: Examine the visual insights and detailed keyword data
6. **Export**: Download results for further analysis

## Component Structure

```
KeywordGap/
├── page.tsx (Main component)
├── KeywordGap.module.scss (Styles)
└── README.md (This file)
```

## State Management

The component manages both local and global state:

**Local State:**

- `targetDomain` - The main domain being analyzed
- `keywordFilter` - Search filter for keyword table
- `selectedTab` - Active analysis type (organic/paid/pla)

**Global State (Redux):**

- `keywordGapAnalysis` - Main analysis results
- `keywordOverlap` - Overlap visualization data
- `loading` - Loading states for different operations
- `error` - Error handling for failed requests
- `filters` - Global filter settings

## Error Handling

- Network error handling with user-friendly messages
- Loading states during API calls
- Empty state handling when no data is available
- Form validation for required fields

## Performance Considerations

- Lazy loading of heavy analysis data
- Pagination for large keyword datasets
- Debounced search filtering
- Optimized re-renders with memoization

## Future Enhancements

1. **Export Functionality**: CSV/PDF export of results
2. **Keyword Lists**: Save keywords to custom lists
3. **Historical Tracking**: Track changes over time
4. **Advanced Filters**: More granular filtering options
5. **Competitor Suggestions**: Auto-suggest competitors based on domain
