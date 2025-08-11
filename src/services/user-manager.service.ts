import { BaseService } from './base.service';
import {
    ApiResponse,
    User,
    UpdateProfileRequest,
    ChangePasswordRequest,
    SessionInfo,
    ExportDataRequest,
    ExportDataResponse,
    DeactivateAccountRequest,
    DeleteAccountRequest,
    SubscriptionUsage
} from '@/types/user-manager.type';

class UserManagerService extends BaseService {
    constructor() {
        const config = require('@/config/server.config.json');
        super(config.HTTP_SERVER_URL + '/api/v1');
    }

    // Profile Management
    async getUserProfile(): Promise<User> {
        return this.get<User>('/users/profile');
    }

    async updateProfile(data: UpdateProfileRequest): Promise<User> {
        return this.patch<User>('/users/profile', data);
    }

    async getUsage(): Promise<{ subscription: { planType: string; status: string; usage: SubscriptionUsage; resetDate: string } }> {
        return this.get<{ subscription: { planType: string; status: string; usage: SubscriptionUsage; resetDate: string } }>('/users/usage');
    }

    // Password Management
    async changePassword(data: ChangePasswordRequest): Promise<void> {
        return this.post<void>('/auth/change-password', data);
    }

    async forgotPassword(email: string): Promise<void> {
        return this.post<void>('/auth/forgot-password', { email });
    }

    async resetPassword(token: string, newPassword: string, confirmPassword: string): Promise<void> {
        return this.post<void>('/auth/reset-password', {
            token,
            newPassword,
            confirmPassword
        });
    }

    // Email Verification
    async verifyEmail(token: string): Promise<void> {
        return this.post<void>('/auth/verify-email', { token });
    }

    async resendVerification(email: string): Promise<void> {
        return this.post<void>('/auth/resend-verification', { email });
    }

    // Session Management
    async getSessions(): Promise<SessionInfo[]> {
        return this.get<SessionInfo[]>('/auth/sessions');
    }

    async revokeSession(sessionId: string): Promise<void> {
        return this.delete<void>(`/auth/sessions/${sessionId}`);
    }

    async revokeAllOtherSessions(): Promise<{ revokedSessions: number }> {
        return this.delete<{ revokedSessions: number }>('/auth/sessions');
    }

    // Data Export (GDPR)
    async exportData(data: ExportDataRequest): Promise<ExportDataResponse> {
        return this.post<ExportDataResponse>('/users/export-data', data);
    }

    // Account Management
    async deactivateAccount(data: DeactivateAccountRequest): Promise<{ reactivationPeriod: string; contactSupport: string }> {
        return this.post<{ reactivationPeriod: string; contactSupport: string }>('/users/deactivate', data);
    }

    async deleteAccount(data: DeleteAccountRequest): Promise<{ deletionDate: string; dataRetention: string; cancellation: string }> {
        return this.delete<{ deletionDate: string; dataRetention: string; cancellation: string }>('/users/account', {
            data
        });
    }
}

export const userManagerService = new UserManagerService();
