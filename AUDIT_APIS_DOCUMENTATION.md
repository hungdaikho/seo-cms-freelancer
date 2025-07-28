# 🔍 **SEO Audit APIs - Comprehensive Documentation**

## 📋 **API Overview**

Hệ thống Audit APIs cung cấp khả năng phân tích SEO toàn diện cho website, bao gồm kiểm tra kỹ thuật, hiệu suất, nội dung và khả năng tiếp cận. Tất cả APIs đều yêu cầu JWT authentication và kiểm tra quyền sở hữu project.

---

## 🚀 **1. Create New Audit - Tạo Audit Mới**

### **Endpoint**

```http
POST /api/v1/projects/{projectId}/audits
```

### **Description**

Khởi tạo một audit SEO mới cho project. Audit sẽ được xử lý trong background và trả về kết quả chi tiết về tình trạng SEO của website.

### **Headers**

```http
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

### **Path Parameters**

| Parameter | Type | Required | Description              |
| --------- | ---- | -------- | ------------------------ |
| projectId | UUID | Yes      | ID của project cần audit |

### **Request Body**

```json
{
  "include_mobile": true,
  "check_accessibility": true,
  "analyze_performance": true,
  "check_seo": true,
  "check_content": true,
  "check_technical": true,
  "validate_html": false,
  "check_links": true,
  "check_images": true,
  "check_meta": true,
  "audit_type": "full",
  "pages": ["https://example.com", "https://example.com/about"],
  "max_depth": 3,
  "settings": {
    "timeout": 30000,
    "user_agent": "RankTracker Bot"
  }
}
```

### **Request Body Fields**

| Field               | Type     | Required | Default | Description                                                                |
| ------------------- | -------- | -------- | ------- | -------------------------------------------------------------------------- |
| include_mobile      | boolean  | No       | false   | Bao gồm kiểm tra mobile-friendly                                           |
| check_accessibility | boolean  | No       | false   | Kiểm tra tuân thủ WCAG accessibility                                       |
| analyze_performance | boolean  | No       | false   | Phân tích hiệu suất website                                                |
| check_seo           | boolean  | No       | true    | Kiểm tra các yếu tố SEO cơ bản                                             |
| check_content       | boolean  | No       | true    | Phân tích chất lượng nội dung                                              |
| check_technical     | boolean  | No       | true    | Kiểm tra kỹ thuật SEO                                                      |
| validate_html       | boolean  | No       | false   | Validate HTML markup                                                       |
| check_links         | boolean  | No       | true    | Kiểm tra broken links                                                      |
| check_images        | boolean  | No       | true    | Phân tích tối ưu hóa hình ảnh                                              |
| check_meta          | boolean  | No       | true    | Kiểm tra meta tags                                                         |
| audit_type          | enum     | No       | "full"  | Loại audit: "technical", "content", "performance", "accessibility", "full" |
| pages               | string[] | No       | []      | Danh sách URLs cụ thể để audit                                             |
| max_depth           | number   | No       | 3       | Độ sâu crawl tối đa                                                        |
| settings            | object   | No       | {}      | Cài đặt tùy chỉnh cho audit                                                |

### **Response - Success (201)**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "projectId": "123e4567-e89b-12d3-a456-426614174000",
  "status": "pending",
  "results": {
    "config": {
      "include_mobile": true,
      "check_accessibility": true,
      "analyze_performance": true,
      "audit_type": "full",
      "pages": ["https://example.com"],
      "max_depth": 3
    },
    "started_at": "2025-07-27T21:30:00.000Z",
    "progress": 0
  },
  "createdAt": "2025-07-27T21:30:00.000Z",
  "completedAt": null,
  "message": "Audit queued for processing",
  "estimated_duration": "2 minutes"
}
```

### **Response - Error (403)**

```json
{
  "statusCode": 403,
  "message": "Monthly audit limit reached. Upgrade your plan to run more audits.",
  "error": "Forbidden"
}
```

### **Use Cases**

- Kiểm tra SEO tổng quả website mới
- Audit định kỳ để theo dõi tiến bộ SEO
- Phân tích cụ thể mobile performance
- Kiểm tra accessibility compliance

---

## 📊 **2. Get Project Audits - Danh Sách Audits**

### **Endpoint**

```http
GET /api/v1/projects/{projectId}/audits
```

### **Description**

Lấy danh sách tất cả audits của một project với phân trang và tìm kiếm.

### **Headers**

```http
Authorization: Bearer {jwt_token}
```

### **Path Parameters**

