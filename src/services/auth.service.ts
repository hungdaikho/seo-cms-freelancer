import { BaseService } from "./base.service";
// @ts-ignore
import serverConfig from "@/config/server.config.json";
import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    User,
    UpdateProfileRequest,
    ChangePasswordRequest,
    UploadAvatarResponse,
    UserSettings,
    UserActivity,
    UsageStats,
    Notification,
    NotificationQueryParams,
    PaginationParams,
    ApiResponse,
} from "@/types/api.type";

function getBaseUrl() {
    if (typeof window !== "undefined") {
        // Chạy trên trình duyệt
        return window.location.protocol === "https:"
            ? serverConfig.HTTPS_SERVER_URL
            : serverConfig.HTTP_SERVER_URL;
    } else {
        // Chạy trên server (Node.js)
        // Ưu tiên HTTPS nếu có, hoặc fallback về HTTP
        return process.env.PROTOCOL === "https"
            ? serverConfig.HTTPS_SERVER_URL
            : serverConfig.HTTP_SERVER_URL;
    }
}

export class AuthService extends BaseService {
    constructor() {
        super(getBaseUrl() + "/api/v1");
    }

    // =============================================================================
    // 🔐 AUTHENTICATION METHODS
    // =============================================================================

    /**
     * Register a new user with automatic 14-day trial activation
     */
    register(data: RegisterRequest): Promise<AuthResponse> {
        return this.post<AuthResponse>("/auth/register", data);
    }

    /**
     * Login user
     */
    login(data: LoginRequest): Promise<AuthResponse> {
        return this.post<AuthResponse>("/auth/login", data);
    }

    /**
     * Logout user
     */
    logout(): Promise<void> {
        return this.post<void>("/auth/logout", {});
    }

    /**
     * Refresh authentication token
     */
    refreshToken(refreshToken: string): Promise<AuthResponse> {
        return this.post<AuthResponse>("/auth/refresh", { refreshToken });
    }

    /**
     * Initiate Google OAuth authentication
     */
    initiateGoogleAuth(): void {
        const googleAuthUrl = `${getBaseUrl()}/auth/google`;
        window.location.href = googleAuthUrl;
    }

    /**
     * Handle Google OAuth callback
     */
    handleGoogleCallback(code: string, state?: string): Promise<AuthResponse> {
        return this.post<AuthResponse>("/auth/google/callback", { code, state });
    }

    /**
     * Initiate forgot password flow
     */
    forgotPassword(email: string): Promise<{ message: string }> {
        return this.post<{ message: string }>("/auth/forgot-password", { email });
    }

