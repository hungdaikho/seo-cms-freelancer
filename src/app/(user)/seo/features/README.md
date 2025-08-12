# Organic Research Feature

Tính năng Organic Research được xây dựng dựa trên API documentation `ORGANIC_RESEARCH_API.md` để cung cấp các công cụ phân tích SEO organic search toàn diện.

## 🚀 Tính năng chính

### 1. 🔍 Domain Analysis

- Phân tích tổng quan hiệu suất organic search của domain
- Hiển thị số lượng từ khóa, traffic, cost, vị trí trung bình
- Tính toán visibility score

### 2. 📝 Organic Keywords

- Lấy danh sách từ khóa organic mà domain đang rank
- Hỗ trợ sorting, filtering và pagination
- Hiển thị position, search volume, traffic share, difficulty
- Phân loại intent (Commercial, Informational, Navigational, Transactional)

### 3. 🏆 Competitor Discovery

- Phát hiện và phân tích đối thủ cạnh tranh
- Hiển thị competition level, common keywords, traffic
- So sánh hiệu suất với các competitor

### 4. 📄 Top Pages Analysis

- Phân tích các trang có hiệu suất organic tốt nhất
- Hiển thị traffic, keywords count, traffic value
- Top keywords cho mỗi page

### 5. 📊 API Limits Monitoring

- Theo dõi quota usage của third-party APIs (SEMrush, Ahrefs, Moz)
- Hiển thị remaining requests và reset date
- Cảnh báo khi quota sắp hết

## 🛠️ Cấu trúc code

### Services

```typescript
// Service chính để gọi API
import { organicResearchService } from "@/services/organic-research.service";

// Ví dụ sử dụng
const analysis = await organicResearchService.analyzeDomain(
  "example.com",
  "US"
);
const keywords = await organicResearchService.getOrganicKeywords(
  "example.com",
  {
    country: "US",
    limit: 50,
    sortBy: "position",
  }
);
```

### Redux Store

```typescript
// Hooks để sử dụng trong components
import {
  useDomainAnalysis,
  useOrganicKeywords,
  useCompetitors,
  useTopPages,
  useApiLimits,
} from "@/stores/hooks/useOrganicResearch";

// Trong component
const { domainAnalysis, loading, error, analyzeDomain } = useDomainAnalysis();
```

### Components

#### OrganicResearchWidget

Widget nhỏ gọn hiển thị tổng quan organic research:

```tsx
import { OrganicResearchWidget } from "@/app/(admin)/seo/features";

<OrganicResearchWidget selectedProjectId="project-id" />;
```

#### OrganicResearchDashboard

Dashboard toàn diện với tất cả tính năng:

```tsx
import { OrganicResearchDashboard } from "@/app/(admin)/seo/features";

<OrganicResearchDashboard selectedProjectId="project-id" />;
```

#### ApiLimitsWidget

Widget hiển thị API quota:

```tsx
import { ApiLimitsWidget } from "@/app/(admin)/seo/features";

<ApiLimitsWidget size="small" showHeader={false} />;
```

## 📋 API Endpoints

Tất cả endpoints đều tuân theo chuẩn từ `ORGANIC_RESEARCH_API.md`:

- `GET /api/v1/seo/organic-research/domain/{domain}` - Domain analysis
- `GET /api/v1/seo/organic-research/keywords/{domain}` - Organic keywords
- `GET /api/v1/seo/organic-research/competitors/{domain}` - Competitors
- `GET /api/v1/seo/organic-research/top-pages/{domain}` - Top pages
- `GET /api/v1/seo/organic-research/api-limits` - API limits

## 🔧 Configuration

### Supported Countries

Service hỗ trợ 30+ quốc gia, có thể lấy danh sách bằng:

```typescript
const countries = organicResearchService.getSupportedCountries();
```

### Error Handling

- Service tự động fallback về mock data khi API thất bại
- Redux slice xử lý loading states và errors
- Components hiển thị error states thân thiện với user

### Rate Limiting

- Tự động tracking API quota
- Hiển thị warning khi quota thấp
- Headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset

## 🧪 Testing

Chạy test để kiểm tra service:

```typescript
import { runServiceTests } from "@/app/(admin)/seo/features/organic-research.test";

// Trong browser console
runServiceTests();
```

## 📱 Responsive Design

- Components được thiết kế responsive cho mobile/tablet
- Tables có horizontal scroll trên mobile
- Widgets stack vertically trên màn hình nhỏ

## 🔐 Authentication

Tất cả API calls tự động include JWT token từ store:

```typescript
// BaseService tự động thêm Authorization header
headers: {
  "Authorization": `Bearer ${token}`
}
```

## 🎯 Best Practices

1. **Caching**: Redux store cache dữ liệu để tránh gọi API không cần thiết
2. **Pagination**: Sử dụng pagination cho large datasets
3. **Error Boundaries**: Components có error handling tốt
4. **Loading States**: Hiển thị loading indicators rõ ràng
5. **Mock Data**: Fallback data để development không bị block

## 🔄 Updates

Để cập nhật data:

```typescript
// Refresh tất cả data
const { performDomainAnalysis, getOrganicKeywords } = useOrganicResearch();

await performDomainAnalysis("example.com", "US");
await getOrganicKeywords("example.com", { country: "US", limit: 100 });
```

## 📊 Data Flow

```
Component → Hook → Redux Slice → Service → API
                ↓
              Store ← Response ← Mock/Real Data
```

## 🚀 Deployment

1. Đảm bảo server APIs đã được deploy
2. Cập nhật base URL trong config nếu cần
3. Test với real API endpoints
4. Monitor API quotas trong production

---

**Tác giả**: SEO CMS Team  
**Ngày cập nhật**: August 4, 2025  
**Phiên bản**: 1.0.0
