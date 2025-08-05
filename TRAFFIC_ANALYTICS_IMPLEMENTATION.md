# Traffic Analytics Implementation Guide

## Overview

This guide explains the complete implementation of the Traffic Analytics feature based on the TRAFFIC_ANALYTICS_API.md specification.

## Components Created

### 1. Types Definition

- **File**: `src/types/traffic-analytics.type.ts`
- **Purpose**: Complete TypeScript interfaces for all API requests and responses
- **Features**:
  - Request/Response types for all endpoints
  - Local Redux state types
  - Google Analytics integration types

### 2. Service Layer

- **File**: `src/services/traffic-analytics.service.ts`
- **Purpose**: API communication layer extending BaseService
- **Features**:
  - All CRUD operations for traffic analytics
  - Google Analytics integration management
  - Custom metrics queries
  - Error handling

### 3. Redux Slice

- **File**: `src/stores/slices/traffic-analytics.slice.ts`
- **Purpose**: State management for traffic analytics
- **Features**:
  - Complete async thunks for all API endpoints
  - Loading states for different operations
  - Error handling
  - Filters management
  - Selectors for easy data access

### 4. Updated React Component

- **File**: `src/app/(admin)/traffic/page.tsx`
- **Purpose**: Main traffic analytics dashboard
- **Features**:
  - Real-time data display
  - Period comparisons
  - Traffic sources analysis
  - Page performance metrics
  - User behavior insights
  - Integration status management

## Installation Steps

### 1. Install Dependencies

```bash
npm install @google-analytics/data
```

### 2. Environment Variables

Add to your `.env.local`:

```bash
# Google Analytics Configuration
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=/path/to/service-account-key.json
# OR
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS={"type":"service_account",...}
```

### 3. Database Schema

You'll need to create tables for:

- `google_analytics_integrations`
- `traffic_data_cache`
- `sync_logs`

Example schema:

```sql
CREATE TABLE google_analytics_integrations (
  id VARCHAR(255) PRIMARY KEY,
  project_id VARCHAR(255) NOT NULL,
  property_id VARCHAR(255) NOT NULL,
  credentials JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE traffic_data_cache (
  id VARCHAR(255) PRIMARY KEY,
  project_id VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_project_date (project_id, date)
);
```

## API Implementation

### Required API Routes

1. **Traffic Overview**

   - `GET /api/v1/projects/[projectId]/traffic-analytics/overview`
   - See `TRAFFIC_ANALYTICS_EXAMPLE_API.md` for implementation

2. **Page Performance**

   - `GET /api/v1/projects/[projectId]/traffic-analytics/pages`

3. **Traffic Sources**

   - `GET /api/v1/projects/[projectId]/traffic-analytics/sources`

4. **User Behavior**

   - `GET /api/v1/projects/[projectId]/traffic-analytics/user-behavior`

5. **Real-time Analytics**

   - `GET /api/v1/projects/[projectId]/traffic-analytics/real-time`

6. **Data Synchronization**

   - `POST /api/v1/projects/[projectId]/traffic-analytics/sync`

7. **Integration Management**
   - `POST /api/v1/integrations/google/analytics`
   - `GET /api/v1/projects/[projectId]/traffic-analytics/integration/status`
   - `DELETE /api/v1/projects/[projectId]/traffic-analytics/integration`

## Usage Examples

### 1. Basic Usage in Component

```tsx
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  fetchTrafficOverview,
  selectTrafficOverview,
  selectTrafficAnalyticsLoading,
} from "@/stores/slices/traffic-analytics.slice";

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const overview = useAppSelector(selectTrafficOverview);
  const loading = useAppSelector(selectTrafficAnalyticsLoading);

  useEffect(() => {
    dispatch(
      fetchTrafficOverview({
        projectId: "project-id",
        request: { period: "30d" },
      })
    );
  }, []);

  if (loading.overview) return <Spin />;

  return <div>Sessions: {overview?.totalSessions}</div>;
};
```

### 2. Setting Up Google Analytics Integration

```tsx
import { setupGoogleAnalyticsIntegration } from "@/stores/slices/traffic-analytics.slice";

const setupIntegration = () => {
  dispatch(
    setupGoogleAnalyticsIntegration({
      integration: {
        projectId: "your-project-id",
        propertyId: "123456789",
        credentials: {
          // Google service account credentials
        },
      },
    })
  );
};
```

### 3. Real-time Updates

```tsx
import { fetchRealTimeAnalytics } from "@/stores/slices/traffic-analytics.slice";

// Set up interval for real-time updates
useEffect(() => {
  const interval = setInterval(() => {
    if (selectedProject) {
      dispatch(fetchRealTimeAnalytics({ projectId: selectedProject }));
    }
  }, 30000); // Update every 30 seconds

  return () => clearInterval(interval);
}, [selectedProject]);
```

## Google Analytics Setup

### 1. Create Service Account

1. Go to Google Cloud Console
2. Create a new service account
3. Download the JSON key file
4. Grant Analytics Viewer permissions

### 2. GA4 Property Access

1. Go to Google Analytics
2. Admin → Property → Property Access Management
3. Add the service account email with Viewer permissions

### 3. Get Property ID

1. Admin → Property → Property Details
2. Copy the Property ID (numeric)

## Features Implemented

### ✅ Completed Features

- [x] Complete TypeScript types
- [x] Service layer with all API methods
- [x] Redux slice with async thunks
- [x] Updated React component
- [x] Loading and error states
- [x] Period comparisons
- [x] Real-time analytics
- [x] Integration management
- [x] Responsive design
- [x] Data synchronization

### 🚧 Pending Implementation

- [ ] Backend API routes
- [ ] Google Analytics service integration
- [ ] Database schema and migrations
- [ ] Chart components (Chart.js/Recharts)
- [ ] Export functionality
- [ ] Advanced filtering
- [ ] Automated alerts
- [ ] Performance optimizations

## Next Steps

1. **Implement Backend APIs**: Use the example in `TRAFFIC_ANALYTICS_EXAMPLE_API.md`
2. **Google Analytics Integration**: Create the GoogleAnalyticsService class
3. **Charts**: Add interactive charts using Chart.js or Recharts
4. **Testing**: Add unit and integration tests
5. **Documentation**: Add JSDoc comments
6. **Performance**: Implement caching and pagination
7. **Monitoring**: Add error tracking and performance monitoring

## Error Handling

The implementation includes comprehensive error handling:

- Network errors
- API rate limits
- Invalid credentials
- Missing integrations
- Data validation errors

All errors are displayed to users with appropriate messages and actions.

## Performance Considerations

- Data caching to reduce API calls
- Lazy loading of components
- Pagination for large datasets
- Real-time updates only when needed
- Debounced filter changes
- Optimized Redux selectors

## Security

- API authentication and authorization
- Secure credential storage
- Input validation
- Rate limiting
- CORS protection
- Data encryption for sensitive information
