# AI API Usage Guide

## Mô tả chung

API AI cung cấp các endpoint để thực hiện các tác vụ SEO và tối ưu hóa nội dung sử dụng trí tuệ nhân tạo.

## Base URL

```
http://localhost:3001/api/v1/ai
```

## Authentication

Tất cả các endpoint yêu cầu JWT Bearer token trong header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoint chính: `/request`

### URL

```
POST /api/v1/ai/request
```

### Mô tả

Endpoint tổng quát để thực hiện các yêu cầu AI khác nhau.

## Các loại AI Request Type được hỗ trợ

### 1. KEYWORD_RESEARCH

Nghiên cứu từ khóa

**Type**: `keyword_research`

**Payload mẫu**:

```json
{
  "type": "keyword_research",
  "parameters": {
    "topic": "digital marketing",
    "industry": "technology",
    "location": "Vietnam",
    "count": 50
  },
  "projectId": "uuid-here"
}
```

**Trường bắt buộc**:

- `topic` (string): Chủ đề hoặc từ khóa mục tiêu

**Trường tùy chọn**:

- `industry` (string): Ngành nghề
- `location` (string): Vị trí địa lý
- `count` (number): Số từ khóa muốn tạo (mặc định: 50)

---

### 2. CONTENT_OPTIMIZATION

Tối ưu hóa nội dung cơ bản

**Type**: `content_optimization`

**Payload mẫu**:

```json
{
  "type": "content_optimization",
  "parameters": {
    "content": "Nội dung bài viết cần tối ưu hóa SEO",
    "targetKeyword": "digital marketing",
    "additionalKeywords": ["SEO", "online marketing"],
    "contentType": "blog"
  },
  "projectId": "uuid-here"
}
```

**Trường bắt buộc**:

- `content` (string): Nội dung cần tối ưu
- `targetKeyword` (string): Từ khóa chính

**Trường tùy chọn**:

- `additionalKeywords` (string[]): Từ khóa phụ
- `contentType` (string): Loại nội dung (blog, product, landing page)

---

### 3. CONTENT_OPTIMIZATION_SUGGESTIONS

Gợi ý tối ưu hóa nội dung nâng cao

**Type**: `content_optimization_suggestions`

**Payload mẫu**:

```json
{
  "type": "content_optimization_suggestions",
  "parameters": {
    "content": "Nội dung bài viết cần phân tích và đưa ra gợi ý tối ưu",
    "targetKeywords": ["digital marketing", "SEO", "content strategy"],
    "targetAudience": "small business owners",
    "currentUrl": "https://example.com/blog/digital-marketing-tips"
  },
  "projectId": "uuid-here"
}
```

**Trường bắt buộc**:

- `content` (string): Nội dung cần phân tích
- `targetKeywords` (string[]): Danh sách từ khóa mục tiêu
- `targetAudience` (string): Đối tượng mục tiêu

**Trường tùy chọn**:

- `currentUrl` (string): URL hiện tại của nội dung

---

### 4. META_GENERATION

Tạo meta tags

**Type**: `meta_generation`

**Payload mẫu**:

```json
{
  "type": "meta_generation",
  "parameters": {
    "content": "Nội dung trang web hoặc URL",
    "targetKeyword": "digital marketing",
    "brandName": "Your Brand"
  },
  "projectId": "uuid-here"
}
```

**Trường bắt buộc**:

- `content` (string): Nội dung trang hoặc URL
- `targetKeyword` (string): Từ khóa mục tiêu

**Trường tùy chọn**:

- `brandName` (string): Tên thương hiệu

---

### 5. CONTENT_IDEAS

Tạo ý tưởng nội dung

**Type**: `content_ideas`

**Payload mẫu**:

```json
{
  "type": "content_ideas",
  "parameters": {
    "topic": "digital marketing",
    "audience": "small business owners",
    "format": "blog",
    "count": 10
  },
  "projectId": "uuid-here"
}
```

**Trường bắt buộc**:

- `topic` (string): Chủ đề chính

**Trường tùy chọn**:

- `audience` (string): Đối tượng mục tiêu
- `format` (string): Định dạng nội dung (blog, video, infographic)
- `count` (number): Số ý tưởng muốn tạo (mặc định: 10)

---

### 6. COMPETITOR_ANALYSIS

Phân tích đối thủ

**Type**: `competitor_analysis`

**Payload mẫu**:

```json
{
  "type": "competitor_analysis",
  "parameters": {
    "competitorDomain": "competitor.com",
    "yourDomain": "yourdomain.com",
    "industry": "technology"
  },
  "projectId": "uuid-here"
}
```

**Trường bắt buộc**:

- `competitorDomain` (string): Domain đối thủ
- `yourDomain` (string): Domain của bạn