| Parameter | Type | Required | Description    |
| --------- | ---- | -------- | -------------- |
| projectId | UUID | Yes      | ID của project |

### **Query Parameters**

| Parameter | Type   | Required | Default     | Description                |
| --------- | ------ | -------- | ----------- | -------------------------- |
| page      | number | No       | 1           | Số trang                   |
| limit     | number | No       | 10          | Số lượng items per page    |
| search    | string | No       | -           | Tìm kiếm theo tên hoặc URL |
| sortBy    | string | No       | "createdAt" | Sắp xếp theo field         |
| sortOrder | string | No       | "desc"      | Thứ tự: "asc" hoặc "desc"  |

### **Response - Success (200)**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "projectId": "123e4567-e89b-12d3-a456-426614174000",
      "status": "completed",
      "results": {
        "overview": {
          "score": 85,
          "total_issues": 12
        }
      },
      "createdAt": "2025-07-27T21:30:00.000Z",
      "completedAt": "2025-07-27T21:33:00.000Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10,
  "totalPages": 3
}
```

### **Use Cases**

- Xem lịch sử audit của project
- So sánh kết quả audit theo thời gian
- Quản lý audits với phân trang

---

## 📈 **3. Get Audit Summary - Tổng Quan Audits**

### **Endpoint**

```http
GET /api/v1/projects/{projectId}/audits/summary
```

### **Description**

Lấy tổng quan thống kê audits của project, bao gồm audit gần nhất và phân bố theo trạng thái.

### **Headers**

```http
Authorization: Bearer {jwt_token}
```

### **Path Parameters**

| Parameter | Type | Required | Description    |
| --------- | ---- | -------- | -------------- |
| projectId | UUID | Yes      | ID của project |

### **Response - Success (200)**

```json
{
  "latestAudit": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "completed",
    "results": {
      "overview": {
        "score": 85,
        "total_issues": 12,
        "critical_issues": 2
      }
    },
    "createdAt": "2025-07-27T21:30:00.000Z",
    "completedAt": "2025-07-27T21:33:00.000Z"
  },
  "stats": {
    "completed": 15,
    "pending": 1,
    "running": 0,
    "failed": 2
  }
}
```

### **Use Cases**

- Dashboard overview cho project
- Hiển thị trạng thái audit gần nhất
- Thống kê tổng quan performance

---

## 🔍 **4. Get Audit Details - Chi Tiết Audit**

### **Endpoint**

```http
GET /api/v1/audits/{auditId}
```

### **Description**

Lấy thông tin chi tiết của một audit cụ thể, bao gồm cấu hình và metadata.

### **Headers**

```http
Authorization: Bearer {jwt_token}
```

### **Path Parameters**

| Parameter | Type | Required | Description  |
| --------- | ---- | -------- | ------------ |
| auditId   | UUID | Yes      | ID của audit |

### **Response - Success (200)**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "projectId": "123e4567-e89b-12d3-a456-426614174000",
  "status": "completed",
  "results": {
    "config": {
      "include_mobile": true,
      "check_accessibility": true,
      "audit_type": "full"
    },
    "started_at": "2025-07-27T21:30:00.000Z",
    "progress": 100
  },
  "createdAt": "2025-07-27T21:30:00.000Z",
  "completedAt": "2025-07-27T21:33:00.000Z",
  "project": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "My Website",
    "domain": "https://example.com"
  }
}
```

### **Response - Error (404)**

```json
{
  "statusCode": 404,
  "message": "Audit not found",
  "error": "Not Found"
}
```

### **Use Cases**

- Xem chi tiết cấu hình audit
- Kiểm tra metadata và timing
- Debug audit issues

---

## ⏱️ **5. Get Audit Status - Trạng Thái Audit**

### **Endpoint**

```http
GET /api/v1/audits/{auditId}/status
```

### **Description**

Kiểm tra trạng thái hiện tại và tiến độ của audit. Sử dụng để polling trong quá trình audit đang chạy.

### **Headers**

```http
Authorization: Bearer {jwt_token}
```

### **Path Parameters**

| Parameter | Type | Required | Description  |
| --------- | ---- | -------- | ------------ |
| auditId   | UUID | Yes      | ID của audit |

