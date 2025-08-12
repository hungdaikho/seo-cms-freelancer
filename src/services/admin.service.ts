import { BaseService } from "./base.service";

// Types cho Admin API responses
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'super_admin';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    subscription?: UserSubscription;
}

export interface UserSubscription {
    id: string;
    userId: string;
    planId: string;
    status: 'active' | 'expired' | 'cancelled';
    startDate: string;
    expiresAt: string;
    plan: SubscriptionPlan;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    yearlyPrice: number;
    features: {
        projects: number;
        keywords: number;
        support: string;
    };
    limits: {
        projects: number;
        keywords_tracking: number;
        api_requests_daily: number;
    };
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    totalSubscriptions: number;
    activeSubscriptions: number;
    expiredSubscriptions: number;
    totalRevenue: number;
    monthlyRevenue: number;
}

export interface UsersListResponse {
    users: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface UsersListParams {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
    role?: string;
}

export interface UpdateUserData {
    name?: string;
    email?: string;
    role?: 'user' | 'admin' | 'super_admin';
    isActive?: boolean;
}

export interface CreatePlanData {
    name: string;
    slug: string;
    description: string;
    price: number;
    yearlyPrice: number;
    features: {
        projects: number;
        keywords: number;
        support: string;
    };
    limits: {
        projects: number;
        keywords_tracking: number;
        api_requests_daily: number;
    };
}

export interface UpdateSubscriptionData {
    planId: string;
    status: 'active' | 'expired' | 'cancelled';
    expiresAt: string;
}

export class AdminService extends BaseService {
    constructor() {
        const config = require('@/config/server.config.json');
        super(config.HTTP_SERVER_URL + '/api/v1');
    }

    // Dashboard APIs
    async getDashboardStats(): Promise<DashboardStats> {
        return this.get<DashboardStats>('/admin/dashboard/stats');
    }

    // User Management APIs
    async getUsers(params: UsersListParams = {}): Promise<UsersListResponse> {
        const searchParams = new URLSearchParams();

        if (params.page) searchParams.append('page', params.page.toString());
        if (params.limit) searchParams.append('limit', params.limit.toString());
        if (params.search) searchParams.append('search', params.search);
        if (params.isActive !== undefined) searchParams.append('isActive', params.isActive.toString());
        if (params.role) searchParams.append('role', params.role);

        const queryString = searchParams.toString();
        const url = queryString ? `/admin/users?${queryString}` : '/admin/users';

        return this.get<UsersListResponse>(url);
    }

    async getUserById(id: string): Promise<User> {
        return this.get<User>(`/admin/users/${id}`);
    }

    async updateUser(id: string, data: UpdateUserData): Promise<User> {
        return this.put<User>(`/admin/users/${id}`, data);
    }

    async deleteUser(id: string): Promise<{ message: string }> {
        return this.delete<{ message: string }>(`/admin/users/${id}`);
    }

    async activateUser(id: string): Promise<User> {
        return this.put<User>(`/admin/users/${id}/activate`);
    }

    async deactivateUser(id: string): Promise<User> {
        return this.put<User>(`/admin/users/${id}/deactivate`);
    }

    // Subscription Plans APIs
    async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
        return this.get<SubscriptionPlan[]>('/admin/subscription-plans');
    }

    async getSubscriptionPlanById(id: string): Promise<SubscriptionPlan> {
        return this.get<SubscriptionPlan>(`/admin/subscription-plans/${id}`);
    }

    async createSubscriptionPlan(data: CreatePlanData): Promise<SubscriptionPlan> {
        return this.post<SubscriptionPlan>('/admin/subscription-plans', data);
    }

    async updateSubscriptionPlan(id: string, data: Partial<CreatePlanData>): Promise<SubscriptionPlan> {
        return this.put<SubscriptionPlan>(`/admin/subscription-plans/${id}`, data);
    }

    async deleteSubscriptionPlan(id: string): Promise<{ message: string }> {
        return this.delete<{ message: string }>(`/admin/subscription-plans/${id}`);
    }

    // User Subscriptions APIs
    async getUserSubscriptions(userId: string): Promise<UserSubscription[]> {
        return this.get<UserSubscription[]>(`/admin/users/${userId}/subscriptions`);
    }

    async updateUserSubscription(userId: string, data: UpdateSubscriptionData): Promise<UserSubscription> {
        return this.put<UserSubscription>(`/admin/users/${userId}/subscription`, data);
    }

    async cancelUserSubscription(userId: string, subscriptionId: string): Promise<UserSubscription> {
        return this.put<UserSubscription>(`/admin/users/${userId}/subscriptions/${subscriptionId}/cancel`);
    }

    // Admin Profile Management APIs
    async updateAdminPassword(data: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
        return this.put<{ message: string }>('/admin/profile/password', data);
    }

    async updateAdminEmail(data: { email: string; password: string }): Promise<{ message: string }> {
        return this.put<{ message: string }>('/admin/profile/email', data);
    }

    async getAdminProfile(): Promise<User> {
        return this.get<User>('/admin/profile');
    }

    // Initialization APIs (Super Admin only)
    async initializeAdmin(): Promise<{ message: string }> {
        return this.post<{ message: string }>('/admin/init-admin');
    }

    async initializePlans(): Promise<{ message: string }> {
        return this.post<{ message: string }>('/admin/init-plans');
    }
}

export const adminService = new AdminService();