    /**
     * Reset password with token
     */
    resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
        return this.post<{ message: string }>("/auth/reset-password", { token, newPassword });
    }

    /**
     * Verify email address
     */
    verifyEmail(token: string): Promise<{ message: string }> {
        return this.post<{ message: string }>("/auth/verify-email", { token });
    }

    /**
     * Resend email verification
     */
    resendEmailVerification(): Promise<{ message: string }> {
        return this.post<{ message: string }>("/auth/resend-verification", {});
    }

    /**
     * Check if user is authenticated
     */
    checkAuth(): Promise<{ isAuthenticated: boolean; user?: User }> {
        return this.get<{ isAuthenticated: boolean; user?: User }>("/auth/check");
    }

    // =============================================================================
    // 👤 USER PROFILE METHODS
    // =============================================================================

    /**
     * Get user profile
     */
    getUserProfile(): Promise<User> {
        return this.get<User>("/users/profile");
    }

    /**
     * Update user profile
     */
    updateUserProfile(data: UpdateProfileRequest): Promise<User> {
        return this.patch<User>("/users/profile", data);
    }

    /**
     * Change user password
     */
    changePassword(data: ChangePasswordRequest): Promise<void> {
        return this.post<void>("/users/change-password", data);
    }

    /**
     * Upload user avatar
     */
    uploadAvatar(file: File): Promise<UploadAvatarResponse> {
        const formData = new FormData();
        formData.append('avatar', file);
        return this.post<UploadAvatarResponse>("/users/upload-avatar", formData);
    }

    /**
     * Delete user avatar
     */
    deleteAvatar(): Promise<void> {
        return this.delete<void>("/users/avatar");
    }

    /**
     * Update user avatar from URL
     */
    updateAvatarFromUrl(avatarUrl: string): Promise<UploadAvatarResponse> {
        return this.post<UploadAvatarResponse>("/users/avatar-from-url", { avatarUrl });
    }

    // =============================================================================
    // ⚙️ USER SETTINGS METHODS
    // =============================================================================

    /**
     * Get user settings
     */
    getUserSettings(): Promise<UserSettings> {
        return this.get<UserSettings>("/users/settings");
    }

    /**
     * Update user settings
     */
    updateUserSettings(data: Partial<UserSettings>): Promise<UserSettings> {
        return this.put<UserSettings>("/users/settings", data);
    }

    /**
     * Reset user settings to default
     */
    resetUserSettings(): Promise<UserSettings> {
        return this.post<UserSettings>("/users/settings/reset", {});
    }

    /**
     * Export user settings
     */
    exportUserSettings(): Promise<Blob> {
        return this.get<Blob>("/users/settings/export", {
            responseType: 'blob'
        });
    }

    /**
     * Import user settings
     */
    importUserSettings(file: File): Promise<UserSettings> {
        const formData = new FormData();
        formData.append('settings', file);
        return this.post<UserSettings>("/users/settings/import", formData);
    }

    // =============================================================================
    // 📊 USER ACTIVITY & USAGE METHODS
    // =============================================================================

    /**
     * Get user activity log
     */
    getUserActivity(params?: PaginationParams): Promise<ApiResponse<UserActivity[]>> {
        const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
        return this.get<ApiResponse<UserActivity[]>>(`/users/activity${queryString}`);
    }

    /**
     * Get usage statistics
     */
    getUserUsage(): Promise<UsageStats[]> {
        return this.get<UsageStats[]>("/users/usage");
    }

    /**
     * Get detailed usage for specific period
     */
    getUserUsageDetails(params?: {
        startDate?: string;
        endDate?: string;
        type?: string;
    }): Promise<UsageStats[]> {
        const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
        return this.get<UsageStats[]>(`/users/usage/details${queryString}`);
    }

    /**
     * Export usage report
     */
    exportUsageReport(params?: {
        startDate?: string;
        endDate?: string;
        format?: 'csv' | 'xlsx' | 'pdf';
    }): Promise<Blob> {
        const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
        return this.get<Blob>(`/users/usage/export${queryString}`, {
            responseType: 'blob'
        });
    }

    // =============================================================================
    // 🔔 NOTIFICATION METHODS
    // =============================================================================

    /**
     * Get notifications
     */
    getUserNotifications(params?: NotificationQueryParams): Promise<Notification[]> {
        const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
        return this.get<Notification[]>(`/users/notifications${queryString}`);
    }

    /**
     * Mark notification as read
     */
    markNotificationAsRead(notificationId: string): Promise<void> {
        return this.patch<void>(`/users/notifications/${notificationId}/read`, {});
    }

    /**
     * Mark all notifications as read
     */
    markAllNotificationsAsRead(): Promise<void> {
        return this.post<void>("/users/notifications/mark-all-read", {});
    }

    /**
     * Delete notification
     */
    deleteNotification(notificationId: string): Promise<void> {
        return this.delete<void>(`/users/notifications/${notificationId}`);
    }

    /**
     * Clear all notifications
     */
    clearAllNotifications(): Promise<void> {
        return this.delete<void>("/users/notifications");
    }

    /**
     * Get notification preferences
     */
    getNotificationPreferences(): Promise<any> {
        return this.get<any>("/users/notification-preferences");
    }

    /**
     * Update notification preferences
     */
    updateNotificationPreferences(data: any): Promise<any> {
        return this.put<any>("/users/notification-preferences", data);
    }

    // =============================================================================
    // 🔒 SECURITY METHODS
    // =============================================================================

    /**
     * Enable two-factor authentication
     */
    enableTwoFactor(): Promise<{ qrCode: string; secret: string; backupCodes: string[] }> {
        return this.post<{ qrCode: string; secret: string; backupCodes: string[] }>("/users/security/2fa/enable", {});
    }

    /**
     * Verify and activate two-factor authentication
     */
    verifyTwoFactor(token: string): Promise<{ backupCodes: string[] }> {
        return this.post<{ backupCodes: string[] }>("/users/security/2fa/verify", { token });
    }

    /**
     * Disable two-factor authentication
     */
    disableTwoFactor(token: string): Promise<void> {
        return this.post<void>("/users/security/2fa/disable", { token });
    }

    /**
     * Generate new backup codes
     */
    generateBackupCodes(): Promise<{ backupCodes: string[] }> {
        return this.post<{ backupCodes: string[] }>("/users/security/backup-codes/generate", {});
    }

    /**
     * Get active sessions
     */
    getActiveSessions(): Promise<any[]> {
        return this.get<any[]>("/users/security/sessions");
    }

    /**
     * Revoke session
     */
    revokeSession(sessionId: string): Promise<void> {
        return this.delete<void>(`/users/security/sessions/${sessionId}`);
    }

    /**
     * Revoke all other sessions
     */
    revokeAllOtherSessions(): Promise<void> {
        return this.post<void>("/users/security/sessions/revoke-others", {});
    }

    /**
     * Get login history
     */
    getLoginHistory(params?: PaginationParams): Promise<ApiResponse<any[]>> {
        const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
        return this.get<ApiResponse<any[]>>(`/users/security/login-history${queryString}`);
    }

    // =============================================================================
    // 🗑️ ACCOUNT MANAGEMENT METHODS
    // =============================================================================

    /**
     * Request account deletion
     */
    requestAccountDeletion(reason?: string): Promise<{ message: string; deletionDate: string }> {
        return this.post<{ message: string; deletionDate: string }>("/users/account/delete-request", { reason });
    }

    /**
     * Cancel account deletion
     */
    cancelAccountDeletion(): Promise<{ message: string }> {
        return this.post<{ message: string }>("/users/account/cancel-deletion", {});
    }

    /**
     * Download user data (GDPR compliance)
     */
    downloadUserData(): Promise<Blob> {
        return this.get<Blob>("/users/account/download-data", {
            responseType: 'blob'
        });
    }

    /**
     * Get account deletion status
     */
    getAccountDeletionStatus(): Promise<{
        isPending: boolean;
        scheduledDate?: string;
        reason?: string;
    }> {
        return this.get<{
            isPending: boolean;
            scheduledDate?: string;
            reason?: string;
        }>("/users/account/deletion-status");
    }

    // =============================================================================
    // 🔧 UTILITY METHODS
    // =============================================================================

    /**
     * Validate current session
     */
    validateSession(): Promise<{ valid: boolean; expiresAt?: string }> {
        return this.get<{ valid: boolean; expiresAt?: string }>("/auth/validate-session");
    }

    /**
     * Get authentication methods available
     */
    getAuthMethods(): Promise<{
        password: boolean;
        google: boolean;
        twoFactor: boolean;
        github?: boolean;
        linkedin?: boolean;
    }> {
        return this.get<{
            password: boolean;
            google: boolean;
            twoFactor: boolean;
            github?: boolean;
            linkedin?: boolean;
        }>("/auth/methods");
    }

    /**
     * Check email availability
     */
    checkEmailAvailability(email: string): Promise<{ available: boolean }> {
        return this.post<{ available: boolean }>("/auth/check-email", { email });
    }

    /**
     * Check username availability
     */
    checkUsernameAvailability(username: string): Promise<{ available: boolean }> {
        return this.post<{ available: boolean }>("/auth/check-username", { username });
    }
}

export const authService: AuthService = new AuthService();
