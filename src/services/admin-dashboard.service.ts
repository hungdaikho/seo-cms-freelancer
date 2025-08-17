import { AdminService } from "./admin.service";
import {
  AdminDashboardStats,
  AdminUsersListResponse,
  AdminUsersListParams,
  AdminUser,
  AdminUpdateUserData,
  AdminSubscriptionPlan,
  AdminCreatePlanData,
  AdminUpdateSubscriptionData,
} from "@/types/admin.type";
import serverConfig from "@/config/server.config.json";
import {
  mockDashboardStats,
  mockUsers,
  mockSubscriptionPlans,
} from "@/data/mockAdminData";
import { BaseService } from "./base.service";
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
class AdminDashboardService extends BaseService {
  private useMockData = false; // Set to true temporarily to test UI with mock data
  constructor() {
    super(getBaseUrl() + "/api/v1");
  }

  // Dashboard Statistics
  async getDashboardStats(): Promise<AdminDashboardStats> {
    if (this.useMockData) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockDashboardStats), 500);
      });
    }
    console.log("🚀 Calling dashboard stats API...");
    const response = await this.get<AdminDashboardStats>(
      "/admin/dashboard/stats"
    );
    console.log("📦 Dashboard stats response:", response);
    return response;
  }

  // User Management
  async getAllUsers(
    params?: AdminUsersListParams
  ): Promise<AdminUsersListResponse> {
    if (this.useMockData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let filteredUsers = [...mockUsers];

          // Apply filters
          if (params?.search) {
            const searchTerm = params.search.toLowerCase();
            filteredUsers = filteredUsers.filter(
              (user) =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            );
          }

          if (params?.isActive !== undefined) {
            filteredUsers = filteredUsers.filter(
              (user) => user.isActive === params.isActive
            );
          }

          if (params?.role) {
            filteredUsers = filteredUsers.filter(
              (user) => user.role === params.role
            );
          }

          // Apply pagination
          const page = params?.page || 1;
          const limit = params?.limit || 10;
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

          resolve({
            users: paginatedUsers,
            total: filteredUsers.length,
            page,
            limit,
            totalPages: Math.ceil(filteredUsers.length / limit),
          });
        }, 300);
      });
    }

    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.role) queryParams.append("role", params.role);
    if (params?.isActive !== undefined)
      queryParams.append("isActive", params.isActive.toString());

    console.log("🚀 Calling users API with params:", queryParams.toString());
    const response = await this.get<{
      users: AdminUser[];
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    }>(`/admin/users?${queryParams.toString()}`);
    console.log("📦 Users API response:", response);

    return {
      users: response.users,
      total: response.total,
      page: response.page,
      limit: response.limit,
      totalPages: response.totalPages,
    };
  }

  async getUserById(id: string): Promise<AdminUser> {
    if (this.useMockData) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = mockUsers.find((u) => u.id === id);
          if (user) {
            resolve(user);
          } else {
            reject(new Error("User not found"));
          }
        }, 300);
      });
    }
    return this.get<AdminUser>(`/admin/users/${id}`);
  }

  async updateUser(id: string, data: AdminUpdateUserData): Promise<AdminUser> {
    return this.put<AdminUser>(`/admin/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<void> {
    await this.delete<void>(`/admin/users/${id}`);
  }

  async activateUser(id: string): Promise<AdminUser> {
    return this.put<AdminUser>(`/admin/users/${id}/activate`);
  }

  async deactivateUser(id: string): Promise<AdminUser> {
    return this.put<AdminUser>(`/admin/users/${id}/deactivate`);
  }

  // Subscription Plans Management
  async getAllSubscriptionPlans(): Promise<AdminSubscriptionPlan[]> {
    if (this.useMockData) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockSubscriptionPlans), 300);
      });
    }
    console.log("🚀 Calling subscription plans API...");
    const response = await this.get<
      AdminSubscriptionPlan[] | Record<string, AdminSubscriptionPlan>
    >("/admin/subscription-plans");
    console.log("📦 Subscription plans response:", response);

    // Xử lý trường hợp API trả về object thay vì array
    if (typeof response === "object" && !Array.isArray(response)) {
      const result = Object.values(response);
      console.log("🔄 Converted object to array:", result);
      return result;
    }

    return response as AdminSubscriptionPlan[];
  }

  async getSubscriptionPlanById(id: string): Promise<AdminSubscriptionPlan> {
    return this.get<AdminSubscriptionPlan>(`/admin/subscription-plans/${id}`);
  }

  async createSubscriptionPlan(
    data: AdminCreatePlanData
  ): Promise<AdminSubscriptionPlan> {
    return this.post<AdminSubscriptionPlan>("/admin/subscription-plans", data);
  }

  async updateSubscriptionPlan(
    id: string,
    data: Partial<AdminCreatePlanData>
  ): Promise<AdminSubscriptionPlan> {
    return this.put<AdminSubscriptionPlan>(
      `/admin/subscription-plans/${id}`,
      data
    );
  }

  async deleteSubscriptionPlan(id: string): Promise<void> {
    await this.delete<void>(`/admin/subscription-plans/${id}`);
  }

  // User Subscription Management
  async getUserSubscriptions(userId: string): Promise<any[]> {
    return this.get<any[]>(`/admin/users/${userId}/subscriptions`);
  }

  async updateUserSubscription(
    userId: string,
    data: AdminUpdateSubscriptionData
  ): Promise<any> {
    return this.put<any>(`/admin/users/${userId}/subscription`, data);
  }

  async cancelUserSubscription(
    userId: string,
    subscriptionId: string
  ): Promise<any> {
    return this.put<any>(
      `/admin/users/${userId}/subscriptions/${subscriptionId}/cancel`
    );
  }

  // Get expiring subscriptions
  async getExpiringSubscriptions(days?: number): Promise<AdminUser[]> {
    if (this.useMockData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Filter mock users with subscriptions expiring within specified days
          const now = new Date();
          const futureDate = new Date(
            now.getTime() + (days || 30) * 24 * 60 * 60 * 1000
          );

          const expiringUsers = mockUsers.filter((user) => {
            if (!user.subscription?.expiresAt) return false;
            const expiryDate = new Date(user.subscription.expiresAt);
            return expiryDate >= now && expiryDate <= futureDate;
          });

          resolve(expiringUsers);
        }, 300);
      });
    }

    const queryParams = new URLSearchParams();
    if (days) queryParams.append("days", days.toString());

    return this.get<AdminUser[]>(
      `/admin/subscriptions/expiring?${queryParams.toString()}`
    );
  }

  // Get subscription statistics
  async getSubscriptionStats(): Promise<{
    expiring_today: number;
    expiring_this_month: number;
    expiring_users: AdminUser[];
  }> {
    if (this.useMockData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const now = new Date();
          const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

          const expiringToday = mockUsers.filter((user) => {
            if (!user.subscription?.expiresAt) return false;
            const expiryDate = new Date(user.subscription.expiresAt);
            return expiryDate >= now && expiryDate <= tomorrow;
          }).length;

          const expiringThisMonth = mockUsers.filter((user) => {
            if (!user.subscription?.expiresAt) return false;
            const expiryDate = new Date(user.subscription.expiresAt);
            return expiryDate >= now && expiryDate <= nextMonth;
          }).length;

          const expiringUsers = mockUsers.filter((user) => {
            if (!user.subscription?.expiresAt) return false;
            const expiryDate = new Date(user.subscription.expiresAt);
            return expiryDate >= now && expiryDate <= nextMonth;
          });

          resolve({
            expiring_today: expiringToday,
            expiring_this_month: expiringThisMonth,
            expiring_users: expiringUsers,
          });
        }, 300);
      });
    }

    return this.get(`/admin/subscriptions/stats`);
  }
}

export const adminDashboardService = new AdminDashboardService();
