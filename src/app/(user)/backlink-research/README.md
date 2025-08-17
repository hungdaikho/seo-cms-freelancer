# Backlink Research Module

## Overview

Complete backlink research and analysis module for the SEO CMS platform, implementing comprehensive backlink tracking, domain analysis, and competitive research features.

## Features

### 🔗 Domain Backlink Analysis

- **Domain Overview**: Complete backlink metrics including authority scores, referring domains, and backlink counts
- **Authority Metrics**: Domain rating, authority scores from multiple sources (Ahrefs, Moz, SEMrush)
- **Backlink Types**: Analysis of text, image, form, and frame backlinks
- **Geographic Distribution**: Country-wise backlink distribution with visual charts
- **TLD Analysis**: Top-level domain distribution analysis

### 📊 Project Backlink Management

- **Backlink Tracking**: Add, update, and monitor backlinks for projects
- **Status Management**: Track active, lost, broken, and redirected links
- **Analytics Dashboard**: Comprehensive analytics with trends and insights
- **Link Attributes**: Follow/nofollow, sponsored, UGC link analysis
- **Historical Data**: Timeline tracking with growth/loss metrics

### 🎯 Competitive Analysis

- **Gap Analysis**: Compare backlink profiles against competitors
- **Link Prospects**: Identify high-value link building opportunities
- **Authority Comparison**: Side-by-side authority score comparisons
- **Opportunity Scoring**: AI-powered link opportunity assessment

### 📈 Visual Analytics

- **Interactive Charts**: Real-time data visualization with Recharts
- **Timeline Views**: Historical backlink growth and loss tracking
- **Distribution Charts**: Authority score, country, and TLD distributions
- **Progress Tracking**: Visual progress bars and trend indicators

## Architecture

### Files Structure

```
src/
├── types/
│   └── backlink-research.type.ts     # TypeScript definitions
├── services/
│   └── backlink-research.service.ts  # API service layer
├── stores/slices/
│   └── backlik-research.slice.ts     # Redux state management
├── hooks/
│   └── useBacklinkResearch.ts        # Custom React hook
├── app/(user)/backlink-research/
│   ├── page.tsx                      # Main page component
│   └── backlinks.module.scss         # Styling
└── components/test/
    └── BacklinkTestComponent.tsx     # Test component
```

### Technology Stack

- **Frontend**: React 18, TypeScript, Next.js
- **State Management**: Redux Toolkit
- **UI Framework**: Ant Design
- **Charts**: Recharts
- **Styling**: SCSS Modules
- **HTTP Client**: Axios

## Usage

### Basic Setup

1. **Import the hook**:

```tsx
import { useBacklinkResearch } from "@/hooks/useBacklinkResearch";
```

2. **Use in component**:

```tsx
const {
  domainOverview,
  backlinkAnalytics,
  isLoading,
  initializeDomainAnalysis,
} = useBacklinkResearch();
```

3. **Initialize data**:

```tsx
useEffect(() => {
  initializeDomainAnalysis("example.com", false);
}, []);
```

### Advanced Usage

#### Domain Analysis

```tsx
// Analyze domain with subdomains
await initializeDomainAnalysis("example.com", true);

// Get domain authority metrics
await getDomainAuthority("example.com");
```

#### Project Backlink Management

```tsx
// Initialize project analysis
await initializeProjectAnalysis("project-id");

// Add new backlink
await addBacklink({
  projectId: "project-id",
  sourceUrl: "https://example.com/page",
  targetUrl: "https://mysite.com/page",
  anchorText: "Example Link",
  linkType: "dofollow",
  authorityScore: 75,
  status: "active",
});

// Update backlink status
await updateBacklinkData({
  projectId: "project-id",
  backlinkId: "backlink-id",
  status: "broken",
});
```

#### Competitive Analysis

```tsx
// Perform gap analysis
await performGapAnalysis(
  "target-domain.com",
  ["competitor1.com", "competitor2.com"],
  { minAuthorityScore: 30 }
);
```

## API Integration

### Service Methods

#### Domain Overview

- `getDomainOverview(params)` - Get complete domain backlink metrics
- `getDomainAuthority(domain)` - Get authority scores from multiple sources

#### Project Management

- `getProjectBacklinks(params)` - Get project backlinks with pagination
- `addBacklinkToProject(params)` - Add new backlink to project
- `updateBacklink(params)` - Update existing backlink
- `deleteBacklink(projectId, backlinkId)` - Remove backlink

#### Analytics

- `getBacklinkAnalytics(params)` - Get comprehensive analytics
- `getBacklinkTimeline(projectId, params)` - Get historical timeline data

#### Gap Analysis

- `compareBacklinkProfiles(params)` - Compare with competitors
- `getLinkBuildingProspects(params)` - Get link building opportunities

### Request/Response Examples

#### Domain Overview Request

```typescript
const response = await backlinkResearchService.getDomainOverview({
  domain: "example.com",
  includeSubdomains: false,
});
```

#### Domain Overview Response

```typescript
{
  domain: "example.com",
  metrics: {
    pageAuthority: "64.3K",
    domainAuthority: "64.3K",
    monthlyVisits: "64.3K",
    spamScore: "2.1"
  },
  authorityScore: 80,
  backlinks: {
    total: 200000,
    totalDomains: 15000,
    newBacklinks: 2700,
    lostBacklinks: 150
  },
  topCountries: [
    {
      country: "United States",
      percentage: 45,
      count: 90000
    }
  ]
}
```

## State Management

### Redux Store Structure

