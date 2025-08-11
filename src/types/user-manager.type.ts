export interface User {
    id: string;
    email: string;
    name: string;
    phone?: string | null;
    timezone?: string;
    avatarUrl?: string | null;
    emailVerified: boolean;
    lastLoginAt?: string | null;
    createdAt: string;
    subscriptions: Subscription[];
    subscription: Subscription | null;
}

export interface Subscription {
    planType: 'TRIAL' | 'FREE' | 'PRO' | 'ENTERPRISE';
    status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'CANCELLED';
    expiresAt?: string;
    usage?: SubscriptionUsage;
    resetDate?: string;
}

export interface SubscriptionUsage {
    keywords: UsageDetail;
    competitors: UsageDetail;
    projects: UsageDetail;
    audits: UsageDetail;
}

export interface UsageDetail {
    used: number;
    limit: number;
}

export interface UpdateProfileRequest {
    name?: string;
    email?: string;
    phone?: string;
    timezone?: string;
    avatarUrl?: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface SessionInfo {
    id: string;
    deviceInfo: string;
    ipAddress: string;
    location: string;
    lastActive: string;
    createdAt: string;
    isCurrent: boolean;
}

export interface ExportDataRequest {
    dataTypes?: string[];
    format: 'json' | 'csv';
}

export interface ExportDataResponse {
    downloadUrl: string;
    expiresAt: string;
    fileSize: string;
    includes: string[];
}

export interface DeactivateAccountRequest {
    reason: string;
    password: string;
}

export interface DeleteAccountRequest {
    password: string;
    confirmation: string;
    reason?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: {
        code: string;
        details: string;
    };
}
