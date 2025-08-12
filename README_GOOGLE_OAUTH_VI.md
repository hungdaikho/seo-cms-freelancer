# Hướng dẫn Đăng nhập Google OAuth

## Tổng quan

Tính năng đăng nhập Google OAuth đã được tích hợp vào SEO CMS, cho phép người dùng đăng nhập bằng tài khoản Google của họ một cách nhanh chóng và an toàn.

## Tính năng đã hoàn thiện

### 🎯 Frontend (React/Next.js)

1. **Auth Modal với Google OAuth**

   - Button đăng nhập Google với loading state
   - Xử lý redirect sau khi xác thực thành công
   - Hiển thị thông báo lỗi/thành công

2. **Google Auth Callback Page**

   - Trang xử lý callback từ Google OAuth
   - Loading screen trong quá trình xác thực
   - Redirect tự động sau khi hoàn thành

3. **Redux Integration**

   - Action `googleAuthSuccess` để xử lý token từ Google
   - State management cho Google authentication
   - Error handling và loading states

4. **Hook for Home Page**
   - `useGoogleAuthRedirect` để xử lý redirect trên trang chủ
   - Tự động xóa query parameters sau khi xử lý

### 🔧 Services & API Integration

1. **SEO Service Method**

   - `initiateGoogleAuth()` để khởi tạo Google OAuth flow
   - Redirect đến backend Google OAuth endpoint

2. **Auth State Management**
   - Tự động lưu JWT token vào localStorage
   - Đồng bộ state với Redux store
   - Xử lý logout và token validation

## Cách sử dụng

### 1. Đăng nhập bằng Google

```typescript
// Trong Auth Modal
const handleSocialLogin = async (provider: string) => {
  if (provider === "Google") {
    try {
      setGoogleLoading(true);
      seoService.initiateGoogleAuth(); // Redirect đến Google OAuth
    } catch (error) {
      setGoogleLoading(false);
      message.error("Failed to initialize Google authentication");
    }
  }
};
```

### 2. Xử lý callback từ Google

```typescript
// Trong GoogleAuthCallback component
useEffect(() => {
  const handleGoogleAuth = async () => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      await dispatch(googleAuthSuccess(token)).unwrap();
      message.success("Successfully logged in with Google!");
      router.push("/dashboard");
    }
  };

  handleGoogleAuth();
}, [searchParams]);
```

### 3. Hook cho trang chủ

```typescript
// Trong Home Page
import { useGoogleAuthRedirect } from "@/hooks/useGoogleAuthRedirect";

export default function Page() {
  useGoogleAuthRedirect(); // Tự động xử lý Google OAuth redirect

  return (
    <>
      <HeroSite />
      <Enterprise />
      <Quote />
    </>
  );
}
```

## Flow hoạt động

1. **Khởi tạo OAuth**: User click "Sign in with Google" → Redirect đến `/auth/google`
2. **Google Authentication**: User xác thực với Google → Google redirect về backend
3. **Backend Processing**: Backend xử lý OAuth callback → Tạo/cập nhật user → Generate JWT
4. **Frontend Redirect**: Backend redirect về frontend với token trong query parameter
5. **Token Processing**: Frontend extract token → Save vào Redux store & localStorage → Redirect đến dashboard

## Routes được tạo

- `/auth/google/success` - Page xử lý Google OAuth callback
- Hook `useGoogleAuthRedirect` xử lý redirect trên trang chủ

## Error Handling

- Network errors khi gọi Google OAuth
- Invalid/missing token trong callback
- Authentication failures
- Loading states và user feedback

## Cấu hình Backend

Backend cần có các endpoint sau (đã có sẵn theo tài liệu):

```
GET /auth/google - Khởi tạo Google OAuth
GET /auth/google/callback - Xử lý callback từ Google
```

Environment variables cần thiết:

```bash
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:3001/auth/google/callback"
FRONTEND_URL="http://localhost:3000"
```

## Files đã tạo/chỉnh sửa

### Files mới tạo:

- `src/components/auth/GoogleAuthCallback.tsx`
- `src/components/auth/GoogleOAuthSetupNotice.tsx`
- `src/app/auth/google/success/page.tsx`
- `src/hooks/useGoogleAuthRedirect.ts`
- `README_GOOGLE_OAUTH_VI.md`

### Files đã chỉnh sửa:

- `src/stores/slices/auth.slice.ts` - Thêm `googleAuthSuccess` action
- `src/services/seo.service.ts` - Thêm `initiateGoogleAuth()` method
- `src/components/ui/modal/auth_modal_new.tsx` - Tích hợp Google OAuth button
- `src/components/ui/modal/auth_modal.module.scss` - Thêm styles cho Google button
- `src/app/(site)/page.tsx` - Thêm hook xử lý Google OAuth redirect

## Kiểm tra hoạt động

1. Start backend server với Google OAuth configured
2. Click "Sign in with Google" trong auth modal
3. Hoàn thành Google OAuth flow
4. Verify redirect về frontend với token
5. Check Redux state và localStorage có token
6. Verify navigation đến dashboard

## Lưu ý bảo mật

- JWT token được lưu trong localStorage
- Automatic token validation và cleanup
- Error handling cho các trường hợp edge cases
- Loading states để improve UX