### **Response - Success (200)**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "running",
  "created_at": "2025-07-27T21:30:00.000Z",
  "completed_at": null,
  "progress": 65,
  "config": {
    "include_mobile": true,
    "check_accessibility": true,
    "audit_type": "full",
    "pages": ["https://example.com"],
    "max_depth": 3
  }
}
```

### **Status Values**

| Status    | Description                 |
| --------- | --------------------------- |
| pending   | Audit đang chờ xử lý        |
| running   | Audit đang được thực hiện   |
| completed | Audit hoàn thành thành công |
| failed    | Audit thất bại              |

### **Use Cases**

- Polling để theo dõi tiến độ audit
- Hiển thị progress bar
- Kiểm tra trạng thái trước khi lấy kết quả

---

## 📋 **6. Get Audit Results - Kết Quả Audit**

### **Endpoint**

```http
GET /api/v1/audits/{auditId}/results
```

### **Description**

Lấy kết quả đầy đủ của audit đã hoàn thành, bao gồm điểm số, issues và recommendations.

### **Headers**

```http
Authorization: Bearer {jwt_token}
```

### **Path Parameters**

| Parameter | Type | Required | Description               |
| --------- | ---- | -------- | ------------------------- |
| auditId   | UUID | Yes      | ID của audit đã completed |

### **Response - Success (200)**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "completed",
  "results": {
    "overview": {
      "score": 85,
      "total_issues": 12,
      "critical_issues": 2,
      "warnings": 7,
      "passed_checks": 68
    },
    "technical_seo": {
      "score": 90,
      "issues": [
        {
          "type": "warning",
          "title": "Missing Meta Descriptions",
          "description": "3 pages are missing meta descriptions",
          "impact": "medium",
          "recommendation": "Add unique meta descriptions to improve click-through rates",
          "affected_pages": ["/about", "/contact", "/services"]
        },
        {
          "type": "error",
          "title": "Missing XML Sitemap",
          "description": "No XML sitemap found",
          "impact": "high",
          "recommendation": "Create and submit an XML sitemap to search engines"
        }
      ]
    },
    "content_analysis": {
      "score": 82,
      "issues": [
        {
          "type": "warning",
          "title": "Thin Content",
          "description": "2 pages have less than 300 words",
          "impact": "medium",
          "recommendation": "Expand content to provide more value to users",
          "affected_pages": ["/privacy", "/terms"]
        }
      ]
    },
    "performance": {
      "score": 78,
      "metrics": {
        "page_speed": 75,
        "core_web_vitals": {
          "lcp": 2.1,
          "fid": 85,
          "cls": 0.08
        },
        "mobile_friendly": true
      },
      "issues": [
        {
          "type": "error",
          "title": "Large Images",
          "description": "Several images are not optimized",
          "impact": "high",
          "recommendation": "Compress and optimize images to improve loading speed"
        }
      ]
    },
    "accessibility": {
      "score": 88,
      "issues": [
        {
          "type": "error",
          "title": "Missing Alt Text",
          "description": "5 images are missing alt text",
          "impact": "high",
          "recommendation": "Add descriptive alt text to all images",
          "wcag_level": "A"
        }
      ]
    },
    "pages_analyzed": [
      {
        "url": "https://example.com",
        "status_code": 200,
        "title": "Homepage Title",
        "meta_description": "Homepage meta description",
        "h1_count": 1,
        "word_count": 450,
        "issues_count": 3,
        "score": 88
      },
      {
        "url": "https://example.com/about",
        "status_code": 200,
        "title": "About Us",
        "meta_description": "",
        "h1_count": 1,
        "word_count": 280,
        "issues_count": 5,
        "score": 72
      }
    ],
    "completed_at": "2025-07-27T21:33:15.000Z",
    "processing_time": 3000
  },
  "createdAt": "2025-07-27T21:30:00.000Z",
  "completedAt": "2025-07-27T21:33:15.000Z"
}
```

### **Response - Error (400)**

```json
{
  "statusCode": 400,
  "message": "Audit is not completed yet",
  "error": "Bad Request"
}
```

### **Issue Types**

| Type    | Description                      | Priority |
| ------- | -------------------------------- | -------- |
| error   | Vấn đề nghiêm trọng cần sửa ngay | High     |
| warning | Vấn đề cần chú ý                 | Medium   |
| info    | Thông tin tham khảo              | Low      |

### **Impact Levels**

| Impact | Description                    |
| ------ | ------------------------------ |
| high   | Ảnh hưởng nghiêm trọng đến SEO |
| medium | Ảnh hưởng vừa phải             |
| low    | Ảnh hưởng nhỏ                  |

### **Use Cases**

- Hiển thị báo cáo audit đầy đủ
- Xuất PDF report
- Phân tích chi tiết các issues
- Tạo action plan SEO

---

## 🗑️ **7. Delete Audit - Xóa Audit**

