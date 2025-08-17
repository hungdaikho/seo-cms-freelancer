import type { AdminUser, AdminSubscriptionPlan } from "@/types/admin.type";

// Format user role for display
export const formatUserRole = (role: string): string => {
  switch (role) {
    case "super_admin":
      return "Super Admin";
    case "admin":
      return "Admin";
    case "user":
      return "User";
    default:
      return role;
  }
};

// Get role color for Tag component
export const getUserRoleColor = (role: string): string => {
  switch (role) {
    case "super_admin":
      return "red";
    case "admin":
      return "orange";
    case "user":
      return "blue";
    default:
      return "default";
  }
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Format date
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format datetime
export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Get subscription status color
export const getSubscriptionStatusColor = (status: string): string => {
  switch (status) {
    case "active":
      return "green";
    case "expired":
      return "red";
    case "cancelled":
      return "orange";
    default:
      return "default";
  }
};

// Calculate discount percentage for yearly plans
export const calculateYearlyDiscount = (
  monthlyPrice: number,
  yearlyPrice: number
): number => {
  const yearlyEquivalent = monthlyPrice * 12;
  const discount = ((yearlyEquivalent - yearlyPrice) / yearlyEquivalent) * 100;
  return Math.round(discount);
};

// Generate user table filters
export const getUserTableFilters = (users: AdminUser[]) => {
  const roles = [...new Set(users.map((user) => user.role))];
  const statuses = [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
  ];

  const roleFilters = roles.map((role) => ({
    text: formatUserRole(role),
    value: role,
  }));

  return { roleFilters, statuses };
};

// Generate plan table filters
export const getPlanTableFilters = (plans: AdminSubscriptionPlan[]) => {
  const statuses = [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
  ];

  // Since features is string[], we'll return only statuses
  // If you need to filter by features, you'd need to extract them differently
  return { statuses };
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate slug from name
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Pagination helper
export const getPaginationConfig = (
  current: number,
  pageSize: number,
  total: number
) => ({
  current,
  pageSize,
  total,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number, range: [number, number]) =>
    `${range[0]}-${range[1]} of ${total} items`,
  pageSizeOptions: ["10", "20", "50", "100"],
});

// Export constants
export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
} as const;

export const SUBSCRIPTION_STATUSES = {
  ACTIVE: "active",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
} as const;

export const SUPPORT_LEVELS = {
  BASIC: "basic",
  STANDARD: "standard",
  PRIORITY: "priority",
  PREMIUM: "premium",
} as const;
