import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';

export const useAuth = () => {
    const auth = useSelector((state: RootState) => state.auth);

    const isAdmin = auth.user?.role === 'admin' || auth.user?.role === 'super_admin';
    const isSuperAdmin = auth.user?.role === 'super_admin';
    const isUser = auth.user?.role === 'user';

    // Helper functions
    const hasRole = (role: string) => auth.user?.role === role;
    const hasAnyRole = (roles: string[]) => roles.includes(auth.user?.role || '');
    const canAccessDashboard = () => auth.user?.role === 'super_admin';

    return {
        ...auth,
        isAdmin,
        isSuperAdmin,
        isUser,
        hasRole,
        hasAnyRole,
        canAccessDashboard,
    };
};
