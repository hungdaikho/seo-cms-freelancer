import {
  AdminUser,
  AdminSubscriptionPlan,
  AdminDashboardStats,
} from "@/types/admin.type";

export const mockDashboardStats: AdminDashboardStats = {
  totalUsers: 158,
  activeUsers: 142,
  inactiveUsers: 16,
  totalSubscriptions: 98,
  activeSubscriptions: 85,
  expiredSubscriptions: 13,
  totalRevenue: 125000.5,
  monthlyRevenue: 15600.25,
};

export const mockSubscriptionPlans: AdminSubscriptionPlan[] = [
  {
    id: "1",
    name: "Individual",
    slug: "individual",
    description: "Perfect for individual users",
    price: 12,
    yearlyPrice: 120,
    currency: "USD",
    features: [
      "1 project",
      "50 keywords tracking",
      "Basic support",
      "10 API requests/day",
    ],
    limits: {
      projects: 1,
      keywords_tracking: 50,
      api_requests_daily: 10,
    },
    isActive: true,
    sortOrder: 1,
    subscriptionsCount: 123,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Business",
    slug: "business",
    description: "Great for small businesses",
    price: 40,
    yearlyPrice: 400,
    currency: "USD",
    features: [
      "5 projects",
      "250 keywords tracking",
      "Priority support",
      "50 API requests/day",
    ],
    limits: {
      projects: 5,
      keywords_tracking: 250,
      api_requests_daily: 50,
    },
    isActive: true,
    sortOrder: 2,
    subscriptionsCount: 124,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Enterprise",
    slug: "enterprise",
    description: "For large organizations",
    price: 12,
    yearlyPrice: 120,
    currency: "USD",
    features: [
      "50 projects",
      "5000 keywords tracking",
      "24/7 support",
      "1000 API requests/day",
    ],
    limits: {
      projects: 50,
      keywords_tracking: 5000,
      api_requests_daily: 1000,
    },
    isActive: true,
    sortOrder: 3,
    subscriptionsCount: 324,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Individual",
    slug: "individual-2",
    description: "Another individual plan",
    price: 12,
    yearlyPrice: 120,
    currency: "USD",
    features: ["1 project", "50 keywords tracking", "Basic support"],
    limits: {
      projects: 1,
      keywords_tracking: 50,
      api_requests_daily: 10,
    },
    isActive: true,
    sortOrder: 4,
    subscriptionsCount: 150,
    createdAt: "2024-01-01T00:00:00Z",
  },
];

export const mockUsers: AdminUser[] = [
  {
    id: "1",
    name: "Selina kayle",
    email: "raby.gubron@gmail.com",
    role: "user",
    isActive: true,
    phone: "+1234567890",
    timezone: "UTC",
    createdAt: "2024-01-15T10:30:00Z",
    lastLoginAt: "2024-08-18T12:00:00Z",
    projects: 5,
    keywordsTracking: 250,
    subscription: {
      id: "sub1",
      status: "active",
      expiresAt: "2025-08-25T00:00:00Z", // Expires in 7 days
      plan: mockSubscriptionPlans[2], // Company plan
    },
  },
  {
    id: "2",
    name: "Corrie perot",
    email: "corie.perot@gmail.com",
    role: "user",
    isActive: false,
    phone: "+1234567891",
    timezone: "UTC",
    createdAt: "2024-01-10T08:20:00Z",
    lastLoginAt: "2024-08-15T09:00:00Z",
    projects: 2,
    keywordsTracking: 100,
    subscription: {
      id: "sub2",
      status: "cancelled",
      expiresAt: "2024-08-20T00:00:00Z",
      plan: mockSubscriptionPlans[1], // Team plan
    },
  },
  {
    id: "3",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "user",
    isActive: true,
    phone: "+1234567892",
    timezone: "UTC",
    createdAt: "2024-02-01T14:15:00Z",
    lastLoginAt: "2024-08-18T15:30:00Z",
    projects: 3,
    keywordsTracking: 150,
    subscription: {
      id: "sub3",
      status: "active",
      expiresAt: "2025-08-20T00:00:00Z", // Expires in 2 days
      plan: mockSubscriptionPlans[1], // Business plan
    },
  },
  {
    id: "4",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    role: "user",
    isActive: true,
    phone: "+1234567893",
    timezone: "UTC",
    createdAt: "2024-01-20T11:45:00Z",
    lastLoginAt: "2024-08-10T10:20:00Z",
    projects: 1,
    keywordsTracking: 25,
    subscription: {
      id: "sub4",
      status: "active",
      expiresAt: "2025-08-19T00:00:00Z", // Expires tomorrow
      plan: mockSubscriptionPlans[0], // Individual plan
    },
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "user",
    isActive: true,
    phone: "+1234567894",
    timezone: "UTC",
    createdAt: "2024-03-05T16:30:00Z",
    lastLoginAt: "2024-08-12T14:15:00Z",
    projects: 8,
    keywordsTracking: 400,
    subscription: {
      id: "sub5",
      status: "active",
      expiresAt: "2025-09-05T00:00:00Z", // Expires in ~18 days
      plan: mockSubscriptionPlans[2], // Enterprise plan
    },
  },
  {
    id: "6",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "user",
    isActive: true,
    phone: "+1234567895",
    timezone: "UTC",
    createdAt: "2024-02-20T09:10:00Z",
    lastLoginAt: "2024-08-18T11:45:00Z",
    projects: 1,
    keywordsTracking: 50,
    subscription: {
      id: "sub6",
      status: "active",
      expiresAt: "2025-08-22T00:00:00Z", // Expires in 4 days
      plan: mockSubscriptionPlans[0], // Individual plan
    },
  },
];
