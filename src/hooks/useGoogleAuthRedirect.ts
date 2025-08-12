import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/stores/store';
import { googleAuthSuccess } from '@/stores/slices/auth.slice';
import { message } from 'antd';

export const useGoogleAuthRedirect = () => {
    const searchParams = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const handleGoogleAuthRedirect = async () => {
            // Chỉ xử lý nếu đang ở trang chủ và có token
            if (window.location.pathname === '/') {
                const token = searchParams.get('token');
                const error = searchParams.get('error');

                if (error) {
                    message.error('Google authentication failed. Please try again.');
                    // Xóa query parameters khỏi URL
                    window.history.replaceState({}, document.title, window.location.pathname);
                    return;
                }

                if (token) {
                    try {
                        await dispatch(googleAuthSuccess(token)).unwrap();
                        message.success('Successfully logged in with Google!');
                        // Xóa query parameters khỏi URL
                        window.history.replaceState({}, document.title, window.location.pathname);
                    } catch (error: any) {
                        message.error(error || 'Authentication failed');
                        // Xóa query parameters khỏi URL
                        window.history.replaceState({}, document.title, window.location.pathname);
                    }
                }
            }
        };

        handleGoogleAuthRedirect();
    }, [searchParams, dispatch]);
};
