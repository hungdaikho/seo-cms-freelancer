# Debug Google OAuth Issues

## Vấn đề đã được giải quyết ✅

### 1. Redux Provider Missing

**Lỗi**: `could not find react-redux context value; please ensure the component is wrapped in a <Provider>`

**Nguyên nhân**: Route `/auth/google/success` không có Redux Provider trong layout.

**Giải pháp**: ✅ Đã cập nhật `src/app/auth/layout.tsx` để bao gồm Redux Provider:

```tsx
"use client";
import ReduxProvider from "@/provider/redux_provider";
import { ConfigProvider } from "antd";
import { antdConfig } from "@/config/antd.config";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ConfigProvider {...antdConfig}>{children}</ConfigProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
```

### 2. TypeScript Issues

**Lỗi**: Type mismatch trong Redux action và reducer

**Giải pháp**: ✅ Đã sửa type definitions:

- Import `User` type trong auth.slice.ts
- Cập nhật `googleAuthSuccess` action để handle `user: User | null`
- Sửa reducer case để không có explicit type annotation

### 3. Error Handling

**Improvement**: ✅ Thêm comprehensive error handling:

- Loading states
- Error display với Result component
- Retry mechanism
- Fallback redirects

## Components được tạo/cập nhật

### ✅ New Components:

1. **SimpleGoogleAuthCallback.tsx** - Version đơn giản không cần Redux (để test)
2. **GoogleOAuthTest.tsx** - Debug component để test OAuth flow
3. **Auth Layout** - Layout với Redux Provider cho auth routes

### ✅ Updated Components:

1. **GoogleAuthCallback.tsx** - Improved error handling và state management
2. **auth.slice.ts** - Fixed types và thêm `googleAuthSuccess` action
3. **Auth Modal** - Loading states cho Google button

## Test Cases

### 1. Test trực tiếp OAuth Flow

🔗 **URL**: http://localhost:6868/test

- Trang debug để test Google OAuth flow
- Click button để trigger OAuth

### 2. Test Callback Handler

🔗 **URL**: http://localhost:6868/auth/google/success?token=test_token

- Test callback page với token giả
- Verify redirect và state handling

### 3. Test Error Cases

🔗 **URL**: http://localhost:6868/auth/google/success?error=access_denied

- Test error handling
- Verify error display và retry button

## Debugging Steps

### Nếu vẫn gặp lỗi 500:

1. **Check Backend Server**:

   ```bash
   # Verify backend đang chạy trên port 3001
   curl http://localhost:3001/auth/google
   ```

2. **Check Google OAuth Configuration**:

   - Verify `GOOGLE_CLIENT_ID` và `GOOGLE_CLIENT_SECRET` trong backend .env
   - Check redirect URI trong Google Cloud Console: `http://localhost:3001/auth/google/callback`

3. **Check Network Tab**:

   - Open DevTools → Network
   - Monitor requests khi click Google OAuth
   - Check response từ backend endpoints

4. **Check Console Logs**:
   - Browser console cho frontend errors
   - Backend logs cho authentication errors

### Debug URL Flow:

1. **User clicks Google button** → `window.location.href = 'http://localhost:3001/auth/google'`
2. **Backend Google OAuth** → Redirect to Google OAuth consent screen
3. **Google callback** → `http://localhost:3001/auth/google/callback?code=...`
4. **Backend processes** → Redirect to `http://localhost:6868/auth/google/success?token=jwt_token`
5. **Frontend handles** → Extract token, save to localStorage, redirect to home

## Files Modified

```
✅ src/app/auth/layout.tsx - Added Redux Provider
✅ src/app/auth/google/success/page.tsx - Updated to use SimpleGoogleAuthCallback
✅ src/components/auth/SimpleGoogleAuthCallback.tsx - Simple callback handler
✅ src/components/auth/GoogleAuthCallback.tsx - Full Redux callback handler
✅ src/stores/slices/auth.slice.ts - Fixed types và added googleAuthSuccess
✅ src/components/debug/GoogleOAuthTest.tsx - Debug component
✅ src/app/test/page.tsx - Test page
```

## Next Steps

1. **Test the flow**: Go to http://localhost:6868/test và click "Test Google OAuth"
2. **Monitor console**: Check for any remaining errors
3. **Verify token**: Sau khi success, check localStorage cho accessToken
4. **Test auth state**: Verify Redux state được update correctly

Nếu vẫn có vấn đề, hãy check:

- Backend server status
- Google OAuth credentials
- Network requests trong DevTools
