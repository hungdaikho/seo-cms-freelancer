# Domain Overview Feature Documentation

## Tổng quan

Tính năng Domain Overview cho phép người dùng phân tích và theo dõi các chỉ số SEO quan trọng của domain, bao gồm:

- Domain Authority Score
- Organic Traffic & Keywords
- Competitors Analysis
- Top Keywords Performance
- Content Topics Analysis
- Backlinks & Referring Domains

## Cấu trúc files đã tạo

### 1. Service Layer

- `src/services/domain.service.ts` - Service để gọi API domain overview

### 2. State Management

- `src/stores/slices/domain.slice.ts` - Redux slice với createAsyncThunk
- `src/stores/selectors/domain.selectors.ts` - Selectors cho domain state
- `src/stores/hooks/useDomain.ts` - Custom hook để sử dụng domain features

### 3. Components

- `src/app/(admin)/projects/features/domain.tsx` - Component chính (đã cập nhật)
- `src/app/(admin)/projects/components/DomainAnalysisDetail.tsx` - Component hiển thị chi tiết

### 4. API Endpoints (Mock)

- `src/app/api/v1/seo/domain-overview/[domain]/route.ts` - Get domain overview
- `src/app/api/v1/seo/domain-overview/top-keywords/[domain]/route.ts` - Get top keywords
- `src/app/api/v1/seo/domain-overview/competitors/[domain]/route.ts` - Get competitors
- `src/app/api/v1/seo/domain-overview/topics/[domain]/route.ts` - Get content topics
- `src/app/api/v1/seo/domain-overview/authority/[domain]/route.ts` - Get domain authority

## Cách sử dụng

### 1. Import và sử dụng hook

```tsx
import { useDomain } from '@/stores/hooks';

const MyComponent = () => {
  const {
    overview,
    topKeywords,
    competitors,
    authority,
    overviewLoading,
    analyzeDomain,
    addDomain
  } = useDomain();

  // Phân tích domain
  const handleAnalyze = async () => {
    await analyzeDomain('example.com', 'US');
  };

  return (
    // JSX content
  );
};
```

### 2. API Endpoints Usage

#### Get Domain Overview

```
GET /api/v1/seo/domain-overview/example.com?includeSubdomains=false
```

#### Get Top Keywords

```
GET /api/v1/seo/domain-overview/top-keywords/example.com?limit=100&country=US
```

#### Get Competitors

```
GET /api/v1/seo/domain-overview/competitors/example.com?limit=50&country=US
```

#### Get Content Topics

```
GET /api/v1/seo/domain-overview/topics/example.com?limit=50
```

#### Get Domain Authority

```
GET /api/v1/seo/domain-overview/authority/example.com
```

## Features hoàn thiện

### ✅ Đã hoàn thành:

1. **Service Layer** - API calls với proper error handling
2. **State Management** - Redux slice với createAsyncThunk
3. **Custom Hook** - useDomain hook với tất cả actions và selectors
4. **Component Integration** - Domain component đã tích hợp với state management
5. **Mock API** - Đầy đủ mock endpoints cho testing
6. **Detail Component** - Component hiển thị chi tiết analysis
7. **Loading & Error States** - Proper loading và error handling
8. **Responsive Design** - Mobile-friendly layout

### 🔧 Available Actions:

- `analyzeDomain(domain, country)` - Phân tích toàn bộ domain
- `getDomainOverview(params)` - Lấy overview data
- `getTopKeywords(params)` - Lấy top keywords
- `getCompetitors(params)` - Lấy competitors
- `getTopics(params)` - Lấy content topics
- `getDomainAuthority(domain)` - Lấy authority scores
- `addDomain(domain)` - Thêm domain vào monitoring
- `removeDomain(domain)` - Xóa domain khỏi monitoring

### 📊 Available Data:

- Domain Overview (authority, traffic, keywords, backlinks)
- Top Keywords (position, volume, traffic, difficulty, trend)
- Competitors (competition level, common keywords, traffic gap)
- Content Topics (keywords count, traffic, opportunities)
- Domain Authority (Moz, Ahrefs, SEMrush scores)
- Traffic Trends (12 months data)
- Top Countries (traffic distribution)

## Testing

### Test với mock data:

1. Thêm domain `example.com` hoặc `google.com` để xem mock data có sẵn
2. Thử các domain khác để xem mock data được generate tự động
3. Kiểm tra loading states và error handling

### Test API endpoints:

```bash
# Test domain overview
curl http://localhost:3000/api/v1/seo/domain-overview/example.com

# Test top keywords
curl http://localhost:3000/api/v1/seo/domain-overview/top-keywords/example.com?limit=10

# Test competitors
curl http://localhost:3000/api/v1/seo/domain-overview/competitors/example.com

# Test topics
curl http://localhost:3000/api/v1/seo/domain-overview/topics/example.com

# Test domain authority
curl http://localhost:3000/api/v1/seo/domain-overview/authority/example.com
```

## Tích hợp với API thực

Để tích hợp với API thực tế (SEMrush, Ahrefs, Moz), chỉ cần:

1. Cập nhật `baseUrl` trong `domain.service.ts`
2. Thêm authentication headers trong `BaseService`
3. Cập nhật response types nếu cần
4. Xóa hoặc thay thế mock API endpoints

## Error Handling

Tất cả API calls đều có proper error handling:

- Network errors
- API rate limits
- Invalid domain format
- Authentication errors
- Server errors

Errors được display trong UI và có thể access qua selectors:

```tsx
const { overviewError, hasAnyError, allErrors } = useDomain();
```

## Performance Optimization

- API calls được thực hiện parallel khi có thể
- Data được cache trong Redux store
- Loading states riêng biệt cho từng API call
- Debounced search input (có thể thêm)
- Pagination support cho large datasets

Tính năng Domain Overview đã được hoàn thiện đầy đủ và sẵn sàng sử dụng!
