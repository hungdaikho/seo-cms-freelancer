// Admin related types
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "super_admin";
  isActive: boolean;
  phone?: string;
  timezone?: string;
  createdAt: string;
  updatedAt?: string;
  lastLoginAt?: string;
  subscription?: AdminUserSubscription;
  projects?: number;
  keywordsTracking?: number;
}

export interface AdminUserSubscription {
  id: string;
  userId?: string;
  planId?: string;
  planName?: string;
  status: "active" | "expired" | "cancelled";
  startDate?: string;
  expiresAt: string;
  plan: AdminSubscriptionPlan;
}

export interface AdminSubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  yearlyPrice: number;
  currency: string;
  features: string[];
  limits: {
    projects: number;
    keywords_tracking?: number;
    backlinks_monitoring?: number;
    api_requests_daily?: number;
  };
  isActive: boolean;
  sortOrder?: number;
  subscriptionsCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  expiredSubscriptions: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

export interface AdminUsersListResponse {
  users: AdminUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminUsersListParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  role?: string;
}

export interface AdminUpdateUserData {
  name?: string;
  email?: string;
  role?: "user" | "admin" | "super_admin";
  isActive?: boolean;
  phone?: string;
  timezone?: string;
}

export interface AdminCreatePlanData {
  name: string;
  slug: string;
  description: string;
  price: number;
  yearlyPrice: number;
  currency?: string;
  features: string[];
  limits: {
    projects: number;
    keywords_tracking?: number;
    backlinks_monitoring?: number;
    api_requests_daily?: number;
  };
  sortOrder?: number;
}

export interface AdminUpdateSubscriptionData {
  planId: string;
  status: "active" | "expired" | "cancelled";
  expiresAt: string;
}