### **Endpoint**

```http
DELETE /api/v1/audits/{auditId}
```

### **Description**

Xóa một audit khỏi hệ thống. Không thể xóa audit đang chạy.

### **Headers**

```http
Authorization: Bearer {jwt_token}
```

### **Path Parameters**

| Parameter | Type | Required | Description          |
| --------- | ---- | -------- | -------------------- |
| auditId   | UUID | Yes      | ID của audit cần xóa |

### **Response - Success (200)**

```json
{
  "message": "Audit deleted successfully"
}
```

### **Response - Error (400)**

```json
{
  "statusCode": 400,
  "message": "Cannot delete a running audit",
  "error": "Bad Request"
}
```

### **Use Cases**

- Dọn dẹp audits cũ
- Xóa audit test
- Quản lý storage

---

## 🔐 **Authentication & Authorization**

### **JWT Token Required**

Tất cả APIs yêu cầu JWT token trong header:

```http
Authorization: Bearer {your_jwt_token}
```

### **Permission Checks**

- User chỉ có thể audit projects mà họ sở hữu
- Kiểm tra subscription limits trước khi tạo audit
- Rate limiting theo plan của user

---

## 📊 **Subscription Limits**

### **Free Plan**

- 1 audit/tháng
- Basic checks only
- 3 pages maximum

### **Pro Plan**

- 10 audits/tháng
- All features
- 50 pages maximum

### **Enterprise Plan**

- Unlimited audits
- All features
- Unlimited pages

---

## 🚨 **Error Codes & Handling**

### **Common Error Responses**

#### **401 Unauthorized**

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

#### **403 Forbidden**

```json
{
  "statusCode": 403,
  "message": "You do not have access to this project",
  "error": "Forbidden"
}
```

#### **404 Not Found**

```json
{
  "statusCode": 404,
  "message": "Project not found",
  "error": "Not Found"
}
```

#### **400 Bad Request**

```json
{
  "statusCode": 400,
  "message": [
    "include_mobile must be a boolean value",
    "pages must be an array of URLs"
  ],
  "error": "Bad Request"
}
```

#### **429 Too Many Requests**

```json
{
  "statusCode": 429,
  "message": "Too many requests. Please try again later.",
  "error": "Too Many Requests"
}
```

---

## 🔄 **Workflow Examples**

### **Basic Audit Workflow**

```javascript
// 1. Start audit
const audit = await createAudit(projectId, config);

// 2. Poll for completion
while (audit.status !== 'completed') {
  await sleep(2000);
  const status = await getAuditStatus(audit.id);
  updateProgressBar(status.progress);
}

// 3. Get results
const results = await getAuditResults(audit.id);
displayResults(results);
```

### **Batch Processing**

```javascript
// Audit multiple websites
const projects = ['project1', 'project2', 'project3'];
const audits = await Promise.all(
  projects.map((projectId) => createAudit(projectId, config)),
);

// Monitor all audits
const results = await Promise.all(
  audits.map((audit) => pollUntilComplete(audit.id)),
);
```

---

## 📈 **Performance Considerations**

### **Rate Limiting**

- 10 requests/minute per user cho audit creation
- 60 requests/minute cho status checking
- 100 requests/minute cho result retrieval

### **Caching**

- Audit results được cache 24 hours
- Status responses được cache 30 seconds
- Summary data được cache 5 minutes

### **Timeouts**

- Audit creation: 30 seconds
- Status check: 10 seconds
- Results retrieval: 60 seconds

---

## 🎯 **Best Practices**

### **For Frontend Developers**

1. **Polling Strategy**: Use exponential backoff cho status polling
2. **Progress Display**: Hiển thị progress bar với estimated time
3. **Error Handling**: Implement retry logic cho failed requests
4. **Caching**: Cache results locally để tránh re-fetch

### **For Backend Integration**

1. **Webhooks**: Consider webhooks thay vì polling cho enterprise users
2. **Batch Processing**: Group multiple audits để optimize performance
3. **Data Export**: Implement CSV/PDF export cho audit results
4. **Historical Analysis**: Store audit history để trend analysis

---

## 🔗 **Related APIs**

- **Projects API**: Quản lý projects
- **Users API**: User authentication
- **Subscriptions API**: Plan management
- **Reports API**: Generate PDF reports

---

## 📞 **Support**

Để hỗ trợ kỹ thuật hoặc câu hỏi về APIs:

- Email: support@ranktracker.com
- Documentation: https://docs.ranktracker.com
- Status Page: https://status.ranktracker.com
