# Comprehensive Audit Endpoint

## Fixed Issues

The 404 error when calling `/api/v1/projects/{projectId}/audits/comprehensive` has been resolved.

### Changes Made:

1. **Added new endpoint**: `POST /api/v1/projects/{projectId}/audits/comprehensive`
2. **Created proper DTOs** for the client request format
3. **Added parameter mapping** from client format to internal audit format

### New Endpoint Details:

**URL**: `POST /api/v1/projects/{projectId}/audits/comprehensive`

**Request Body**:

```json
{
  "url": "https://example.com",
  "options": {
    "auditType": "full",
    "settings": {
      "crawlDepth": 1,
      "includeImages": true,
      "checkMobileFriendly": true,
      "analyzePageSpeed": true
    }
  }
}
```

**Response**: Same as regular audit creation - returns audit object with ID and status.

### Parameter Mapping:

Client parameters are automatically mapped to internal audit configuration:

- `auditType` → `audit_type` enum
- `crawlDepth` → `max_depth`
- `includeImages` → `check_images`
- `checkMobileFriendly` → `include_mobile`
- `analyzePageSpeed` → `analyze_performance`

All comprehensive audits automatically enable:

- SEO analysis (`check_seo: true`)
- Content analysis (`check_content: true`)
- Technical analysis (`check_technical: true`)
- Accessibility checks (`check_accessibility: true`)
- HTML validation (`validate_html: true`)
- Link checking (`check_links: true`)
- Meta tag analysis (`check_meta: true`)

### Testing:

Use the provided `test-comprehensive-audit.ps1` script to test the endpoint.