**Trường tùy chọn**:

- `industry` (string): Ngành nghề

---

### 7. SEO_AUDIT

Kiểm tra SEO

**Type**: `seo_audit`

**Payload mẫu**:

```json
{
  "type": "seo_audit",
  "parameters": {
    "url": "https://example.com",
    "targetKeywords": ["digital marketing", "SEO"]
  },
  "projectId": "uuid-here"
}
```

**Trường bắt buộc**:

- `url` (string): URL cần kiểm tra

**Trường tùy chọn**:

- `targetKeywords` (string[]): Từ khóa mục tiêu

---

## Các AI Request Type nâng cao khác

### Advanced Content Generation

- `blog_outline` - Tạo outline blog
- `product_description` - Tạo mô tả sản phẩm
- `social_media` - Tạo nội dung mạng xã hội
- `content_rewrite` - Viết lại nội dung
- `content_expansion` - Mở rộng nội dung

### Advanced SEO Analysis

- `competitor_content_analysis` - Phân tích nội dung đối thủ
- `schema_markup_generation` - Tạo schema markup

### Advanced Keyword Research

- `long_tail_keywords` - Tạo từ khóa dài
- `question_based_keywords` - Từ khóa dạng câu hỏi
- `seasonal_keyword_trends` - Xu hướng từ khóa theo mùa

### Analytics

- `content_performance_prediction` - Dự đoán hiệu suất nội dung

---

## Cấu trúc Response

### Thành công (200/201)

```json
{
  "requestId": "uuid",
  "result": {
    // Kết quả phụ thuộc vào type request
  }
}
```

### Lỗi (400 Bad Request)

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

---

## Lỗi thường gặp

### 1. Type không đúng định dạng

❌ **Sai**: `"type": "CONTENT_OPTIMIZATION_SUGGESTIONS"`
✅ **Đúng**: `"type": "content_optimization_suggestions"`

### 2. Thiếu trường bắt buộc

❌ **Sai**:

```json
{
  "type": "content_optimization_suggestions",
  "parameters": {
    "projectId": "uuid"
  }
}
```

✅ **Đúng**:

```json
{
  "type": "content_optimization_suggestions",
  "parameters": {
    "content": "Nội dung cần phân tích",
    "targetKeywords": ["keyword1", "keyword2"],
    "targetAudience": "target audience"
  }
}
```

### 3. Thiếu Authentication

Phải include JWT token trong header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Ví dụ sử dụng với cURL

```bash
curl -X POST "http://localhost:3001/api/v1/ai/request" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "type": "content_optimization_suggestions",
    "parameters": {
      "content": "Bài viết về digital marketing cho doanh nghiệp nhỏ",
      "targetKeywords": ["digital marketing", "doanh nghiệp nhỏ", "marketing online"],
      "targetAudience": "chủ doanh nghiệp nhỏ"
    },
    "projectId": "9ed4d31b-03e2-4768-9b4c-a92ab6b16f4f"
  }'
```

## Ví dụ sử dụng với JavaScript/Fetch

```javascript
const response = await fetch("http://localhost:3001/api/v1/ai/request", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_JWT_TOKEN",
  },
  body: JSON.stringify({
    type: "content_optimization_suggestions",
    parameters: {
      content: "Bài viết về digital marketing cho doanh nghiệp nhỏ",
      targetKeywords: [
        "digital marketing",
        "doanh nghiệp nhỏ",
        "marketing online",
      ],
      targetAudience: "chủ doanh nghiệp nhỏ",
    },
    projectId: "9ed4d31b-03e2-4768-9b4c-a92ab6b16f4f",
  }),
});

const result = await response.json();
console.log(result);
```

---

## Lưu ý quan trọng

1. **Authentication**: Tất cả các endpoint đều yêu cầu JWT authentication
2. **Validation**: Server sẽ validate tất cả các trường bắt buộc
3. **Type format**: Sử dụng lowercase và underscore cho type (không phải UPPERCASE)
4. **Project ID**: Tùy chọn nhưng nên include để tracking theo project
5. **Rate limiting**: API có thể có giới hạn số request per minute

---

## Các endpoint khác

Ngoài endpoint `/request` tổng quát, còn có các endpoint chuyên biệt:

- `POST /keyword-research` - Nghiên cứu từ khóa
- `POST /content-optimization` - Tối ưu nội dung
- `POST /meta-generation` - Tạo meta tags
- `POST /content-ideas` - Tạo ý tưởng nội dung
- `POST /competitor-analysis` - Phân tích đối thủ
- `POST /seo-audit` - Kiểm tra SEO
- `GET /requests` - Lấy lịch sử requests
- `GET /requests/:id` - Lấy thông tin request cụ thể
