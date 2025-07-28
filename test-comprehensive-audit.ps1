# Test script for comprehensive audit endpoint
# This script tests the new POST /api/v1/projects/{projectId}/audits/comprehensive endpoint

$baseUrl = "http://localhost:3001/api/v1"
$projectId = "test-project-123"
$testUrl = "https://example.com"

# Request body matching the new API specification
$requestBody = @{
    url = $testUrl
    options = @{
        auditType = "full"
        settings = @{
            crawlDepth = 3
            includeImages = $true
            checkMobileFriendly = $true
            analyzePageSpeed = $true
        }
    }
} | ConvertTo-Json -Depth 3

$endpoint = "$baseUrl/projects/$projectId/audits/comprehensive"

Write-Host "🧪 Testing Comprehensive Audit Endpoint" -ForegroundColor Cyan
Write-Host "📡 Endpoint: $endpoint" -ForegroundColor Gray
Write-Host "📋 Request Body:" -ForegroundColor Gray
Write-Host $requestBody -ForegroundColor Gray
Write-Host ""

try {
    Write-Host "🚀 Sending POST request..." -ForegroundColor Yellow
    
    $response = Invoke-RestMethod -Uri $endpoint -Method Post -Body $requestBody -ContentType "application/json" -TimeoutSec 30
    
    Write-Host "✅ Success! Response received:" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 5) -ForegroundColor White
    
    if ($response.id) {
        Write-Host "🎯 Audit ID: $($response.id)" -ForegroundColor Cyan
        Write-Host "📊 Status: $($response.status)" -ForegroundColor Cyan
        
        if ($response.overview -and $response.overview.score) {
            Write-Host "⭐ Overall Score: $($response.overview.score)/100" -ForegroundColor Cyan
        }
    }
    
} catch {
    Write-Host "❌ Error occurred:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "📊 Status Code: $statusCode" -ForegroundColor Red
        
        if ($statusCode -eq 404) {
            Write-Host "💡 This might be expected if the backend server is not running" -ForegroundColor Yellow
            Write-Host "💡 The frontend should fall back to mock data in this case" -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Write-Host "🔧 Testing Information:" -ForegroundColor Cyan
Write-Host "• This endpoint should match the format in COMPREHENSIVE_AUDIT_FIX.md" -ForegroundColor Gray
Write-Host "• Request body uses 'options.auditType' and 'options.settings' structure" -ForegroundColor Gray
Write-Host "• Backend maps client parameters to internal audit configuration" -ForegroundColor Gray
Write-Host "• If API is unavailable, frontend should use mock data" -ForegroundColor Gray
