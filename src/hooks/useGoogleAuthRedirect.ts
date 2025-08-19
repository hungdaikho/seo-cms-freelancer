import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/stores/store';
import { googleAuthSuccess } from '@/stores/slices/auth.slice';
import { App } from 'antd';

export const useGoogleAuthRedirect = () => {
    const searchParams = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const { notification } = App.useApp();
    useEffect(() => {
        const handleGoogleAuthRedirect = async () => {
            // Chỉ xử lý nếu đang ở trang chủ và có token
            if (window.location.pathname === '/') {
                const token = searchParams.get('token');
                const error = searchParams.get('error');

                if (error) {
                    notification.error({ message: "Google authentication failed. Please try again." });
                    // Xóa query parameters khỏi URL
                    window.history.replaceState({}, document.title, window.location.pathname);
                    return;
                }

                if (token) {
                    try {
                        await dispatch(googleAuthSuccess(token)).unwrap();
                        notification.success({ message: 'Successfully logged in with Google!' });
                        // Xóa query parameters khỏi URL
                        window.history.replaceState({}, document.title, window.location.pathname);
                    } catch (error: any) {
                        notification.error({ message: error || 'Authentication failed' });
                        // Xóa query parameters khỏi URL
                        window.history.replaceState({}, document.title, window.location.pathname);
                    }
                }
            }
        };

        handleGoogleAuthRedirect();
    }, [searchParams, dispatch]);
};