```typescript
interface BacklinkResearchState {
  // Data
  domainOverview: DomainBacklinkMetrics | null;
  domainAuthority: AuthorityMetrics | null;
  projectBacklinks: PaginatedBacklinkResponse<ProjectBacklink> | null;
  backlinkAnalytics: BacklinkAnalytics | null;

  // UI State
  currentDomain: string;
  includeSubdomains: boolean;
  selectedProjectId: string | null;
  filters: FilterState;

  // Loading States
  loading: Record<string, boolean>;

  // Error States
  errors: Record<string, string | null>;
}
```

### Available Actions

```typescript
// UI Actions
setCurrentDomain(domain: string)
setIncludeSubdomains(include: boolean)
setSelectedProjectId(projectId: string | null)
setFilters(filters: Partial<FilterState>)

// Data Actions
fetchDomainOverview(params: GetDomainOverviewRequest)
fetchProjectBacklinks(params: GetProjectBacklinksRequest)
addBacklinkToProject(params: AddBacklinkRequest)
updateBacklink(params: UpdateBacklinkRequest)
deleteBacklink({ projectId, backlinkId })

// Clear Actions
clearDomainData()
clearProjectData()
clearGapAnalysisData()
resetState()
```

## Components

### Main Page Component

- **Location**: `src/app/(user)/backlink-research/page.tsx`
- **Features**: Complete backlink analysis dashboard with interactive charts
- **Responsive**: Mobile-friendly design with adaptive layouts

### Key Features:

1. **Domain Metrics Cards** - Overview of key domain metrics
2. **Interactive Charts** - Referral domains, backlinks timeline
3. **Authority Analysis** - Authority score with distribution breakdown
4. **Geographic Analysis** - Country-wise backlink distribution
5. **Link Analysis** - Anchor text, top pages, TLD distribution
6. **Loading States** - Skeleton loading and error handling

### Test Component

- **Location**: `src/components/test/BacklinkTestComponent.tsx`
- **Purpose**: Development testing and API integration verification
- **Features**: State inspection, action testing, error debugging

## Styling

### SCSS Modules

- **File**: `backlinks.module.scss`
- **Features**:
  - Responsive design (mobile, tablet, desktop)
  - Dark theme support
  - Smooth animations and transitions
  - Custom scrollbars
  - Loading and error states

### Key Classes:

- `.backlinksPage` - Main container
- `.chartCard` - Chart containers with hover effects
- `.loadingContainer` - Loading state styling
- `.errorContainer` - Error state styling
- `.progressBar` - Animated progress bars

## Error Handling

### Service Level

```typescript
try {
  const data = await backlinkResearchService.getDomainOverview(params);
  return data;
} catch (error) {
  if (error.response?.status === 401) {
    // Handle authentication error
  } else if (error.response?.status === 429) {
    // Handle rate limiting
  }
  throw error;
}
```

### Component Level

```tsx
const ErrorComponent = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <div className={styles.errorContainer}>
    <div className={styles.errorMessage}>{error}</div>
    <Button onClick={onRetry}>Retry</Button>
  </div>
);
```

### Hook Level

```typescript
const { getError, isLoading } = useBacklinkResearch();

if (getError("domainOverview")) {
  // Handle specific error
}

if (isLoading()) {
  // Show loading state
}
```

## Performance Optimization

### Data Caching

- Redux state persistence
- Selective data updates
- Optimistic updates for better UX

### Loading Strategies

- Skeleton loading screens
- Progressive data loading
- Error boundaries for fault tolerance

### Chart Optimization

- Memoized chart data processing
- Responsive chart sizing
- Efficient re-rendering

## Testing

### Unit Tests

```typescript
// Test service methods
describe("BacklinkResearchService", () => {
  it("should fetch domain overview", async () => {
    const result = await service.getDomainOverview({
      domain: "example.com",
      includeSubdomains: false,
    });
    expect(result).toBeDefined();
  });
});
```

### Integration Tests

```typescript
// Test hooks
describe("useBacklinkResearch", () => {
  it("should initialize domain analysis", async () => {
    const { result } = renderHook(() => useBacklinkResearch());
    await act(async () => {
      await result.current.initializeDomainAnalysis("example.com");
    });
    expect(result.current.domainOverview).toBeDefined();
  });
});
```

## API Documentation

Detailed API documentation is available in:

- **File**: `src/services/BACKLINK.md`
- **Endpoints**: 20+ endpoints covering all backlink operations
- **Rate Limits**: Tiered based on subscription plan
- **Authentication**: JWT token required for all endpoints

## Future Enhancements

### Planned Features

1. **Real-time Monitoring** - WebSocket integration for live updates
2. **AI-Powered Insights** - Machine learning recommendations
3. **Bulk Operations** - Batch backlink management
4. **Advanced Filtering** - Complex query builder
5. **Export/Import** - CSV, Excel data exchange
6. **Team Collaboration** - Multi-user project management

### Performance Improvements

1. **Virtual Scrolling** - For large datasets
2. **Data Virtualization** - Lazy loading strategies
3. **Caching Layer** - Redis integration
4. **CDN Integration** - Static asset optimization

## Contributing

1. Follow TypeScript strict mode
2. Use existing patterns for consistency
3. Write comprehensive tests
4. Update documentation
5. Follow component composition patterns

## Dependencies

### Core Dependencies

- `@reduxjs/toolkit` - State management
- `antd` - UI components
- `recharts` - Data visualization
- `axios` - HTTP client

### Development Dependencies

- `@types/react` - TypeScript definitions
- `sass` - SCSS processing
- `eslint` - Code linting
- `prettier` - Code formatting

## License

This module is part of the SEO CMS platform and follows the project's licensing terms.
