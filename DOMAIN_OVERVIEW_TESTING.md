# Domain Overview API Testing Guide

## Testing với cURL

### 1. Test Domain Overview API

```bash
# Replace YOUR_JWT_TOKEN with actual token
# Replace example.com with domain you want to test

curl -X GET "http://localhost:3000/api/v1/seo/domain-overview/example.com?includeSubdomains=false" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 2. Test Top Keywords API

```bash
curl -X GET "http://localhost:3000/api/v1/seo/domain-overview/top-keywords/example.com?limit=50&country=US" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 3. Test Competitors API

```bash
curl -X GET "http://localhost:3000/api/v1/seo/domain-overview/competitors/example.com?limit=10&country=US" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 4. Test Topics API

```bash
curl -X GET "http://localhost:3000/api/v1/seo/domain-overview/topics/example.com?limit=20" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 5. Test Domain Authority API

```bash
curl -X GET "http://localhost:3000/api/v1/seo/domain-overview/authority/example.com" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

## Expected Response Formats

### Domain Overview Response

```json
{
  "domain": "example.com",
  "authorityScore": 85,
  "organicKeywords": 15420,
  "organicTraffic": 234567,
  "organicCost": 45678.5,
  "backlinks": 125400,
  "referringDomains": 8650,
  "topCountries": [
    {
      "country": "US",
      "traffic": 82000,
      "percentage": 35.12
    }
  ],
  "trafficTrend": [
    {
      "date": "2024-08-01",
      "traffic": 220000
    }
  ]
}
```

### Top Keywords Response

```json
{
  "data": [
    {
      "keyword": "best seo tools",
      "position": 3,
      "searchVolume": 8900,
      "traffic": 2340,
      "cpc": 12.5,
      "difficulty": 75,
      "trend": "up",
      "url": "https://example.com/seo-tools"
    }
  ],
  "total": 15420,
  "domain": "example.com",
  "country": "US"
}
```

### Competitors Response

```json
{
  "data": [
    {
      "domain": "competitor1.com",
      "competitionLevel": 85,
      "commonKeywords": 1250,
      "authorityScore": 78,
      "trafficGap": 125000,
      "organicKeywords": 18500,
      "estimatedTraffic": 350000
    }
  ],
  "total": 45,
  "domain": "example.com",
  "country": "US"
}
```

### Topics Response

```json
{
  "data": [
    {
      "topic": "SEO Tools",
      "keywords": 450,
      "traffic": 45000,
      "difficulty": 68,
      "opportunities": 125,
      "topKeywords": ["best seo tools", "seo analysis tools"]
    }
  ],
  "total": 85,
  "domain": "example.com"
}
```

### Domain Authority Response

```json
{
  "domain": "example.com",
  "metrics": {
    "mozDA": 65,
    "mozPA": 58,
    "ahrefsDR": 72,
    "ahrefsUR": 45,
    "semrushAS": 68,
    "majesticTF": 42,
    "majesticCF": 38
  },
  "backlinks": {
    "total": 125400,
    "dofollow": 89500,
    "nofollow": 35900,
    "referringDomains": 8650,
    "referringIPs": 7890
  },
  "trust": {
    "trustFlow": 42,
    "citationFlow": 38,
    "spamScore": 2
  }
}
```

## Testing in Frontend

You can test the Domain Overview functionality by:

1. Navigate to `/seo/domain-overview` in your application
2. Enter a domain name (e.g., "example.com")
3. Select a country (default: US)
4. Click "Analyze" button
5. Check browser console for any errors
6. Verify that all sections are populated with data

## Error Handling

The application should handle these scenarios:

- Invalid domain names
- Network connectivity issues
- API rate limiting (429 errors)
- Authentication failures (401 errors)
- Server errors (500 errors)
- Missing or malformed data responses

## Performance Notes

- All API calls are made in parallel where possible
- Loading states are shown for each section
- Data is cached in Redux store to avoid unnecessary re-fetches
- Error boundaries handle component-level failures gracefully
